/**
* @file sider.js
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Icon from 'santd/icon';
const pagin = classCreator('layout-sider');
const prefixCls = pagin();

const dimensionMap = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px'
};
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = mediaQuery => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

export default san.defineComponent({
    dataTypes: {
        collapsedWidth: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        collapsible: DataTypes.bool,
        theme: DataTypes.oneOf(['light', 'dark']),
        width: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        breakpoint: DataTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
        collapsed: DataTypes.bool
    },
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            // 是否可折叠,如果能折叠，说明需要动态的改变宽度
            const collapsed = this.data.get('collapsed');
            const siderWidth = this.data.get('siderWidth');
            const theme = this.data.get('theme') || 'dark';
            const collapsible = this.data.get('collapsible');
            const trigger = this.data.get('trigger');
            return classNames({
                [`${prefixCls}`]: true,
                [`${prefixCls}-${theme}`]: true,
                [`${prefixCls}-collapsed`]: collapsed,
                [`${prefixCls}-has-trigger`]: collapsible && trigger !== null,
                [`${prefixCls}-zero-width`]: +siderWidth === 0
            });
        },
        styles() {
            const siderWidth = this.data.get('siderWidth') + 'px';
            const style = this.data.get('style') || {};
            return {
                ...style,
                'flex': `0 0 ${siderWidth}`,
                'max-width': siderWidth,
                'min-width': siderWidth,
                'width': siderWidth
            };
        },
        siderWidth() {
            // 确定sider宽度
            return this.data.get('collapsed') || this.data.get('defaultCollapsed')
                ? +this.data.get('collapsedWidth')
                : +this.data.get('width');
        }
    },
    initData() {
        return {
            componentPropName: 'a-layout-sider',
            // 是否可折叠
            collapsible: false,
            width: 200,
            collapsedWidth: 80,
            mediaChange: false,
            collapsed: false
        };
    },
    inited() {
        const collapsedWidth = +this.data.get('collapsedWidth');
        this.data.set('trigger', this.data.get('trigger'));
        this.data.set('collapsedWidth', collapsedWidth);
    },
    attached() {
        this.dispatch('addSider', this.id);
        const defaultCollapsed = this.data.get('defaultCollapsed');
        const collapsed = this.data.get('collapsed');
        const collapsedWidth = +this.data.get('collapsedWidth');
        let matchMedia;
        let breakpoint = this.data.get('breakpoint');
        if (collapsed || defaultCollapsed) {
            this.data.set('collapsedWidth', 80);
            this.handleMenuCollapsed(true);
        }
        else {
            this.data.set('collapsedWidth', collapsedWidth);
        }
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia && breakpoint && breakpoint in dimensionMap) {
            this.mql = matchMedia(`(max-width: ${dimensionMap[breakpoint]})`);
        }
        if (this.mql) {
            this.mql.addListener(this.responsiveHandler.bind(this));
            this.responsiveHandler(this.mql);
        }
    },
    responsiveHandler(mql) {
        if (mql.matches) {
            this.data.set('mediaChange', true);
            this.data.set('collapsed', true);
        }
        else {
            this.data.set('mediaChange', false);
            this.data.set('collapsed', false);
        }
        this.fire('breakpoint', mql);
    },
    detached() {
        this.dispatch('removeSider', this.id);
        if (this.mql) {
            this.mql.removeListener(this.responsiveHandler.bind(this));
        }
    },
    handleMenuCollapsed(singal = false) {
        const slot = this.slot()[0];
        if (slot && slot.isInserted && slot.children) {
            slot.children.forEach(child => {
                if (child.data && child.data.get('componentPropName') === 'a-menu') {
                    child.data.set('inlineCollapsed', singal);
                }
            });
        }
    },
    toggle() {
        // 点击进行左侧sider显示和隐藏
        this.data.set('collapsed', !this.data.get('collapsed'));
        this.fire('collapse', this.data.get('collapsed'));
        this.handleMenuCollapsed(false);
    },
    template: `
        <sider class="{{classes}}" style="{{styles}}">
            <div class="${prefixCls}-children">
                <slot></slot>
            </div>
            <span
                s-if="{{collapsedWidth === 0 && trigger !== 'null' && mediaChange}}"
                class="${prefixCls}-zero-width-trigger"
                on-click="toggle"
            >
                <s-icon type="{{trigger || 'bars'}}"></s-icon>
            </span>
            <!--<div
                s-if="{{collapsible && !(below && zeroWidthTrigger)}}"
                class="${prefixCls}-trigger"
                style="width: {{siderWidth}}px"
            >
            </div>-->
        </sider>
    `
});
