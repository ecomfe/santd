/**
 * @file Santd calendar range panel file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import CalendarHeader from '../calendar/CalendarHeader';
import DateTable from '../date/DateTable';
import DateInput from '../date/DateInput';
import {getTimeConfig} from '../util/index';
import dayjs from 'dayjs';
import {dayjsType, disabledTimeFunctionType} from '../../interface';

export default class RangePanel extends Base<I.RangePanelState, I.RangePanelProps, I.RangePanelComputed> {
    static components = {
        's-calendarheader': CalendarHeader,
        's-datetable': DateTable,
        's-dateinput': DateInput
    };
    initData(): I.RangePanelState {
        return {
            visible: true,
            prefixCls: 'santd-calendar',
            showToday: true,
            showDateInput: true,
            focusablePanel: true
        };
    };
    inited(): void {
        const mode = this.data.get('mode');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const selectedValue = this.data.get('selectedValue');
        const defaultSelectedValue = this.data.get('defaultSelectedValue');

        this.data.set('mode', mode || 'date');
        this.data.set('value', value || defaultValue || dayjs());
        this.data.set('selectedValue', selectedValue || defaultSelectedValue);
    };
    handleDateTableSelect(value: dayjsType): void {
        this.fire('select', value);
    };
    handleDateInputChange(value: dayjsType): void {
        this.fire('inputChange', value);
    };
    handlePanelChange({value, mode} : {value: dayjsType, mode: string}): void {
        this.fire('panelChange', {value, mode});
    };
    handleValueChange(value: dayjsType): void {
        this.fire('valueChange', value);
    };
    handleDayHover(value: dayjsType): void {
        this.fire('dayHover', value);
    };
    handleInputChange(value: dayjsType): void {
        this.fire('inputChange', value);
    };
    handleDateInputClear(): void {
        this.fire('clear');
    };
    dateInputValue(selectedValue: dayjsType[] = []): dayjsType {
        const direction = this.data.get('direction');
        const value = selectedValue[direction === 'left' ? 0 : 1];
        return value;
    };
    getTimeConfig(selectedValue: dayjsType, disabledTime: disabledTimeFunctionType, mode: string) {
        const showTimePicker = this.data.get('showTimePicker');
        if (showTimePicker && disabledTime) {
            const config = getTimeConfig(selectedValue, disabledTime);
            return (config as any)[mode];
        }
    };
    static template = /* html */ `
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
                    inputReadOnly="{{inputReadOnly}}"
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
};
