import {dayjsType, localeType, disableTimeFunctionType} from '../../interface';
import {MonthNames} from 'dayjs';

export interface CalendarFooterProps {
    prefixCls: string;
    showDateInput: boolean;
    disabledDate: disableTimeFunctionType;
    disabledTime: disableTimeFunctionType;
    selectedValue: dayjsType;
    value: dayjsType;
    mode: string;
    defaultValue: dayjsType;
}

export interface CalendarFooterState {
    
}

export interface CalendarFooterComputed {
    
}

export interface CalendarHeaderProps {
    prefixCls: string;
    showDateInput: boolean;
    disabledDate: disableTimeFunctionType;
    disabledTime: disableTimeFunctionType;
    selectedValue: dayjsType;
    value: dayjsType;
    mode: string;
    defaultValue: dayjsType;
}

export interface CalendarHeaderState {
    enablePrev: number;
    enableNext: number;
}

export interface CalendarHeaderComputed {
    displayYear: () => string;
    displayMonth: () => string | MonthNames;
    displayDay: () => string;
}

export interface OkButtonState {
    
}

export interface OkButtonProps {
    prefixCls: string;
    disabled: boolean;
    locale: localeType;
}

export interface OkButtonComputed {
    
}

export interface TimepickerButtonState {
    
}

export interface TimepickerButtonProps {
    prefixCls: string;
    showTimePicker: boolean;
    locale: localeType;
    disabled: boolean;
}

export interface TimepickerButtonComputed {
    
}

export interface TodayButtonState {
    
}

export interface TodayButtonProps {
    prefixCls: string;
    value: dayjsType;
    locale: localeType;
    disabledDate: disableTimeFunctionType;
    text: string;
}

export interface TodayButtonComputed {
    disabledToday: () => boolean;
    localeNow: () => string;
}
