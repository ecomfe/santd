import dayjs from 'dayjs';

export interface dayjsType extends dayjs.Dayjs {
    selectedValue?: dayjs.Dayjs;
};

export interface disabledDateType extends dayjs.Dayjs {
    isBetween: (args0: dayjsType, args1: dayjsType, args2?: string, args3?: string) => boolean;
}
export interface Props {
    /**
     * 自定义渲染日期单元格，返回内容会被追加到单元格
     */
    dateCellRender?: HTMLElement;
    /**
     * 自定义渲染日期单元格，返回内容覆盖单元格
     */
    dateFullCellRender?: HTMLElement;
    /**
     * 默认展示的日期
     */
    defaultValue?: dayjsType;
    /**
     * 不可选择的日期
     */
    disabledDate?: disabledDateType;
    /**
     * 是否全屏显示
     */
    fullscreen?: boolean;
    /**
     * 初始模式，month/year
     */
    mode?: string;
    /**
     * 自定义渲染月单元格，返回内容会被追加到单元格
     */
    monthCellRender?: HTMLElement;
    /**
     * 自定义渲染月单元格，返回内容覆盖单元格
     */
    monthFullCellRender?: HTMLElement;
    /**
     * 设置可以显示的日期
     */
    validRange?: [dayjsType, dayjsType];
    /**
     * 当前展示日期
     */
    value: dayjsType;
    /**
     * 自定义头部内容
     */
    headerRender?: HTMLElement;
}

export interface State {
    prefixCls: string | number;
    fullscreen: boolean;
    mode: string;
    yearSelectOffset: number;
    yearSelectTotal: number;
    componentName: string;
}

type monthsItemTpye = {
    label: dayjs.MonthNames;
    value: string;
}

type monthsTpye = Array<monthsItemTpye>;

type yearsItemTpye = {
    label: string;
    value: string;
}

type yearsTpye = Array<yearsItemTpye>

export interface Computed {
    classes: () => string[];

    month: () => string;

    months: () => monthsTpye;

    year: () => string;

    years: () => yearsTpye;
}

export interface selectValueType {
    selectedValue?: string;
}

type targetType = {
    value: string;
}

export interface headerTypeChangeType {
    target: targetType;
    [key: string]: any;
}


export interface localeType {
    today: string;
    now: string;
    backToToday: string;
    ok: string;
    clear: string;
    month: string;
    year: string;
    timeSelect: string;
    dateSelect: string;
    monthSelect: string;
    yearSelect: string;
    decadeSelect: string;
    yearFormat: string;
    dateFormat: string;
    dayFormat: string;
    dateTimeFormat: string;
    monthBeforeYear: boolean;
    previousMonth: string;
    nextMonth: string;
    previousYear: string;
    nextYear: string;
    previousDecade: string;
    nextDecade: string;
    previousCentury: string;
    nextCentury: string;
}

export type disableTimeFunctionType = (args0: dayjs.Dayjs, args1?: dayjs.Dayjs) => boolean;

export interface disabledTimeConfigType {
    disabledHours: () => number[];
    disabledMinutes: (arg0: number) => number[];
    disabledSeconds: (arg0: number, arg1: number) => number[];
}

export type disabledTimeFunctionType = (arg0: dayjsType) => disabledTimeConfigType;
