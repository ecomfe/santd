import san from "san/types";
import Base from "santd/base";

type InputType = 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export interface BaseInputState {
    type: InputType;
}

export interface BaseInputProps {
    value?: HTMLInputElement['value'];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    focused?: boolean;
    tabIndex?: number;
    type?: InputType;
    size?: Exclude<SizeType, 'middle'>;
    maxLength?: number;
    autocomplete?: boolean;
    triggerFocus?: () => void;
    id?: string;
}

// Input
export interface InputProps extends BaseInputProps {
    addonAfter?: string | san.SlotNode;
    addonBefore?: string | san.SlotNode;
    allowClear?: boolean;
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    maxLength?: number;
    prefix?: string | san.SlotNode;
    suffix?: string | san.SlotNode;
}

// InputSearch
export interface InputSearchProps extends BaseInputProps {
    loading?: boolean;
    enterButton?: string | boolean;
}

export interface InputSearchComputed {
    classes(): string[];
    btnType(): 'loading' | 'search';
}

// InputPassword
export interface InputPasswordState extends BaseInputState {
    visibilityToggle: boolean;
}

export interface InputPasswordProps extends BaseInputProps {
}

// Group
export interface GroupInputState {
    size: Exclude<SizeType, 'middle'>;
}

export interface GroupInputProps {
    compact?: boolean;
    size?: Exclude<SizeType, 'middle'>;
}

// TextArea
export interface TextareaProps {
    value?: HTMLTextAreaElement['value'];
    autofocus?: HTMLTextAreaElement['autofocus'];
    cols?: HTMLTextAreaElement['cols'];
    rows?: HTMLTextAreaElement['rows'];
    autosize?: boolean | {minRows: number; maxRows: number;};
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    styles?: {
        [key: string]: string | number | undefined;
    };
    maxLength?: number;
    name?: string;
}

export type InputComp<State = {}, Props = {}, Computed = {}> = Base<BaseInputState & State, BaseInputProps & Props, Computed>;