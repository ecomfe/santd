/**
 * @file Santd month calendar source file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Base from './base';
import CalendarHeader from './calendar/calendarHeader';
import inherits from '../../core/util/inherits';
import moment from 'moment';

export default inherits(san.defineComponent({
    initData() {
        return {
            mode: 'month'
        };
    },
    inited() {
        let value = this.data.get('value') || this.data.get('defaultValue') || moment();
        let selectedValue = this.data.get('selectedValue') || this.data.get('defaultSelectedValue');
        const localeCode = this.data.get('localeCode');

        localeCode && value.locale(localeCode);

        this.data.set('value', value);
        this.data.set('selectedValue', selectedValue);
        this.data.set('mode', 'month');

        this.watch('selectedValue', val => {
            localeCode && val.locale(localeCode);
            this.data.set('value', val);
        });
    },
    handleMonthSelect(value) {
        this.fire('select', {value});
    },
    handlePanelChange({value, mode}) {
        if (mode && mode !== 'date') {
            this.data.set('mode', mode);
        }
        this.fire('panelChange', {value: value || this.data.get('value'), mode});
    },
    components: {
        's-calendarheader': CalendarHeader
    },
    template: `
        <div
            class="{{classes}} {{prefixCls}}-month-calendar"
            tabIndex="0"
        >
            <div class="{{prefixCls}}-month-calendar-contnet">
                <div class="{{prefixCls}}-month-header-wrap">
                    <s-calendarheader
                        prefixCls="{{prefixCls}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        locale="{{locale}}"
                        disabledMonth="{{disabledDate}}"
                        hasExtraFooter="{{hasExtraFooter}}"
                        on-valueChange="setValue"
                        on-panelChange="handlePanelChange"
                        on-monthSelect="handleMonthSelect"
                    >
                        <slot name="renderExtraFooter" slot="renderExtraFooter" />
                    </s-calendarheader>
                </div>
            </div>
        </div>
    `
}), Base);
