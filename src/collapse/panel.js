/**
 * @file Santd collapse panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';

const prefixCls = classCreator('collapse')();

const PanelContent = san.defineComponent({
    dataTypes: {
        isActive: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool,
        forceRender: DataTypes.bool,
        role: DataTypes.string
    },

    template: `
        <div class="${prefixCls}-content ${prefixCls}-content-{{isActive ? 'active' : 'inactive'}}" role="{{role}}">
            <div
                s-if="forceRender || isActive || !destroyInactivePanel"
                class="${prefixCls}-content-box"
            >
                <slot />
            </div>
        </div>
    `
});

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
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
            let classArr = [];

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
        <div class="${prefixCls}-item {{classes}}">
            <div
                class="${prefixCls}-header {{headerClass}}"
                role="{{accordion ? 'tab': 'button'}}"
                tabIndex="{{disabled ? -1 : 0}}"
                aria-expanded="{{isActive}}"
                on-click="handleItemClick"
                on-keypress="handleKeyPress"
            >
                <s-icon
                    s-if="!hasExpandIcon && showArrow"
                    type="{{expandIcon || 'right'}}"
                    rotate="{{isActive ? 90 : 0}}"
                    class="${prefixCls}-arrow"
                />
                <slot
                    s-else-if="showArrow"
                    name="{{expandIcon}}"
                    var-isActive="{{isActive}}"
                />
                {{header}}<slot name="header" />
                <div class="${prefixCls}-extra"><slot name="extra" /></div>
            </div>
            <s-panelcontent
                s-if="forceRender || isActive"
                force-render="{{forceRender}}"
                is-active="{{isActive}}"
                destroy-inactive-panel="{{destroyInactivePanel}}"
            >
                <slot />
            </s-panelcontent>
        </div>
    `
});
