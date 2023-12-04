/**
 * @file Santd calendar footer file
 * @author mayihui@baidu.com wufuguo@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import TodayButton from './TodayButton';
import OkButton from './OkButton';
import TimepickerButton from './TimepickerButton';

export default class CalendarFooter extends Base<I.CalendarFooterState, I.CalendarFooterProps, I.CalendarFooterComputed> {
    static components = {
        's-todaybutton': TodayButton,
        's-okbutton': OkButton,
        's-timepickerbutton': TimepickerButton
    }
    handleOk(): void {
        this.fire('ok');
    }
    handleToday(): void  {
        this.fire('today');
    }
    handleCloseTimePicker(): void  {
        this.fire('closeTimePicker');
    }
    handleOpenTimePicker(): void  {
        this.fire('openTimePicker');
    }
    static template = /* html */ `
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
};
