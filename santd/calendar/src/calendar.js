/**
 * @file Santd calendar source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Base from './base';
import CalendarHeader from './calendar/calendarHeader';
import DateTable from './date/dateTable';
import inherits from 'santd/core/util/inherits';
import moment from 'moment';

export default inherits(san.defineComponent({
    components: {
        's-calendarheader': CalendarHeader,
        's-datetable': DateTable
    },
    computed: {
        showTimePicker() {
            const mode = this.data.get('mode');

            return mode === 'time';
        }
    },
    inited() {
        const mode = this.data.get('mode');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('mode', mode || 'date');
        this.data.set('value', value || defaultValue || moment());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
    },
    handleDateTableSelect(value) {
        this.data.set('value', value);
    },
    template: `
        <div
            class="{{classes}}"
            tabIndex="0"
            on-keydown="handleKeyDown"
            on-blur="handleBlur"
        >
            <div class="{{prefixCls}}-panel" key="panel">
                <div class="{{prefixCls}}-date-panel">
                    <s-calendarheader
                        locale="{{locale}}"
                        mode="{{mode}}"
                        value="{{value}}"
                        on-valueChange="setValue"
                        on-panelChange="handlePanelChange"
                        renderFooter="{{renderFooter}}"
                        showTimePicker="{{showTimePicker}}"
                        prefixCls="{{prefixCls}}"
                    />
                    <div class="{{prefixCls}}-body">
                        <s-datetable
                            locale="{{locale}}"
                            value="{{value}}"
                            selectedValue="{{selectedValue}}"
                            prefixCls="{{prefixCls}}"
                            dateRender="{{dateRender}}"
                            disabledDate="{{disabledDate}}"
                            showWeekNumber="{{showWeekNumber}}"
                            on-select="handleDateTableSelect"
                        />
                    </div>
                </div>
            </div>
        </div>
    `
}), Base);
