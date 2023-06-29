import {ColProps} from 'santd/grid/interface';
import Base from 'santd/base';


export type RequiredPartKey<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

// ================== ValidateFields ==============
export interface ValidateFieldsOptions {
    /**
     * 若为 true，则每一表单域的都会在碰到第一个失败了的校验规则后停止校验
     */
    first?: boolean;
    /**
     * 指定表单域会在碰到第一个失败了的校验规则后停止校验
     */
    firstFields?: string[] | boolean;
    /**
     * 对已经校验过的表单域，在 validateTrigger 再次被触发时是否再次校验
     */
    force?: boolean;

    source?: HTMLElement;
    container?: HTMLElement;
    /**
     * 定义 validateFieldsAndScroll 的滚动行为，详细配置见 (dom-scroll-into-view config)
     * https://github.com/yiminghe/dom-scroll-into-view#function-parameter
     */
    scroll?: {
        alignWithLeft?: boolean;
        alignWithTop?: boolean;
        offsetTop?: number;
        offsetLeft?: number;
        offsetBottom?: number;
        offsetRight?: number;
        allowHorizontalScroll?: boolean;
        onlyScrollIfNeeded?: boolean;
    }
}

export interface ValidateFieldsErrors {
    [k: string]: {
        errors: ValidateError[];
    }
}

export type ValidateFieldsValue = Record<string, unknown>;

export type ValidateFieldsCallback = (
    errors?: ValidateFieldsErrors | null,
    values?: ValidateFieldsValue
) => void;

export type ValidateFields<T> = (
    this: T,
    ns?: string[] | ValidateFieldsOptions | ValidateFieldsCallback,
    opt?: ValidateFieldsOptions | ValidateFieldsCallback,
    cb?: ValidateFieldsCallback
) => void;

export type ValidateFieldsCb = (error?: ValidateFieldsErrors | null, values?: ValidateFieldsValue) => void;

export interface ValidateRule {
    rules?: RuleItem[];
    trigger?: string | string[];
}

// ================== Mixins ==============

export interface Mixins<T = Base> {
    validateFieldsAndScroll: ValidateFields<T>;
}

// ================== Decorator ==============
export interface DecoratorOptions {
    /**
     * 必填输入控件唯一标志。支持嵌套式的写法
     */
    name?: string;
    /**
     * 可以把 change 的参数（如 event）转化为控件的值
     */
    getValueFromEvent?: (...args: unknown[]) => unknown;
    /**
     * 子节点的初始值，类型、可选值均由子节点决定
     */
    initialValue?: unknown;
    /**
     * 转换默认的 value 给控件
     */
    normalize?: (value: unknown, prevValue: unknown, allValues: Record<string, unknown>) => unknown;
    /**
     * 即便字段不再使用，也保留该字段的值
     */
    preserve?: boolean;
    /**
     * 校验规则，参考 https://github.com/yiminghe/async-validator
     */
    rules?: RuleItem[];
    /**
     * 收集子节点的值的时机，默认 change
     */
    trigger?: string;
    /**
     * 当某一规则校验不通过时，是否停止剩下的规则的校验
     */
    validateFirst?: boolean;
    /**
     * 校验子节点值的时机
     */
    validateTrigger?: string | string[];
    /**
     * 子节点的值的属性，如 Switch 的是 'checked'
     */
    valuePropName?: string;
}

// =========== Fields ========

export interface Field<TValue = any> {
    name: string;
    value: TValue;
    errors: ValidateError[];
    dirty?: boolean;
    validating?: boolean;
    touched?: boolean;
}

export interface NewField extends RequiredPartKey<Omit<Field, 'errors'>, 'dirty' | 'validating'>  {
    errors: undefined;
}

export interface FieldMeta extends DecoratorOptions {
    [key: string]: unknown;
    validate: ValidateRule[],
    hidden?: boolean;
    originalProps?: {
        [key: string]: unknown;
    };
    getValueProps?: (fieldValue: string) => Record<string, unknown>;
}

export type FieldActionFun = (...args: unknown[]) => void;

// ================= Some Common Types =====================
type TLayout = 'horizontal' | 'vertical' | 'inline';
type TLabelAlign = 'left' | 'right';
type TValidateStatus = 'success' | 'warning' | 'error' | 'validating' | '';
export type TIcon = 'check-circle' | 'exclamation-circle' | 'close-circle' | 'loading' | '';

// =============== Form =============
export interface FormProps {
    /**
     * 配合 label 属性使用，表示是否显示 label 后面的冒号
     */
    colon?: boolean;
    /**
     * 表单布局
     */
    layout?: TLayout;
    /**
     * 隐藏所有表单项的必选标记
     */
    hideRequiredMark?: boolean;
    /**
     * label 标签的文本对齐方式
     */
    labelAlign?: TLabelAlign;
    /**
     * label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
     */
    labelCol?: ColProps;
    /**
     * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
     */
    wrapperCol?: ColProps;
}

export interface FormState extends Required<Pick<FormProps, 'colon' | 'layout' | 'labelAlign' | 'hideRequiredMark'>> {
}

export interface FormComputed {
    classes: () => string[];
}

interface InternalFormCreateOptions {
    fieldMetaProp?: string;
    fieldDataProp?: string;
    fieldNameProps?: string;
}

export interface FormCreateOptions extends InternalFormCreateOptions {
    /**
     * 设置表单域内字段 id 的前缀
     */
    name?: string;
    // 待确认
    /**
     * 默认校验信息，可用于把默认错误信息改为中文等，格式与 newMessages 返回值一致
     */
    validateMessages?: () => ValidateMessages;
    /**
     * 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 san-store
     */
    onFieldsChange?: (
        form: unknown,
        // todo
        changedFields: Record<string, unknown>,
        // todo
        allFields: Record<string, unknown>
    ) => void;
    /**
     * 任一表单域的值发生改变时的回调
     */
    onValuesChange?: (
        form: unknown,
        // todo
        changedValues: Record<string, unknown>,
        // todo
        allValues: Record<string, unknown>,
    ) => void;

    // todo
    mapPropsToFields?: (form: any) => Record<string , unknown>;
}

// ============== FormItem =================
interface InternalItemProps<TComponent> {
    id: string;
    name: string;
    decorator: DecoratorOptions;
    htmlFor: string;
    prop: string;
    decoratorComponents: TComponent[];
}

export interface FormItemProps<TFormItem> extends InternalItemProps<TFormItem>, Omit<FormProps, 'hideRequiredMark'> {
    /**
     * label 标签的文本
     */
    label?: string;
    /**
     * 提示信息，如不设置，则会根据校验规则自动生成
     */
    help?: string;
    /**
     * 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个
     */
    extra?: string;
    /**
     * 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
     */
    validateStatus?: TValidateStatus;
    /**
     * 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
     */
    hasFeedback?: boolean;
    /**
     * 是否必填，如不设置，则会根据校验规则自动生成
     */
    required?: boolean;
}

export interface FormItemState extends Required<Pick<FormProps, 'labelCol' | 'wrapperCol'>>{
    showMessage: boolean;
    fieldData: '';
    validateState: boolean;
}

export interface FormItemComputed {
    isRequired: () => boolean;
    labelClassName: () => string[];
    getValidateStatus: () => TValidateStatus;
    getHelpMessage: () => string | string[];
    iconType: () => TIcon;
    validateWrapperClassName: () => string | string[];
}

// ======== Event Payload =============
export interface FormItemChange {
    name: string;
    value: unknown;
    action: string;
    e: unknown
}
