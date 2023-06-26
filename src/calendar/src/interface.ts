import {dayjsType, localeType, disabledTimeFunctionType, disabledTimeConfigType} from '../interface';
import dayjs from 'dayjs';

export interface CalendarBaseState {
    visible: boolean;
    prefixCls: string;
    locale: localeType;
    timeFormat: string;
}

export interface CalendarBaseProps {
    customClassName: string;
    visible: boolean;
    prefixCls: string;
}

export interface CalendarBaseComputed {
    classes: () => string[];
    showHour: () => boolean;
    showMinute: () => boolean;
    showSecond: () => boolean;
    columns: () => number;
}

export interface CalendarComponentState {
    visible: boolean;
    prefixCls: string;
    showToday: boolean;
    showDateInput: boolean;
    focusablePanel: boolean;
}

export interface CalendarComponentProps {
    
}

export interface CalendarComponentComputed {
    
}

export interface FullCalendarState {
    defaultType: string;
    fullscreen: boolean;
    showTypeSwitch: boolean;
    showHeader: boolean;
}

export interface FullCalendarProps {
    
}

export interface FullCalendarComputed {
    
}

export interface FullCalendarHeaderState {
    yearSelectOffset: number;
    yearSelectTotal: number;
}

export interface FullCalendarHeaderProps {
    value: dayjsType;
    locale: localeType;
    yearSelectOffset: number;
    yearSelectTotal: number;
    prefixCls: string;
    type: string;
    showTypeSwitch: boolean;
}

export interface FullCalendarHeaderComputed {
    month: () => string;
    year: () => string;
    months: () => {
        label: dayjs.MonthNames;
        value: string;
    }[];
    years: () => {
        label: number;
        value: string;
    }[];
}

export interface MonthCalendarState {
    mode: string;
}

export interface MonthCalendarProps {
    
}

export interface MonthCalendarComputed {
    
}

export type selectedValueType = dayjsType[];

export interface RangeCalendarState {
    prefixCls: string;
    type: string;
    seperator: string;
    defaultSelectedValue: selectedValueType;
    showToday: boolean;
    showDateInput: boolean;
    panelTriggerSource: string;
    hoverValue: selectedValueType;
    selectedValue: selectedValueType;
    disabledTime: () => void | disabledTimeFunctionType;
    mode: string[];
    showTime?: dayjsType;
    prevSelectedValue?: selectedValueType;
}

export interface RangeCalendarProps {
    
}

export interface RangeCalendarComputed {
    classes: () => string[];
    hasSelectedValue: () => boolean;
    isAllowedDateAndTime: () => boolean;
    isClosestMonths: () => boolean;
    disabledStartTime: () => (time: dayjsType) => disabledTimeConfigType;
    disabledEndTime: () => (time: dayjsType) => disabledTimeConfigType;
    disabledStartMonth: () => (month: dayjsType) => boolean
    disabledEndMonth: () => (month: dayjsType) => boolean
    getStartValue: () => dayjsType;
    getEndValue: () => dayjsType;
    isTodayInView: () => boolean | undefined;
    rangesName: () => string[];
}
