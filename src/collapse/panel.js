/**
 * @file Santd collapse panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import PanelContent from './panelContent';
import Icon from '../icon';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        id: DataTypes.string,
        header: DataTypes.string,
        headerClass: DataTypes.string,
        showArrow: DataTypes.bool,
        isActive: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool,
        disabled: DataTypes.bool,
        accordion: DataTypes.bool,
        forceRender: DataTypes.bool,
        panelKey: DataTypes.oneOfType([DataTypes.string, DataTypes.number])
    },

    initData() {
        return {
            showArrow: true,
            isActive: false,
            destroyInactivePanel: false,
            headerClass: '',
            forceRender: false
        };
    },

    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            let classArr = [`${prefixCls}-item`];

            this.data.get('isActive') && classArr.push(`${prefixCls}-item-active`);
            this.data.get('disabled') && classArr.push(`${prefixCls}-item-disabled`);
            !this.data.get('showArrow') && classArr.push(`${prefixCls}-no-arrow`);

            return classArr;
        }
    },

    inited() {
        this.data.set('hasExpandIcon', !!this.sourceSlots.named[this.data.get('expandIcon')]);
    },

    attached() {
        this.dispatch('santd_panel_add', this);
    },

    components: {
        's-panelcontent': PanelContent,
        's-icon': Icon
    },

    handleItemClick() {
        if (this.data.get('disabled')) {
            return;
        }
        this.dispatch('santd_panel_click', this.data.get('panelKey'));
    },

    handleKeyPress(e) {
        if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
            this.handleItemClick();
        }
    },

    template: `
        <div class="{{classes}}" id="{{id}}">
            <div
                class="{{prefixCls}}-header {{headerClass}}"
                role="{{accordion ? 'tab': 'button'}}"
                tabIndex="{{disabled ? -1 : 0}}"
                aria-expanded="{{isActive}}"
                on-click="handleItemClick"
                on-keypress="handleKeyPress"
            >
                <s-icon
                    s-if="{{!hasExpandIcon && showArrow}}"
                    type="{{expandIcon || 'right'}}"
                    rotate="{{isActive ? 90 : 0}}"
                    class="{{prefixCls}}-arrow"
                />
                <slot
                    s-else-if="{{showArrow}}"
                    name="{{expandIcon}}"
                    var-isActive="{{isActive}}"
                    var-prefixCls="{{prefixCls}}"
                />
                {{header}}<slot name="header" />
                <div class="{{prefixCls}}-extra"><slot name="extra" /></div>
            </div>
            <s-panelcontent
                s-if="{{forceRender || isActive}}"
                prefixCls="{{prefixCls}}"
                forceRender="{{forceRender}}"
                isActive="{{isActive}}"
                destroyInactivePanel="{{destroyInactivePanel}}"
            >
                <slot />
            </s-panelcontent>
        </div>
    `
});
