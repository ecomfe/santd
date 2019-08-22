/**
 * @file Santd collapse panel file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import PanelContent from './panelContent';

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
            const isActive = this.data.get('isActive');
            const disabled = this.data.get('disabled');
            const className = this.data.get('className');
            let classArr = [`${prefixCls}-item`, className];

            isActive && classArr.push(`${prefixCls}-item-active`);
            disabled && classArr.push(`${prefixCls}-item-disabled`);

            return classArr;
        }
    },
    compiled() {
        this.components.expandicon = this.parentComponent.data.get('expandIcon');
    },
    inited() {
        this.data.set('instance', this);
    },
    attached() {
        this.dispatch('santd_panel_add', this);
        this.watch('prefixCls', val => {
            const expandIcon = this.ref('expandIcon');
            if (expandIcon) {
                expandIcon.el.className = val + '-arrow';
            }
        });
    },
    components: {
        's-panelcontent': PanelContent
    },
    handleItemClick() {
        if (this.data.get('disabled')) {
            return;
        }
        const panelKey = this.data.get('panelKey');
        this.dispatch('santd_panel_click', panelKey);
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
                <expandicon
                    prefixCls="{{prefixCls}}"
                    s-if="{{showArrow}}"
                    s-ref="expandIcon"
                    isActive="{{isActive}}">
                </expandicon>
                {{header}}<slot name="header"></slot>
                <div class="{{prefixCls}}-extra"><slot name="extra"></slot></div>
            </div>
            <s-panelcontent
                s-if="{{forceRender || isActive}}"
                prefixCls="{{prefixCls}}"
                forceRender="{{forceRender}}"
                isActive="{{isActive}}"
                destroyInactivePanel="{{destroyInactivePanel}}"
            >
                <slot></slot>
            </s-panelcontent>
        </div>
    `
});
