import InputNumber from "./index";
export interface Props {
    autoFocus?: boolean,
    defaultValue?: number | string,
    disabled?: boolean,
    max?: number | string,
    min?: number | string,
    precision?: number | string,
    size?: string,
    step?: number | string,
    value?: number | string
};

export interface State {
    disabled: boolean,
    size: string,
    step: number | string
    inputDisplayValue: number | string | null
};

export interface Computed {
    outClasses: () => string[]
};

export interface Messages {
    santd_inputnumber_up: (this: InputNumber) => void;
    santd_inputnumber_down: (this: InputNumber) => void;
}

export interface HandlerProps {
    prefixCls: string,
    direction: string,
    disabled: boolean
}

export interface HandlerComputed {
    classes: () => string[]
};

export interface HandlerState {}

export interface HandlerComputed {}
