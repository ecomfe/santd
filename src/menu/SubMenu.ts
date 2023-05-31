/**
* @file subMenu component
* @author fuqiangqiang@baidu.com
*/
import Base from 'santd/base';
import {classCreator, isUndefined} from '../core/util';
import Trigger from '../core/trigger';
import Animate from '../core/util/animate';
import openAnimation from '../core/util/openAnimation';
import {MENU_FOLDED_ITEM_ID} from '../core/constants';
import {getParentNode} from '../core/util/dom';
import {
    SubMenuState as State,
    SubMenuProps as Props,
    SubMenuComputed as Computed,
    ItemType,
    TriggerChangeAction,
    InnerItem,
    SelectChangeEvent
} from './interface';

type Message = {
    santd_menu_addItem: (this: SubMenu, payload: {value: ItemType}) => void,
    santd_menu_itemClick: (this: SubMenu, payload: {value: SelectChangeEvent}) => void,
};

const prefixCls = classCreator('menu')();

function loopMenuItem(children: ItemType[] = [], keys: string[], ret: {find?: boolean} = {}) {
    children.forEach(child => {
        if (keys.includes((child as InnerItem)?.data.get('key')) && !(child as InnerItem)?.data.get('isFolded')) {
            ret.find = true;
        }
        else {
            loopMenuItem((child as InnerItem & {items: ItemType[]}).items, keys, ret);
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

export default class SubMenu extends Base<State, Props, Computed> {
    initData(): State {
        return {
            openKeys: [],
            activeKey: [],
            openAnimation,
            inlineIndent: 16,
            builtinPlacements,
            trigger: 'hover',
            transitionName: 'zoom-big',
            noSubClick: true
        };
    }

    items!: ItemType[]

    subMenus!: unknown[]

    mouseenterTimeout!: NodeJS.Timeout

    static computed: Computed =  {
        // 因为menu有其他组件调用传入prefixCls，所以这里需要重新设置menu prefixCls
        menuPrefixCls(this: SubMenu) {
            const rootPrefixCls = this.data.get('rootPrefixCls');

            return (rootPrefixCls ? rootPrefixCls : prefixCls) + '-submenu';
        },
        classes(this: SubMenu) {
            const menuPrefixCls = this.data.get('menuPrefixCls');
            const mode = this.data.get('inFoldedItem') ? 'vertical' : this.data.get('mode');
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
        isOpen(this: SubMenu) {
            const key = this.data.get('key');
            const noSubClick = this.data.get('noSubClick');

            return this.data.get('openKeys').includes(key) && noSubClick;
        },
        active(this: SubMenu) {
            const subMenuKey = this.data.get('subMenuKey');
            if (subMenuKey) {
                return this.data.get('activeKey')[subMenuKey] === this.data.get('key');
            }
        }
    }
    inited() {
        this.items = [];
        this.subMenus = [];
        this.dispatch('santd_menu_addItem', this);
    }
    attached() {
        this.data.set('inFoldedItem', (getParentNode(this.el as ParentNode, 6) as Element).id === MENU_FOLDED_ITEM_ID);
    }
    updated() {
        let paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'inlineIndent', 'rootPrefixCls'];
        this.items.forEach((item, index) => {
            paramsArr.forEach(param => {
                let data = this.data.get(param);
                if (param === 'level') {
                    (data as NonNullable<Props['level']>)++;
                }
                (item as InnerItem).data.set(param, data);
            });
            if (this.data.get('itemFoldedFlags')) {
                (item as InnerItem).data.set('isFolded', !this.data.get('itemFoldedFlags')?.[index]);
            }
        });
        let selectedKeys = this.data.get('selectedKeys') || [];
        if (typeof selectedKeys === 'string') {
            selectedKeys = [selectedKeys];
        }

        let ret = loopMenuItem(this.items, selectedKeys, {});
        this.data.set('isChildrenSelected', !!ret.find);
        if (this.data.get('mode') === 'inline') {
            this.data.set('noSubClick', true);
        }

        const mode = this.data.get('mode');
        this.data.set('triggerSubMenuAction', mode === 'inline' ? 'click' : 'hover');
    }
    static messages: Message = {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
        },
        santd_menu_itemClick(payload) {
            if (this.data.get('mode') !== 'inline') {
                this.data.set('noSubClick', false);
            }
            this.dispatch('santd_menu_itemClick', payload.value);
        }
    }
    static components = {
        's-animate': Animate,
        's-trigger': Trigger
    }
    getTitleStyle(mode: Props['mode'], level: Props['level']) {
        const inlineIndent = this.data.get('inlineIndent');

        return mode === 'inline'
            ? !isUndefined(level)
                ? `padding-left: ${inlineIndent * level}px;`
                : ''
            : '';
    }
    triggerOpenChange(open: boolean, type: TriggerChangeAction) {
        const key = this.data.get('key');
        if (type === 'mouseenter') {
            this.mouseenterTimeout = setTimeout(() => {
                this.dispatch('santd_menu_openChange', {key, item: this, trigger: type, open});
            }, 0);
        }
        else {
            this.dispatch('santd_menu_openChange', {key, item: this, trigger: type, open});
        }
    }
    handleTitleClick() {
        if (this.data.get('triggerSubMenuAction') === 'hover') {
            return;
        }

        this.triggerOpenChange(!this.data.get('isOpen'), 'click');
    }
    handleVisibleChange(visible: boolean) {
        if (this.data.get('disabled')) {
            return;
        }
        this.data.set('noSubClick', visible);
        this.triggerOpenChange(visible, visible ? 'mouseenter' : 'mouseleave');
    }
    getPopupContainer() {
        return () => this.el;
    }
    static template = /* html */ `
        <li class="{{classes}}"
            role="menuitem"
            s-if="!isFolded"
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
                <s-animate
                    hiddenClassName="${prefixCls}-hidden"
                    showProp="visible"
                    visible="{{isOpen}}"
                    animation="{{openAnimation}}">
                    <ul class="${prefixCls} {{rootPrefixCls}}-sub ${prefixCls}-{{mode}}"><slot /></ul>
                </s-animate>
            </template>
            <s-trigger
                s-else
                prefixCls="${prefixCls}"
                style="display: block;"
                popupPlacement="{{inFoldedItem ? 'leftTop' : (mode === 'horizontal' ? 'bottomCenter' : 'rightTop')}}"
                builtinPlacements="{{builtinPlacements}}"
                getPopupContainer="{{getPopupContainer()}}"
                action="hover"
                visible="{{isOpen}}"
                stretch="{{mode === 'horizontal' ? 'minWidth' : ''}}"
                on-visibleChange="handleVisibleChange"
            >
                <ul class="${prefixCls} {{rootPrefixCls}}-sub ${prefixCls}-vertical" slot="popup"><slot /></ul>
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
};

export type TSubMenu = typeof SubMenu;

