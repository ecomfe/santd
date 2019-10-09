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
        timePicker: DataTypes.func,
        selectedValue: DataTypes.object,
        showOk: DataTypes.bool,
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
        <div class="{{prefixCls}}-footer {{(showOk && timePicker) ? prefixCls + '-footer-show-ok' : ''}}">
            <span
                s-if="showToday || timePicker || showOk || hasExtraFooter"
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
                    s-if="timePicker"
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
                    s-if="showOk || timePicker"
                    locale="{{locale}}"
                    okDisabled="{{okDisabled}}"
                    on-ok="handleOk"
                />
            </span>
        </div>
    `
});
