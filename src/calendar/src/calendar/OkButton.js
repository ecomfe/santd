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
        if (!this.data.get('disabled')) {
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
