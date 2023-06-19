import dayjs from 'dayjs';

export interface Props {};

export interface State {

};

export interface Computed {
    getFormat: () => string;
    displayValue: () => string;
    getPopupClassName: () => string;
    defaultFormat: () => string;
    showHour: () => boolean;
    showMinute: () => boolean;
    showSecond: () => boolean;
};

export interface SelectState {
    prefixCls: string,
    // options: Array,
    selectedIndex: number,
    type: string
}
export interface SelectProps {
    
}
export interface SelectComputed {
    
}

export interface HeaderState {
    invalid: boolean,
    inputReadOnly: boolean
}

export interface HeaderProps {
    format: string,
    hourOptions: number[],
    minuteOptions: number[],
    secondOptions: number[],
    disabledHours:  () => number[],
    disabledMinutes: (hour: number) => number[],
    disabledSeconds: (hour: number, minute: number) => number[],
}

export interface ComboboxState {
    invalid: boolean,
    inputReadOnly: boolean
}

export interface ComboboxProps {
    defaultOpenValue: dayjs.Dayjs,
    use12Hours: boolean,
    propValue: dayjs.Dayjs,
    isAM: boolean,
    value: dayjs.Dayjs
}