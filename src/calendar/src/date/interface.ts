import {dayjsType, localeType, disableTimeFunctionType} from '../../interface';

export interface DateInputState {
    showDate: dayjsType | string;
    invalid: boolean;
    hasFocus: boolean;
}

export interface DateInputComputed {
    
}

export interface DateInputProps {
    prefixCls: string;
    value: dayjsType;
    disabledTime: disableTimeFunctionType;
    format: string;
    locale: localeType;
    disabledDate: disableTimeFunctionType;
    placeholder: string;
    selectedValue: dayjsType;
    inputMode: string;
    inputReadOnly: boolean;
}

export interface inputChangeType {
    target: {
        value: dayjsType;
    }
}

export interface DateTableState {

}

export interface DateTableProps {
    disabledDate: disableTimeFunctionType;
    rootPrefixCls: string;
    value: dayjsType;
    defaultValue: dayjsType;
}

export interface DateTableComputed {
    
}
export interface dataTableItemDataType {
    data: dayjsType;
    className?: string;
    selected?: boolean;
    disabled?: boolean;
}
export interface dataTableItemType {
    current: dataTableItemDataType[];
    isCurrentWeek: boolean;
    isActiveWeek: boolean;
    week?: number;
}
