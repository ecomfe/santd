/**
 * @file Santd calendar timepicker button file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';


export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        showTimePicker: DataTypes.bool,
        locale: DataTypes.object,
        timePickerDisabled: DataTypes.bool
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const timePickerDisabled = this.data.get('timePickerDisabled');

            return classNames(`${prefixCls}-time-picker-btn`, {
                [`${prefixCls}-time-picker-btn-disabled`]: timePickerDisabled
            });
        }
    },
    handleClick() {
        const timePickerDisabled = this.data.get('timePickerDisabled');
        const showTimePicker = this.data.get('showTimePicker');
        if (!timePickerDisabled) {
            this.fire(showTimePicker ? 'closeTimePicker' : 'openTimePicker');
        }
    },
    template: `
        <a
            class="{{classes}}"
            role="button"
            on-click="handleClick"
        >
            {{showTimePicker ? locale.dateSelect : locale.timeSelect}}
        </a>
    `
});
