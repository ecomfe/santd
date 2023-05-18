export type Screens = {
    [key in TScreen]?: string;
}
export interface State {
    bordered: boolean,
    title?: string,
    size: string,
    layout: string,
    column: object,
    screens: Screens,
}
export type Func = (screens: Screens) => {};

type TScreen = keyof typeof responsiveMap;

export const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
} as const;


export type JSONValue = string | number | boolean | null | JSONValue[] | {[key: string]: JSONValue};
export interface SourceSlots {
    named: {
        [key: string]: JSONValue
    };
    noname: Record<string, JSONValue>[];
};
export type Record<K extends keyof any, T> = {
    [P in K]: T;
};

export type NoName = Record<string, JSONValue>[];