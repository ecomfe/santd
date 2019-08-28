/**
 * @file Santd collapse panelContent file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        isActive: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool,
        forceRender: DataTypes.bool,
        role: DataTypes.string
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const isActive = this.data.get('isActive');
            let classArr = [`${prefixCls}-content`];

            isActive && classArr.push(`${prefixCls}-content-active`);
            !isActive && classArr.push(`${prefixCls}-content-inactive`);

            return classArr;
        }
    },
    template: `
        <div class="{{classes}}" role="{{role}}">
            <div
                s-if="{{forceRender || isActive || !destroyInactivePanel}}"
                class="{{prefixCls}}-content-box"
            >
                <slot></slot>
            </div>
        </div>
    `
});
