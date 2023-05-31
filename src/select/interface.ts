import Base from 'santd/base';
import {PlacementMap} from '../tooltip/interface';

export interface BaseOptionType {
    disabled?: boolean;
    [name: string]: any;
}

export interface ModeConfig {
    multiple: boolean;
    tags: boolean;
    combobox: boolean;
    single: boolean;
}

export type Mode = 'default' | 'multiple' | 'tags' | 'combobox' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
export type RawValueType = string | number;
export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type DisplayInfoType = 'add' | 'remove' | 'clear';
export type DefaultValueType = RawValueType | RawValueType[];

export interface DefaultOptionType extends BaseOptionType {
    label: string;
    value?: RawValueType | null;
    children?: Array<Omit<DefaultOptionType, 'children'>>;
}

export interface DisplayValueType {
    key?: string;
    value?: RawValueType;
    label?: string;
    title?: string | number;
    disabled?: boolean;
}

export interface TOptionsInfo {
    [key: RawValueType]: any;
};

export type TOption = Base<OptionState, OptionProps>;
export type TOptGroup = Base<OptGroupState, OptGroupProps>;
export type TOptions = TOption[];
export type TOptionGroups = {
    group: TOptGroup;
    options: TOptions;
}[];

type FilterFun<OptionType> = (inputValue: string, option?: OptionType) => boolean;


// Option
export interface OptionProps {
    disabled?: boolean;
    label?: string;
    title?: string;
    value?: RawValueType;
}

export interface OptionState {
    disabled: boolean;
}

// OptGroup
export interface OptGroupProps {
    label: string;
}

export interface OptGroupState {
    options: BaseOptionType[];
}

// Input
interface InputData {
    context: BaseContext;
    inputValue: string;
}

export interface InputProps extends Partial<InputData> {
}

export interface InputState extends InputData {
}

// SingleSelector
export interface SingleSelectorProps {
    context?: BaseContext;
    inputValue?: string;
}

export interface SingleSelectorState extends Required<SingleSelectorProps> {
}

export interface SingleSelectorComputed {
    optionInfo: () => {
        title?: string;
        label?: string
    };
    style: () => {
        display: 'block' | 'none';
        opacity: number;
    }
}

// MultipleSelector
export type TSelectItem = {
    klass: string[];
    content: string;
    title: string;
    value: RawValueType;
    disabled: boolean;
}

export type TDeSelectEventItem = RawValueType | {
    key: RawValueType;
    label: RawValueType;
}

export interface MultipleSelectorProps {
    context: BaseContext;
}

export interface MultipleSelectorState extends Required<MultipleSelectorProps> {
}

export interface MultipleSelectorComputed {
    selectedItems: () => TSelectItem[];
}


// Selector
export interface SelectorProps {
    inputValue?: string;
    context?: BaseContext;
}

export interface SelectorState extends Required<SelectorProps> {
}

export interface SelectorComputed {
    hidePlaceholder: () => boolean;
}

// DropdownMenu
export type TMenuItem = {
    content: RawValueType;
    disabled?: boolean;
    empty?: boolean;
    value?: RawValueType;
    title?: string;
};

export interface DropdownMenuProps {
    context?: BaseContext;
    inputValue?: string;
}

export interface DropdownMenuState {
    activeKey: string;
    context: BaseContext;
    inputValue: string;
}

export interface DropdownComputed {
    menuGroups: () => {
        title: string;
        menuItems: TMenuItem[];
    }[] | undefined;
    menuItems: () => TMenuItem[] | undefined;
    multiple: () => boolean | undefined;
    selectedKeys: () => Array<RawValueType>;
}

// Select
type TimerType = number | null;
type SelectSize = Exclude<SizeType, 'middle'>;

interface SelectPrivateProps {
    _focused: boolean;
    _mouseDown: boolean;

    focusTimer: TimerType;
    comboboxTimer: TimerType;
    blurTimer: TimerType;
    inputElement: HTMLInputElement;
    modeConfig: ModeConfig;
    backfillValue: string;
    inputValue: string;
    ariaId: string;
    options?: TOptions;
    optionGroups: TOptionGroups;
    optionsInfo: TOptionsInfo;
    open: boolean;
    value: DefaultValueType;
}

interface BaseSelectProps {
    autoFocus?: boolean;
    backfill?: boolean;
    size?: SelectSize;

    // icon
    allowClear?: boolean;

    // option
    defaultActiveFirstOption?: boolean;
    labelInValue?: boolean;
    optionFilterProp?: string;

    // status
    disabled?: boolean;
    loading?: boolean;

    // dropdown
    dropdownMatchSelectWidth?: boolean | number;
    getPopupContainer?: (() => HTMLElement) | HTMLElement;

    // search
    autoClearSearchValue?: boolean;
    showSearch?: boolean;
    tokenSeparators?: string[];
}

export interface SelectProps extends BaseSelectProps, Omit<SelectPrivateProps, 'options' | 'open' | 'value'>{
    // dropdown
    dropdownStyle?: {
        [key: string]: string;
    };
    dropdownClassName?: string;
    dropdownRender?: (menu: san.ANode) => san.ANode;
    dropdownMenuStyle?: {
        [key: string]: string;
    };

    // >>> Selector
    maxTagTextLength?: number;
    maxTagCount?: number;
    maxTagPlaceholder?: string | ((omittedValues: RawValueType[]) => string);

    // >>> Open
    open?: boolean;
    defaultOpen?: boolean;

    // >>> Icons
    showArrow?: boolean;

    // >>> Mode
    mode?: Mode;

    notFoundContent?: string;
    placeholder?: string;

    options?: DefaultOptionType[];
    filterOption?: boolean | FilterFun<DefaultOptionType>;
    optionLabelProp?: string;

    value?: DefaultValueType ;
    defaultValue?: DefaultValueType ;
    firstActiveValue?: DefaultValueType;
}

export interface SelectComputed {
    modeConfig: () => ModeConfig;
    wrapClass: () => Array<string | false | undefined>;
    selectionClass: () => string[];
    selectionAttrs: () => {
        [x: number]: number;
        role: string;
        'aria-autocomplete': string;
        'aria-haspopup': boolean;
        'aria-controls': any;
        'aria-expanded': boolean;
    };
    renderClear: () => boolean;
    renderArrow: () => boolean;
    hideAction: () => string[];
    popupClassName: () => string;
    popupStyle: () => Record<string, string>;
    realOpen: () => boolean | undefined;
}

export type SelInstanceProps = SelectState & SelectProps & SelectPrivateProps &  {
    [key: string]: any;
};

export type BaseContext = Partial<SelInstanceProps>;

export interface SelectState extends Required<BaseSelectProps> {
    builtinPlacements: PlacementMap;
    context: BaseContext;
    dropdownPrefixCls: string;
    dropdownWidth: number;
    options: TOptions;
    optionGroups: TOptionGroups;
    optionsInfo: TOptionsInfo;
    showAction: string[];
}







