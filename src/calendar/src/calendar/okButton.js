/**
 * @file Santd calendar ok button file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        disabled: DataTypes.bool,
        locale: DataTypes.object
    },
    handleClick() {
        const disabled = this.data.get('okDisabled');
        if (!disabled) {
            this.fire('ok');
        }
    },
    template: `
        <a
            class="{{prefixCls}}-ok-btn {{disabled ? prefixCls + '-ok-btn-disabled' : ''}}"
            role="button"
            on-click="handleClick"
        >
            {{locale.ok}}
        </a>
    `
});
