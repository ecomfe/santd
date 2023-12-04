// >>>>> Rule
// Modified from https://github.com/yiminghe/async-validator/blob/0d51d60086a127b21db76f44dff28ae18c165c47/src/index.d.ts
type RuleType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'array'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'
    | 'pattern'
    | 'any';

interface ValidateOption {
    // whether to suppress internal warning
    suppressWarning?: boolean;

    // whether to suppress validator error
    suppressValidatorError?: boolean;

    // when the first validation rule generates an error stop processed
    first?: boolean;

    // when the first validation rule of the specified field generates an error stop the field processed, 'true' means all fields.
    firstFields?: boolean | string[];

    messages?: Partial<ValidateMessages>;

    /** The name of rules need to be trigger. Will validate all rules if leave empty */
    keys?: string[];

    error?: (rule: InternalRuleItem, message: string) => ValidateError;
}

type SyncErrorType = Error | string;
type SyncValidateResult = boolean | SyncErrorType | SyncErrorType[];
type ValidateResult = void | Promise<void> | SyncValidateResult;

interface RuleItem {
    type?: RuleType; // default type is 'string'
    required?: boolean;
    pattern?: RegExp | string;
    min?: number; // Range of type 'string' and 'array'
    max?: number; // Range of type 'string' and 'array'
    len?: number; // Length of type 'string' and 'array'
    enum?: Array<string | number | boolean | null | undefined>; // possible values of type 'enum'
    whitespace?: boolean;
    fields?: Record<string, Rule>; // ignore when without required
    options?: ValidateOption;
    defaultField?: Rule; // 'object' or 'array' containing validation rules
    transform?: (value: Value) => Value;
    message?: string | ((a?: string) => string);
    asyncValidator?: (
        rule: InternalRuleItem,
        value: Value,
        callback: (error?: string | Error) => void,
        source: Values,
        options: ValidateOption,
    ) => void | Promise<void>;
    validator?: (
        rule: InternalRuleItem,
        value: Value,
        callback: (error?: string | Error) => void,
        source: Values,
        options: ValidateOption,
    ) => SyncValidateResult | void;
}

type Rule = RuleItem | RuleItem[];

type Rules = Record<string, Rule>;

/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 *  @param type Rule type
 */
type ExecuteRule = (
    rule: InternalRuleItem,
    value: Value,
    source: Values,
    errors: string[],
    options: ValidateOption,
    type?: string,
) => void;

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
type ExecuteValidator = (
    rule: InternalRuleItem,
    value: Value,
    callback: (error?: string[]) => void,
    source: Values,
    options: ValidateOption,
) => void;

// >>>>> Message
type ValidateMessage<T extends any[] = unknown[]> =
    | string
    | ((...args: T) => string);
type FullField = string | undefined;
type EnumString = string | undefined;
type Pattern = string | RegExp | undefined;
type Range = number | undefined;
type Type = string | undefined;

interface ValidateMessages {
    default?: ValidateMessage;
    required?: ValidateMessage<[FullField]>;
    enum?: ValidateMessage<[FullField, EnumString]>;
    whitespace?: ValidateMessage<[FullField]>;
    date?: {
        format?: ValidateMessage;
        parse?: ValidateMessage;
        invalid?: ValidateMessage;
    };
    types?: {
        string?: ValidateMessage<[FullField, Type]>;
        method?: ValidateMessage<[FullField, Type]>;
        array?: ValidateMessage<[FullField, Type]>;
        object?: ValidateMessage<[FullField, Type]>;
        number?: ValidateMessage<[FullField, Type]>;
        date?: ValidateMessage<[FullField, Type]>;
        boolean?: ValidateMessage<[FullField, Type]>;
        integer?: ValidateMessage<[FullField, Type]>;
        float?: ValidateMessage<[FullField, Type]>;
        regexp?: ValidateMessage<[FullField, Type]>;
        email?: ValidateMessage<[FullField, Type]>;
        url?: ValidateMessage<[FullField, Type]>;
        hex?: ValidateMessage<[FullField, Type]>;
    };
    string?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    number?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    array?: {
        len?: ValidateMessage<[FullField, Range]>;
        min?: ValidateMessage<[FullField, Range]>;
        max?: ValidateMessage<[FullField, Range]>;
        range?: ValidateMessage<[FullField, Range, Range]>;
    };
    pattern?: {
        mismatch?: ValidateMessage<[FullField, Value, Pattern]>;
    };
}

interface InternalValidateMessages extends ValidateMessages {
    clone: () => InternalValidateMessages;
}

// >>>>> Values
type Value = any;
type Values = Record<string, Value>;

// >>>>> Validate
interface ValidateError {
    message?: string;
    fieldValue?: Value;
    field?: string;
}

type ValidateFieldsError = Record<string, ValidateError[]>;

type ValidateCallback = (
    errors: ValidateError[] | null,
    fields: ValidateFieldsError | Values,
) => void;

interface RuleValuePackage {
    rule: InternalRuleItem;
    value: Value;
    source: Values;
    field: string;
}

interface InternalRuleItem extends Omit<RuleItem, 'validator'> {
    field?: string;
    fullField?: string;
    fullFields?: string[];
    validator?: RuleItem['validator'] | ExecuteValidator;
}