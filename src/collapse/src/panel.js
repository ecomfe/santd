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
            let classArr = [`${prefixCls}-item`];

            this.data.get('isActive') && classArr.push(`${prefixCls}-item-active`);
            this.data.get('disabled') && classArr.push(`${prefixCls}-item-disabled`);
            !this.data.get('showArrow') && classArr.push(`${prefixCls}-no-arrow`);

            return classArr;
        }
    },

    compiled() {
        this.components.expandicon = this.parentComponent.data.get('expandIcon');
    },

    attached() {
        this.dispatch('santd_panel_add', this);
        this.watch('prefixCls', val => {
            if (this.ref('expandIcon')) {
                this.data.set('hasExpandIcon', true);
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
                <expandicon
                    class="{{hasExpandIcon ? prefixCls + '-arrow' : ''}}"
                    prefixCls="{{prefixCls}}"
                    s-if="{{showArrow}}"
                    s-ref="expandIcon"
                    isActive="{{isActive}}"
                />{{header}}<slot name="header" />
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
