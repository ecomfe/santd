import Base from 'santd/base';

type SizeType = 'large' | 'small' | 'default';
type RadioGroupButtonStyle = 'outline' | 'solid';
export type RadioValueType = string | number | boolean;

export interface RadioOptionType {
    label: string;
    value: RadioValueType;
    disabled?: boolean;
}

export type OptionsItem = RadioOptionType | string | number;

export interface GroupRadioOption extends RadioOptionType {
    disabled?: boolean;
    checked?: boolean;
}

export interface GroupProps {
    defaultValue?: RadioValueType;
    value?: RadioValueType;
    size?: SizeType;
    disabled?: boolean;
    name?: string;
    buttonStyle?: RadioGroupButtonStyle;
    options?: Array<OptionsItem>;
}

export interface GroupState extends Required<Pick<GroupProps, 'disabled' | 'options' | 'buttonStyle'>> {
}

export interface GroupComputed {
    radios: () => Array<GroupRadioOption>;
}

export interface RadioProps {
    value?: RadioValueType;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
}

export interface RadioState {
    prefixCls: string;
    type: 'radio';
    defaultChecked: boolean;
}

export interface RadioComputed {
    classes: () => string[];
    inputWrapClasses: () => string[];
}

export interface RadioChangeEvent {
    target: RadioProps & {checked: boolean;};
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}

export interface RadioButtonState extends RadioState {
}

export type Radio = Base<RadioState, RadioProps, RadioComputed>;
