/**
 * @file Santd tooltip content file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        id: DataTypes.string
    },
    attached() {
        const trigger = this.data.get('trigger');
        trigger && trigger.forcePopupAlign();
    },
    template: `
        <div class="{{prefixCls}}-inner" id="{{id}}" role="tooltip">
            <slot></slot>
        </div>
    `
});
