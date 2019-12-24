/**
 * @file Santd calendar range panel file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import CalendarHeader from '../calendar/calendarHeader';
import DateTable from '../date/dateTable';
import DateInput from '../date/dateInput';
import {getTimeConfig} from '../util/index';
import moment from 'moment';

export default san.defineComponent({
    components: {
        's-calendarheader': CalendarHeader,
        's-datetable': DateTable,
        's-dateinput': DateInput
    },
    initData() {
        return {
            visible: true,
            prefixCls: 'santd-calendar',
            showToday: true,
            showDateInput: true,
            focusablePanel: true
        };
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
        this.fire('select', value);
    },
    handleDateInputChange(value) {
        this.fire('inputChange', value);
    },
    handlePanelChange({value, mode}) {
        this.fire('panelChange', {value, mode});
    },
    handleValueChange(value) {
        this.fire('valueChange', value);
    },
    handleDayHover(value) {
        this.fire('dayHover', value);
    },
    handleInputChange(value) {
        this.fire('inputChange', value);
    },
    handleDateInputClear() {
        this.fire('clear');
    },
    dateInputValue(selectedValue = []) {
        const direction = this.data.get('direction');
        const value = selectedValue[direction === 'left' ? 0 : 1];
        return value && value.clone();
    },
    getTimeConfig(selectedValue, disabledTime, mode) {
        const showTimePicker = this.data.get('showTimePicker');
        if (showTimePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return config[mode];
        }
    },
    template: `
        <div class="{{prefixCls}}-range-part {{prefixCls}}-range-{{direction}}">
            <div class="{{prefixCls}}-panel" key="panel">
                <s-dateinput
                    s-if="showDateInput"
                    format="{{format}}"
                    locale="{{locale}}"
                    prefixCls="{{prefixCls}}"
                    disabledDate="{{disabledDate}}"
                    placeholder="{{placeholder}}"
                    disabledTime="{{disabledTime}}"
                    value="{{value || defaultValue}}"
                    showClear="{{false}}"
                    selectedValue="{{dateInputValue(selectedValue)}}"
                    on-clear="handleDateInputClear"
                    on-change="handleDateInputChange"
                />
                <div>
                    <s-calendarheader
                        locale="{{locale}}"
                        mode="{{mode}}"
                        value="{{value || defaultValue}}"
                        showTimePicker="{{showTimePicker}}"
                        prefixCls="{{prefixCls}}"
                        enableNext="{{enableNext}}"
                        enablePrev="{{enablePrev}}"
                        disabledMonth="{{disabledMonth}}"
                        on-valueChange="handleValueChange"
                        on-panelChange="handlePanelChange"
                    />
                    <div class="{{prefixCls}}-time-picker" s-if="showTimePicker">
                        <div class="{{prefixCls}}-time-picker-panel">
                            <slot name="timepicker" />
                        </div>
                    </div>
                    <div class="{{prefixCls}}-body">
                        <s-datetable
                            locale="{{locale}}"
                            value="{{value || defaultValue}}"
                            hoverValue="{{hoverValue}}"
                            showTimePicker="{{showTimePicker}}"
                            selectedValue="{{selectedValue}}"
                            prefixCls="{{prefixCls}}"
                            disabledDate="{{disabledDate}}"
                            showWeekNumber="{{showWeekNumber}}"
                            hasDateRender="{{hasDateRender}}"
                            on-select="handleDateTableSelect"
                            on-dayHover="handleDayHover"
                        >
                            <slot name="dateRender" slot="dateRender" var-current="{{current}}" />
                        </s-datetable>
                    </div>
                </div>
            </div>
        </div>
    `
});
