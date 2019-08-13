/**
 * @file Santd calendar footer file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
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
        renderFooter: DataTypes.func,
        mode: DataTypes.string,
        defaultValue: DataTypes.object
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const hasOkBtn = this.data.get('hasOkBtn');

            return classNames(`${prefixCls}-footer`, {
                [`${prefixCls}-footer-show-ok`]: hasOkBtn
            });
        },
        hasOkBtn() {
            const showOk = this.data.get('showOk');
            const timePicker = this.data.get('timePicker');
            return showOk === true || showOk !== false && !!timePicker;
        },
        injectFooter() {
            const renderFooter = this.data.get('renderFooter');
            const instance = this.data.get('instance');
            if (instance && renderFooter) {
                instance.components.footer = renderFooter;
            }
        }
    },
    inited() {
        this.data.set('instance', this);
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
        <div class="{{classes}}">
            <span
                s-if="showToday || timePicker || hasOkBtn || renderFooter"
                class="{{prefixCls}}-footer-btn"
            >
                <footer s-if="renderFooter" />
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
                    s-if="hasOkBtn"
                    locale="{{locale}}"
                    okDisabled="{{okDisabled}}"
                    on-ok="handleOk"
                />
            </span>
        </div>
    `
});
