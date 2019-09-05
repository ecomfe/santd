/**
* @file sider.js
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';
const prefixCls = classCreator('layout-sider')();

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
            let classArr = [prefixCls, `${prefixCls}-${theme}`];

            collapsed && classArr.push(`${prefixCls}-collapsed`);
            collapsible && trigger !== null && classArr.push(`${prefixCls}-has-trigger`);
            +siderWidth === 0 && classArr.push(`${prefixCls}-zero-width`);
            return classArr;
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
            // componentPropName: 'a-layout-sider',
            // 是否可折叠
            collapsible: false,
            width: 200,
            collapsedWidth: 80,
            mediaChange: false,
            collapsed: false
        };
    },

    attached() {
        this.dispatch('santd_layout_addSider', this.id);

        const collapsed = this.data.get('collapsed') || this.data.get('defaultCollapsed');
        const collapsedWidth = +this.data.get('collapsedWidth');
        let matchMedia = window && window.matchMedia;
        let breakpoint = this.data.get('breakpoint');

        this.data.set('collapsedWidth', collapsed ? 80 : collapsedWidth);
        collapsed && this.handleMenuCollapsed(true);
        if (matchMedia && breakpoint && breakpoint in dimensionMap) {
            this.mql = matchMedia(`(max-width: ${dimensionMap[breakpoint]})`);
            this.mql.addListener(this.responsiveHandler.bind(this));
            this.responsiveHandler(this.mql);
        }
    },

    responsiveHandler(mql) {
        this.data.set('mediaChange', !!mql.matches);
        this.data.set('collapsed', !!mql.matches);
        this.fire('breakpoint', mql);
    },

    detached() {
        this.dispatch('santd_layout_removeSider', this.id);
        this.mql && this.mql.removeListener(this.responsiveHandler.bind(this));
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
                <slot />
            </div>
            <span
                s-if="collapsedWidth === 0 && trigger !== 'null' && mediaChange"
                class="${prefixCls}-zero-width-trigger"
                on-click="toggle"
            >
                <s-icon type="{{trigger || 'bars'}}" />
            </span>
        </sider>
    `
});
