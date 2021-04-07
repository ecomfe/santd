/**
 * @file Santd calendar timepicker button file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        showTimePicker: DataTypes.bool,
        locale: DataTypes.object,
        disabled: DataTypes.bool
    },
    handleClick() {
        const showTimePicker = this.data.get('showTimePicker');
        if (!this.data.get('disabled')) {
            this.fire(showTimePicker ? 'closeTimePicker' : 'openTimePicker');
        }
    },
    template: `
        <a
            class="{{prefixCls}}-time-picker-btn {{disabled ? prefixCls + '-time-picker-btn-disabled' : ''}}"
            role="button"
            on-click="handleClick"
        >
            {{showTimePicker ? locale.dateSelect : locale.timeSelect}}
        </a>
    `
});
