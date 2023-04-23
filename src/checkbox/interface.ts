import Base from 'santd/base';

export interface GroupOption {
    label: string;
    value: string;
    disabled?: boolean;
    checked?: boolean;
}
export type ValueType = string | number | boolean;

export type OptionItem = GroupOption | string | number;

export interface GroupProps {
    value?: Array<ValueType>;
    defaultValue?: Array<ValueType>;
    disabled?: boolean;
    options?: Array<OptionItem>;
    name?: string;
}

export interface GroupState extends Required<Pick<GroupProps, 'disabled' | 'options'>> {
}

export interface GroupComputed {
    checkboxs: () => GroupOption[];
}

export interface CheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    value?: ValueType;
}

export interface CheckboxState {
    type: 'checkbox';
    defaultChecked: boolean;
    indeterminate: boolean;
}

export interface CheckboxComputed {
    classes: () => string[];
    inputWrapClasses: () => string[];
}

export interface CheckboxChangeEvent {
    target: CheckboxProps & {checked: boolean;};
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}

export type Checkbox = Base<CheckboxState, CheckboxProps, CheckboxComputed>;