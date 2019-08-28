/**
* @file subMenu component
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Trigger from '../core/trigger/index';
import {findComponentsLevel} from '../core/util/findCompont';
const prefixCls = classCreator('menu-submenu')();

const BUILT_IN_PLACEMENTS = {
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
    components: {
        's-trigger': Trigger
    },
    computed: {
        getRealMenuMode() {
            const inlineCollapsed = this.data.get('inlineCollapsed');
            const mode = this.data.get('mode');
            return inlineCollapsed ? 'vertical' : mode;
        },
        isInlineMode() {
            const mode = this.data.get('getRealMenuMode');
            if (mode === 'inline') {
                return true;
            }
            return false;
        },
        popupPlacement() {
            const mode = this.data.get('getRealMenuMode');
            if (mode === 'horizontal') {
                return 'bottomCenter';
            }
            return 'rightTop';
        },
        isOpened() {
            const key = this.data.get('key');
            const openKeys = this.data.get('openKeys') || [];
            const collapsed = this.data.get('inlineCollapsed') || false;
            let isOpen = false;
            openKeys.forEach(okey => {
                if (okey === key && !collapsed) {
                    isOpen = true;
                }
            });
            return isOpen;
        },
        classes() {
            const mode = this.data.get('getRealMenuMode');
            const selected = this.data.get('selected');
            const disabled = this.data.get('disabled');
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-submenu` : `${prefixCls}`;
            const isOpen = this.data.get('isOpened');
            let classArr = [newPrefixCls, `${newPrefixCls}-${mode}`];
            isOpen && classArr.push(`${newPrefixCls}-open`);
            disabled && classArr.push(`${newPrefixCls}-disabled`);
            selected && classArr.push(`${newPrefixCls}-selected`);
            return classArr;
        },
        subTitle() {
            const title = this.data.get('title');
            if (typeof title === 'string') {
                return title;
            }
            return '';
        },
        subMenuTitleClass() {
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-submenu` : `${prefixCls}`;
            return [`${newPrefixCls}-title`];
        },
        subMenuArrowClass() {
            const prefix = this.data.get('prefixCls');
            const newPrefixCls = prefix ? `${prefix}-menu-submenu` : `${prefixCls}`;
            return [`${newPrefixCls}-arrow`];
        },
        titleStyle() {
            const inlineIndent = this.data.get('inlineIndent');
            if (this.data.get('mode') === 'inline') {
                const level = this.data.get('level');
                return {'padding-left': inlineIndent + level * inlineIndent + 'px'};

            }
        },
        inlineModeShow() {
            // 处理inline模式下显示隐藏问题
            const isInlineMode = this.data.get('isInlineMode');
            if (isInlineMode) {
                return 'inlineShow';
            }
            return 'inlineHide';
        },
        inlineModeHide() {
            const isInlineMode = this.data.get('isInlineMode');
            if (isInlineMode) {
                return 'inlineHide';
            }
            return 'inlineShow';
        }
    },
    initData() {
        return {
            componentPropName: 's-sub-menu',
            inlineIndent: 24,
            mode: 'vertical',
            placements: BUILT_IN_PLACEMENTS,
            popup: this.components.injectslot
        };
    },
    compiled() {
        // const parent = this.getTargetComponent('mode');
        // const parMode = parent.data.get('mode');
        const slots = this.sourceSlots;
        this.sourceSlots = {};
        const source = this.source;
        const scope = this.scope;
        const owner = this.owner;
        const that = this;
        this.components.injectslot = san.defineComponent({
            components: that.parentComponent.components,
            compiled() {
                this.source = source;
                this.owner = owner;
                this.sourceSlots = slots;
                this._initSourceSlots();
            },
            initData() {
                return {
                    isOpened: true,
                    mode: 'vertical'
                };
            },
            template: `
                <ul class="san-menu san-menu-sub san-menu-{{mode}} {{isOpened ? '' : 'san-menu-hidden'}}">
                    <slot/>
                </ul>`
        });

    },
    inited() {
        const parent = this.getTargetComponent('mode');
        const {
            mode,
            inlineIndent,
            openKeys = [],
            defaultOpenKeys = [],
            inlineCollapsed,
            subMenuCloseDelay,
            subMenuOpenDelay,
            forceSubMenuRender = true,
            prefixCls
        } = parent.data.get();
        const newOpenKeys = openKeys.length ? [...openKeys] : [...defaultOpenKeys];
        this.data.set('mode', mode);
        this.data.set('inlineIndent', inlineIndent);
        this.data.set('openKeys', newOpenKeys);
        this.data.set('defaultOpenKeys', defaultOpenKeys);
        this.data.set('inlineCollapsed', inlineCollapsed);
        this.data.set('subMenuCloseDelay', subMenuCloseDelay);
        this.data.set('subMenuOpenDelay', subMenuOpenDelay);
        this.data.set('forceSubMenuRender', forceSubMenuRender);
        this.data.set('prefixCls', prefixCls);
    },
    getTargetComponent(attr) {
        let parent = this.parentComponent;
        let hasTar = parent.data.get(attr);
        while (parent && !hasTar) {
            parent = parent.parentComponent;
            hasTar = parent && parent.data.get(attr);
        }
        return parent;
    },
    created() {
        this.timer = null;
        const disabled = this.data.get('disabled');
        // 处理 getPopupContainer
        const mode = this.data.get('getRealMenuMode');
        // const parentComponent = this.findTargetCompo('componentPropName');
        if (disabled) {
            this.data.set('visible', false);
        }
        if (mode !== 'inline') {
            this.data.set('getPopupContainer', function (triggerNode) {
                return triggerNode;
            });
        }

    },
    findTargetCompo(compoName) {
        let tar = this.parentComponent.data.get(compoName) === 's-sub-menu';
        let parent = this.parentComponent;
        while (parent && !tar) {
            parent = parent.parentComponent;
            tar = parent && parent.data.get(compoName) === 's-sub-menu';
        }
        return tar;
    },
    attached() {
        // dispatch this component
        this.dispatch('subMenuRender', this);
        let renderer;
        let TitleRender;
        const titleComponent = this.data.get('title');
        const subMenuTitle = this.ref('subMenuTitle');
        const triggerTitle = this.ref('triggerTitle');
        if (typeof titleComponent === 'function') {
            TitleRender = titleComponent();
        }
        if (subMenuTitle && TitleRender) {
            renderer = new TitleRender();
            renderer.attach(subMenuTitle);
            renderer.parentComponent = this;
        }
        if (triggerTitle && TitleRender) {
            renderer = new TitleRender();
            renderer.attach(triggerTitle);
            renderer.parentComponent = this;
        }
        // 获取层级关系
        const level =  findComponentsLevel(this, 's-sub-menu').length;
        this.data.set('level', level);

    },

    messages: {
        itemClick(data) {
            const clickData = data.value;
            const mode = this.data.get('getRealMenuMode');
            if (mode !== 'inline') {
                clickData['fromSub'] = true;
                this.data.set('popupVisible', false, {force: true});
                this.dispatch('subMenuSelected', this);
            }
            this.dispatch('itemClick', clickData);
        }
    },
    subMenuClick(e) {
        e.stopPropagation();
        const mode = this.data.get('getRealMenuMode');
        if (mode !== 'inline') {
            return null;
        }
        const key = this.data.get('key');
        this.dispatch('subMenuClick', key);
    },
    subMenuMouseEnter() {
        // menu title mouseenter
        const {getRealMenuMode, openKeys, key} = this.data.get();
        if (getRealMenuMode !== 'inline') {
            this.data.set('isOpened', true);
        }
    },
    subMenuMouseLeave() {
        // 拿openkeys跟this的keys进行对比，如果不同，则删掉
        const {getRealMenuMode, openKeys, key} = this.data.get();
        if (getRealMenuMode !== 'inline') {
            this.timer = setTimeout(() => {
                this.data.set('isOpened', false);
            }, 20);
        }
    },
    popupMouseEnter() {
        clearTimeout(this.timer);
        this.timer = null;
    },
    popupMouseLeave() {
        // 下拉框部分mouseleave
        this.data.set('isOpened', false);
    },
    template: `
        <li class="{{classes}}"
            on-click="subMenuClick($event)"
            on-mouseenter="subMenuMouseEnter"
            on-mouseleave="subMenuMouseLeave"
            >
            <div class="{{subMenuTitleClass}} {{inlineModeShow}}" style="{{titleStyle}}">
                <span s-ref="subMenuTitle">{{subTitle}}</span>
                <i class="{{subMenuArrowClass}}">
                </i>
            </div>
            <div class="{{inlineModeShow}}">
                <injectslot isOpened="{{isOpened}}" mode="{{getRealMenuMode}}"></injectslot>
            </div>

            <s-trigger
                builtinPlacements="{{placements}}"
                popupPlacement="{{popupPlacement}}"
                action="hover"
                popup="{{popup}}"
                style="display: block"
                visible="{{visible}}"
                popupVisible="{{popupVisible}}"
                on-popupMouseLeave="popupMouseLeave"
                on-popupMouseEnter="popupMouseEnter"
                getPopupContainer="{{getPopupContainer}}"
                mouseEnterDelay="{{subMenuOpenDelay}}"
                mouseLeaveDelay="{{subMenuCloseDelay}}"
                forceRender="{{forceSubMenuRender}}"
            >
                <div class="{{subMenuTitleClass}} {{inlineModeHide}}" style="{{titleStyle}}">
                    <span s-ref="triggerTitle">{{subTitle}}</span>
                    <i class="{{subMenuArrowClass}}">
                    </i>
                </div>
            </s-trigger>
        </li>
    `
});
