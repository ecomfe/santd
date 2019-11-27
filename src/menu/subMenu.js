/**
* @file subMenu component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Trigger from '../core/trigger';
import Animate from '../core/util/animate';
import openAnimation from '../core/util/openAnimation';
const prefixCls = classCreator('menu')();

function loopMenuItem(children = [], keys, ret = {}) {
    children.forEach(child => {
        if (keys.includes(child.data.get('key'))) {
            ret.find = true;
        }
        else {
            loopMenuItem(child.items, keys, ret);
        }
    });
    return ret;
}

const builtinPlacements = {
    leftTop: {
        points: ['tr', 'tl'],
        offset: [-4, 0],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    rightTop: {
        points: ['tl', 'tr'],
        offset: [4, 0],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    },
    bottomCenter: {
        points: ['tc', 'bc'],
        offset: [0, 4],
        overflow: {
            adjustX: 0,
            adjustY: 1
        }
    }
};

export default san.defineComponent({
    dataTypes: {
        disabled: DataTypes.bool,
        key: DataTypes.string,
        title: DataTypes.any,
        inlineIndent: DataTypes.number
    },
    initData() {
        return {
            openKeys: [],
            activeKey: [],
            openAnimation,
            isSubMenu: true,
            inlineIndent: 16,
            builtinPlacements,
            trigger: 'hover',
            transitionName: 'zoom-big',
            noSubClick: true
        };
    },
    computed: {
        // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
        menuPrefixCls() {
            const rootPrefixCls = this.data.get('rootPrefixCls');

            return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-submenu';
        },
        classes() {
            const menuPrefixCls = this.data.get('menuPrefixCls');
            const mode = this.data.get('mode');
            const isOpen = this.data.get('isOpen');
            const isInlineMode = this.data.get('mode') === 'inline';
            const active = this.data.get('active');
            const disabled = this.data.get('disabled');
            const isChildrenSelected = this.data.get('isChildrenSelected');

            let classArr = [menuPrefixCls, `${menuPrefixCls}-${mode}`];
            isOpen && classArr.push(`${menuPrefixCls}-open`);
            (active || (isOpen && !isInlineMode)) && classArr.push(`${menuPrefixCls}-active`);
            disabled && classArr.push(`${menuPrefixCls}-disabled`);
            isChildrenSelected && classArr.push(`${menuPrefixCls}-selected`);

            return classArr;
        },
        isOpen() {
            const key = this.data.get('key');
            const noSubClick = this.data.get('noSubClick');

            return this.data.get('openKeys').includes(key) && noSubClick;
        },
        active() {
            const subMenuKey = this.data.get('subMenuKey');
            if (subMenuKey) {
                return this.data.get('activeKey')[subMenuKey] === this.data.get('key');
            }
        }
    },
    inited() {
        this.items = [];
        this.subMenus = [];
        this.dispatch('santd_menu_addItem', this);
    },
    updated() {
        let paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'inlineIndent', 'rootPrefixCls'];
        this.items.forEach(item => {
            paramsArr.forEach(param => {
                let data = this.data.get(param);
                if (param === 'level') {
                    data++;
                }
                item.data.set(param, data, {force: true});
            });
        });

        let ret = loopMenuItem(this.items, this.data.get('selectedKeys'), {});
        this.data.set('isChildrenSelected', !!ret.find);
        if (this.data.get('mode') === 'inline') {
            this.data.set('noSubClick', true);
        }

        const mode = this.data.get('mode');
        this.data.set('triggerSubMenuAction', mode === 'inline' ? 'click' : 'hover');
    },
    messages: {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
        },
        santd_menu_addSubMenu(payload) {
            this.subMenus.push(payload.value);
        },
        santd_menu_isSelected(payload) {
            this.data.set('isChildrenSelected', true);
        },
        santd_menu_itemClick(payload) {
            if (this.data.get('mode') !== 'inline') {
                this.data.set('noSubClick', false);
            }
            this.dispatch('santd_menu_itemClick', payload.value);
        }
    },
    components: {
        's-animate': Animate,
        's-trigger': Trigger
    },
    getTitleStyle(mode, level) {
        const inlineIndent = this.data.get('inlineIndent');

        return mode === 'inline'
            ? `padding-left: ${inlineIndent * level}px;`
            : '';
    },
    triggerOpenChange(open, type) {
        const key = this.data.get('key');
        if (type === 'mouseenter') {
            this.mouseenterTimeout = setTimeout(() => {
                this.dispatch('santd_menu_openChange', {key, item: this, trigger: type, open});
            }, 0);
        }
        else {
            this.dispatch('santd_menu_openChange', {key, item: this, trigger: type, open});
        }
    },
    handleTitleClick(e) {
        if (this.data.get('triggerSubMenuAction') === 'hover') {
            return;
        }

        this.triggerOpenChange(!this.data.get('isOpen'), 'click');
    },
    handleVisibleChange(visible) {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('noSubClick', visible);
        this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
    },
    getPopupContainer() {
        return () => this.el;
    },
    template: `
        <li class="{{classes}}"
            role="menuitem"
        >
            <template s-if="mode === 'inline'">
                <div
                    class="{{menuPrefixCls}}-title"
                    aria-expanded="{{isOpen}}"
                    aria-haspopup="true"
                    title="{{title}}"
                    style="{{getTitleStyle(mode, level)}}"
                    on-click="handleTitleClick"
                >
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                    <i class="{{menuPrefixCls}}-arrow" />
                </div>
                <s-animate hiddenClassName="${prefixCls}-hidden" showProp="visible" visible="{{isOpen}}" animation="{{openAnimation}}">
                    <ul class="${prefixCls} {{rootPrefixCls}}-sub ${prefixCls}-{{mode}}"><slot /></ul>
                </s-animate>
            </template>
            <s-trigger
                s-else
                prefixCls="${prefixCls}"
                style="display: block;"
                popupPlacement="{{mode === 'horizontal' ? 'bottomCenter' : 'rightTop'}}"
                builtinPlacements="{{builtinPlacements}}"
                popupAlign="{{popupAlign}}"
                popupTransitionName="{{transitionName}}"
                defaultPopupVisible="{{defaultVisible}}"
                getPopupContainer="{{getPopupContainer()}}"
                mouseEnterDelay="{{mouseEnterDelay}}"
                mouseLeaveDelay="{{mouseLeaveDelay}}"
                popupClassName="{{overlayClassName}}"
                popupStyle="{{overlayStyle}}"
                action="hover"
                visible="{{isOpen}}"
                stretch="{{mode === 'horizontal' ? 'minWidth' : ''}}"
                on-visibleChange="handleVisibleChange"
            >
                <ul class="${prefixCls} {{rootPrefixCls}}-sub ${prefixCls}-{{mode}}" slot="popup"><slot /></ul>
                <div
                    class="{{menuPrefixCls}}-title"
                    aria-expanded="{{isOpen}}"
                    aria-haspopup="true"
                    title="{{title}}"
                    style="{{getTitleStyle(mode, level)}}"
                    on-click="handleTitleClick"
                >
                    <slot name="title" s-if="!title" />
                    <template s-else>{{title}}</template>
                    <i class="{{menuPrefixCls}}-arrow" />
                </div>
            </s-trigger>
        </li>
    `
});
