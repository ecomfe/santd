/**
 * @file Santd calendar footer file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import TodayButton from './todayButton';
import OkButton from './okButton';
import TimepickerButton from './timepickerButton';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        showDateInput: DataTypes.bool,
        disabledDate: DataTypes.func,
        disabledTime: DataTypes.func,
        selectedValue: DataTypes.object,
        value: DataTypes.object,
        mode: DataTypes.string,
        defaultValue: DataTypes.object
    },
    components: {
        's-todaybutton': TodayButton,
        's-okbutton': OkButton,
        's-timepickerbutton': TimepickerButton
    },
    handleOk() {
        this.fire('ok');
    },
    handleToday() {
        this.fire('today');
    },
    handleCloseTimePicker() {
        this.fire('closeTimePicker');
    },
    handleOpenTimePicker() {
        this.fire('openTimePicker');
    },
    template: `
        <div class="{{prefixCls}}-footer {{showTime ? prefixCls + '-footer-show-ok' : ''}}">
            <span
                s-if="showToday || showTime || hasExtraFooter"
                class="{{prefixCls}}-footer-btn"
            >
                <slot name="renderExtraFooter" />
                <s-todaybutton
                    prefixCls="{{prefixCls}}"
                    value="{{value}}"
                    s-if="showToday"
                    locale="{{locale}}"
                    disabledDate="{{disabledDate}}"
                    disabledTime="{{disabledTime}}"
                    on-today="handleToday"
                />
                <s-timepickerbutton
                    s-if="showTime"
                    locale="{{locale}}"
                    prefixCls="{{prefixCls}}"
                    showTimePicker="{{showTimePicker}}"
                    disabledDate="{{disabledDate}}"
                    disabledTime="{{disabledTime}}"
                    on-closeTimePicker="handleCloseTimePicker"
                    on-openTimePicker="handleOpenTimePicker"
                />
                <s-okbutton
                    prefixCls="{{prefixCls}}"
                    s-if="showTime"
                    locale="{{locale}}"
                    disabled="{{disabled}}"
                    on-ok="handleOk"
                />
            </span>
        </div>
    `
});
