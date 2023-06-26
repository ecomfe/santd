import {dayjsType, disableTimeFunctionType} from '../../interface';
import dayjs from 'dayjs';

export interface MonthPanelState {

}

export interface MonthPanelProps {
    disabledDate: disableTimeFunctionType;
    prefixCls: string;
    value: dayjsType;
    defaultValue: dayjsType;
}

export interface MonthPanelComputed {
    year: () => number;
}
export interface MonthTableState {

}

export interface MonthTableProps {
    disabledDate: disableTimeFunctionType;
    value: dayjsType;
    defaultValue: dayjsType;
}

export interface MonthTableComputed {
    months: () => MonthTableItemType[][];
}

export interface MonthTableItemType {
    value: number;

    content: dayjs.MonthNames;
    title: dayjs.MonthNames;
    current: dayjsType;
}