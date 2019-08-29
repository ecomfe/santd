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

    template: `
        <div class="{{prefixCls}}-content {{prefixCls}}-content-{{isActive ? 'active' : 'inactive'}}" role="{{role}}">
            <div
                s-if="{{forceRender || isActive || !destroyInactivePanel}}"
                class="{{prefixCls}}-content-box"
            >
                <slot />
            </div>
        </div>
    `
});
