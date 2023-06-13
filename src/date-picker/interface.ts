import {PlacementMap} from '../tooltip/interface';
import {Props as BaseTrigger} from '../core/trigger/index';
import dayjs from 'dayjs';

type TriggerType = 'click';
export type RangeValue = [dayjs.Dayjs, dayjs.Dayjs] | [];

export interface LocaleType {
    lang: {
        [key: string]: any;
        placeholder: string;
        rangePlaceholder: string;
    };
    timePickerLocale: {
        [key: string]: any;
        placeholder: string;
    };
    dateFormat?: 'DD-MM-YYYY';
    monthFormat?: 'MM-YYYY';
    dateTimeFormat?: 'DD-MM-YYYY HH:mm:ss';
    weekFormat?: 'wo-YYYY';
}

interface TriggerProps {
    transitionName: BaseTrigger['popupTransitionName'];
    dropdownClassName: string;
    getCalendarContainer: () => HTMLElement;
    open: boolean;
    trigger: BaseTrigger['action'];
    placements: PlacementMap;
    popupPlacement: BaseTrigger['popupPlacement'];
}

// 以下类型定义 依赖 Calendar 组件，临时定义如下，待优化
interface CalendarProps {
    placement: PlacementMap;
    popupStyle: string;
    format: string;
    disabledData: (currentData: dayjs.Dayjs) => boolean;
    disabledTime: (currentTime: dayjs.Dayjs) => boolean;
    value: dayjs.Dayjs;
    defaultValue: dayjs.Dayjs;
    // 不确定
    timePicker: any;
    placeholder: string;
    calendarClasses: string;
    inputReadOnly: boolean;
    showToday: boolean;
    // 不确定
    showTime: boolean;
    mode: 'month' | 'year';
    hasExtrafooter: boolean;
    hasDateRender: boolean;
    hasMonthRender: boolean;
    customLocale: LocaleType;
    // 不确定
    customLocaleCode: any;
}

interface RangeCalendarProps extends Omit<CalendarProps, 'timePicker' | 'value' | 'defaultValue' | 'placeholder'> {
    dateInputPlaceholder: string;
    hoverValue: RangeValue;
    showDate: RangeValue;
    ranges: RangeValue;
    value: RangeValue;
    defaultValue: RangeValue;
    placeholder: [string, string];
}

interface InputProps {
    disabled: boolean;
    placeholder: string;
    pickerInputClass: string;
    tabIndex: number;
    name: string;
    inputStyle: string;
}

export interface InnerCompProps extends Partial<TriggerProps>, Partial<Omit<CalendarProps, 'value'>>, Partial<InputProps> {
    allowClear?: boolean;
    hasSuffixIcon: boolean;
    align?: Record<string, any>;
    value?: dayjs.Dayjs | null;
}

export interface InnerCompState extends Required<
    Pick<InnerCompProps, 'allowClear' | 'showToday' | 'popupPlacement' | 'placements'>
> {
    prefixCls: string;
    trigger: TriggerType;
}

export interface InnerCompComputed {
    displayValue: () => string | undefined | null;
    calendarClasses: () => string;
}

export interface ChangeEvent {
    value: dayjs.Dayjs;
    cause: {
        source: 'dateInput' | 'todayButton' | 'keyboard' | 'dateInputSelect'
    }
}

export interface PanelChangeEvent {
    value: dayjs.Dayjs;
    mode: CalendarProps['mode'];
}

export interface RangeSelectEvent {
    selectedValue: [dayjs.Dayjs, dayjs.Dayjs] | [];
    cause?: {
        source: 'dateInput' | 'todayButton' | 'keyboard' | 'dateInputSelect'
    }
}

export interface RangeChangeEvent {
    dates: [dayjs.Dayjs, dayjs.Dayjs | null];
    dateStrings: [string, string];
    info: {
        range: 'end' | 'start'
    }
}

export interface RangePanelChangeEvent {
    value: RangeValue
    mode: CalendarProps['mode'];
}

export interface WeekPickerProps extends InnerCompProps  {
    prefixCls: string;
}

export interface WeekPickerState extends Omit<InnerCompState, 'showToday' | 'prefixCls'> {
    format: string;
}

export interface WeekPickerComputed extends Pick<InnerCompComputed, 'displayValue'> {
}

type RangerPickerInputProps = Omit<InputProps, 'placeholder' | 'tabIndex'>;

export interface RangerPickerProps extends
    Partial<TriggerProps>,
    Partial<RangeCalendarProps> ,
    Partial<RangerPickerInputProps> {}

export interface RangerPickerState extends Omit<InnerCompState, 'prefixCls' | 'format'> {
    separator: string;
    hoverValue: RangeValue;
    disabledTime: CalendarProps['disabledTime'] | (() => void);
}

export interface RangerPickerComputed {
    displayStartValue: () => string | undefined;
    displayEndValue: () => string | undefined;
    calendarClasses: () => string;
}
