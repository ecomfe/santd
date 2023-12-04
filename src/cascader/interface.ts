export interface FieldNames {
    label?: string;
    value?: string;
    children?: string;
}

interface BaseOptionType {
    [name: string]: any;
    disabled?: boolean;
}

interface FilteredOption {
    [name: string]: any;
    __IS_FILTERED_OPTION?: boolean;
    path?: DefaultOptionType[];
    disabled: boolean;
}

export interface DefaultOptionType extends BaseOptionType {
    label: string | number;
    value?: string | number;
    children?: DefaultOptionType[];
}

export type SingleValueType = Array<string | number>;

export type ValueType = SingleValueType | SingleValueType[];

export type ExpandTrigger = 'hover' | 'click';

type PlacementType = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export interface ShowSearchType<OptionType extends BaseOptionType = DefaultOptionType> {
    filter?: (inputValue: string, options: OptionType[], fieldNames: FieldNames) => boolean;
    render?: (
        inputValue: string,
        path: OptionType[],
        fieldNames?: FieldNames
    ) => string[];
    sort?: (a: OptionType[], b: OptionType[], inputValue: string, fieldNames?: FieldNames) => number;
    matchInputWidth?: boolean;
    limit?: number | false;
}

interface BaseCascaderProps<OptionType extends BaseOptionType = DefaultOptionType> {
    fieldNames?: FieldNames;

    value?: ValueType;
    defaultValue?: ValueType;
    displayRender?: (label: string, selectedOptions?: OptionType[]) => san.Component;
    allowClear?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    changeOnSelect?: boolean;

    // Trigger
    expandTrigger?: ExpandTrigger;

    // Search
    showSearch?: boolean | ShowSearchType<OptionType>;

    // Options
    options?: OptionType[];
    loadData?: (selectOptions: OptionType[]) => void;

    notFoundContent?: string;
    placeholder?: string;

    // Open
    popupVisible?: boolean;

    popupClassName?: string;
    popupStyle?: {
        [key: string]: string;
    };
    popupPlacement?: PlacementType;

    size?: Exclude<SizeType, 'middle'>;
    suffixIcon?: string;

    getPopupContainer?: (() => HTMLElement) | HTMLElement;
}

type OnSingleChange<OptionType> = (value: SingleValueType, selectOptions: OptionType[]) => void;

export interface SingleCascaderProps<OptionType extends BaseOptionType = DefaultOptionType>
    extends BaseCascaderProps<OptionType> {

    onChange?: OnSingleChange<OptionType>;
    inputValue?: string;
}

export interface SingleCascaderState<OptionType extends BaseOptionType = DefaultOptionType> {
    prefixCls: string;
    allowClear: boolean;
    disabled: boolean;
    size: Exclude<SizeType, 'middle'>;
    options: OptionType[];
    popupPlacement: PlacementType;
    transitionName: string;
    dropdownMenuColumnStyle: Record<string, any>;
    inputFocused?: boolean;
}

export interface Computed {
    pickerClass: () => string[];
    filteredOptions: () => FilteredOption[];
    selectedOptions: () => DefaultOptionType[];
    label: () => string[];
}

export interface InputClickEvent {
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent & {
        stopImmediatePropagation?: () => void;
    };
}



