/**
 * @file Santd Form createDOMForm
 * @author mayihui@baidu.com
 **/

import san from 'san';
import AsyncValidator from 'async-validator';
import get from 'lodash/get';
import set from 'lodash/set';
import eq from 'lodash/eq';
import {
    normalizeValidateRules,
    getValidateTriggers,
    hasRules,
    getParams,
    isEmptyObject,
    flattenArray
} from './utils';
import createFieldsStore, {FieldsStore} from './createFieldsStore';
import Base from 'santd/base';
import {
    DecoratorOptions,
    FieldMeta,
    Field,
    NewField,
    FormCreateOptions,
    Mixins,
    ValidateFieldsOptions,
    ValidateFieldsCallback,
    FormItemChange,
    ValidateFieldsCb,
    RequiredPartKey,
    FieldActionFun
} from '../interface';
import FormItem from '../FormItem';

const noop = function () {return {}};

export interface PrivateState {
    submiting: boolean;
}

export interface PrivateProps<DataT extends {} = {}> {
    form: san.DefinedTemplateComponentClass<DataT>;
}

export interface Methods<TThis = any> {
    getRules(fieldMeta: FieldMeta, action?: string): RuleItem[];
    setFields(maybeNestedFields: Record<string, any>, _callback?: () => void): void;
    setFieldsValue(changedValues: Record<string, any>, callback: () => void): void;
    validateFieldsInternal(fields: Field[], { fieldNames, action, options }: {
        fieldNames?: string[] | undefined;
        action?: string | undefined;
        options?: ValidateFieldsOptions | undefined;
    }, callback?: ValidateFieldsCallback): void;
    validateFields: Mixins<TThis>['validateFieldsAndScroll'];
    getCacheBind(name: string, action: string, fn: (innerName: string, action: string, ...args: unknown[]) => void): any;
    onCollectCommon(name: string, action: string, args: unknown[]): {
        name: string;
        fieldMeta: FieldMeta;
        field: RequiredPartKey<Field<unknown>, 'touched'>;
    };
    onCollectValidate(name: string, action: string, ...args: unknown[]): void;
    onCollect(innerName: string, action: string, ...args: unknown[]): void;
    getFieldProps(name: string, options: DecoratorOptions): {
        [x: string]: any;
    } | undefined;
    getDecoratorComponent(name: string): Base | undefined;
    resetFields(ns: string[]): void;
    setDecoratorPropValue(decorator: DecoratorOptions, decoratorComponent: FormItem, options: FormCreateOptions): void;
    clearField(name: string): void;
    updated(): void;
    attached(): void;
}

export interface Attributes {
    // FieldStore 方法
    getFieldsValue: FieldsStore['getFieldsValue'];
    getFieldValue: FieldsStore['getFieldValue'];
    setFieldsInitialValue: FieldsStore['setFieldsInitialValue'];
    getFieldsError: FieldsStore['getFieldsError'];
    getFieldError: FieldsStore['getFieldError'];
    isFieldValidating: FieldsStore['isFieldValidating'];
    isFieldsValidating: FieldsStore['isFieldsValidating'];
    isFieldsTouched: FieldsStore['isFieldsTouched'];
    isFieldTouched: FieldsStore['isFieldTouched'];
    getFieldInstance: (name: string) => FormItem;

    // 其他
    items: FormItem[];
    fieldsStore: FieldsStore;
    renderFields: Record<string, any>;
    cachedBind: Record<string, any>;
    validateFieldsAndScroll: Mixins['validateFieldsAndScroll']
}


export type BaseForm<
    DataT extends {} = {},
    OptionsT extends {} = {}
> = san.ComponentDefineOptionsWithThis<DataT & PrivateState & PrivateProps, Methods<BaseForm<DataT, OptionsT>> & Attributes & OptionsT>;

export default function <DataT extends {} = {}, OptionsT extends {} = {}>(options: FormCreateOptions = {}, mixins = {}) {
    const {
        validateMessages,
        onFieldsChange,
        onValuesChange,
        mapPropsToFields,
        fieldMetaProp,
        fieldDataProp
    } = options;
    return function (wrappedComponent: san.ComponentDefineOptionsWithThis<DataT, OptionsT>) {
        return san.defineComponent<
            DataT & PrivateState & PrivateProps,
            Methods<BaseForm<DataT, OptionsT>> & Attributes
        >({
            // 表单实例
            items: [],
            // 表单存储对象
            // @ts-ignore，临时处理，需要初始值，但若初始值不是 FieldStore 类型，下方所有使用 fieldsStore 的代码都会有类型错误
            fieldsStore: {},
            // 渲染的表单
            renderFields: {},
            // 事件缓存
            cachedBind: {},


            initData() {
                let wrappedComponentInitData = (wrappedComponent.initData || noop) as unknown as () => DataT;
                return {
                    ...wrappedComponentInitData.bind(this)(),
                    submiting: false
                };
            },

            ...mixins,

            inited() {
                // 表单实例
                this.items = [];
                // 渲染的表单
                this.renderFields = {};
                // 事件缓存
                this.cachedBind = {};

                // 创建表单存储对象
                let fields = mapPropsToFields && mapPropsToFields(this) || {};
                // 表单存储对象
                this.fieldsStore = createFieldsStore(fields);


                // 附加fieldsStore上的方法给当前的form来用
                // 不用循环，因为无法确定args的具体类型，导致this.fieldsStore[key](...args) 报错)
                // Store_Fun.forEach(key => {
                //     this[key] = (...args: any[]) => this.fieldsStore[key](...args);
                // });
                this['getFieldsValue'] = (...args) => this.fieldsStore['getFieldsValue'](...args);
                this['getFieldValue'] = (...args) => this.fieldsStore['getFieldValue'](...args);
                this['setFieldsInitialValue'] = (...args) => this.fieldsStore['setFieldsInitialValue'](...args);
                this['getFieldsError'] = (...args) => this.fieldsStore['getFieldsError'](...args);
                this['getFieldError'] = (...args) => this.fieldsStore['getFieldError'](...args);
                this['isFieldValidating'] = (...args) => this.fieldsStore['isFieldValidating'](...args);
                this['isFieldsValidating'] = (...args) => this.fieldsStore['isFieldsValidating'](...args);
                this['isFieldsTouched'] = (...args) => this.fieldsStore['isFieldsTouched'](...args);
                this['isFieldTouched'] = (...args) => this.fieldsStore['isFieldTouched'](...args);

                // 这里把form的实例写入供外部调用
                // @ts-ignore，临时处理，因为使用交叉类型的泛型后，无法推导出 form 的类型，会报错
                this.data.set('form', this);

                let wrappedComponentInited = wrappedComponent.inited;
                wrappedComponentInited && wrappedComponentInited.bind(this)();
            },

            getRules(fieldMeta: FieldMeta, action?: string): RuleItem[] {
                const actionRules = (fieldMeta.validate || []).filter(
                    item => !action || (item.trigger && item.trigger.indexOf(action) >= 0)
                ).map(item => item.rules);
                return flattenArray(actionRules);
            },

            setFields(maybeNestedFields: Record<string, unknown>, _callback?: () => void) {
                const fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
                this.fieldsStore.setFields(fields);
                if (onFieldsChange) {
                    const changedFields = Object.keys(fields)
                        .reduce((acc, name) => set(acc, name, this.fieldsStore.getField(name)), {});
                    onFieldsChange(this, changedFields, this.fieldsStore.getNestedAllFields());
                }
                // @ts-ignore，临时处理，因为使用交叉类型的泛型后，无法推导出 form 的类型，会报错
                this.data.set('form', this, {force: true});
            },

            setFieldsValue(changedValues: Record<string, unknown>, callback: () => void) {
                const fieldsMeta = this.fieldsStore.fieldsMeta;
                const values = this.fieldsStore.flattenRegisteredFields(changedValues);
                const newFields = Object.keys(values).reduce((acc: Record<string, unknown>, name) => {
                    const isRegistered = fieldsMeta[name];
                    if (isRegistered) {
                        const value = values[name];
                        acc[name] = {
                            value
                        };
                    }
                    return acc;
                }, {});
                this.setFields(newFields, callback);
                if (onValuesChange) {
                    const allValues = this.fieldsStore.getAllValues();
                    onValuesChange(this, changedValues, allValues);
                }
                Object.keys(newFields).forEach(name => {
                    let decoratorComponent = this.getDecoratorComponent(name);
                    if (decoratorComponent && 'value' in (newFields[name] as Record<string, unknown>)) {
                        decoratorComponent.data.set('value', (newFields[name] as Record<string, unknown>).value || '');
                    }
                });
            },

            validateFieldsInternal(
                fields: Field[],
                {fieldNames, action, options = {}}: {fieldNames?: string[], action?: string, options?: ValidateFieldsOptions},
                callback?: ValidateFieldsCallback
            ) {
                // 所有的校验规则
                const allRules: Record<string, RuleItem[]> = {};
                // 所有值
                const allValues: Record<string, NewField['value']> = {};
                // 校验的表单
                const allFields: Record<string,  NewField> = {};
                // 已经有的错误
                const alreadyErrors: Parameters<ValidateFieldsCallback>[0] = {};
                fields.forEach(field => {
                    const name = field.name;
                    if (options.force !== true && field.dirty === false) {
                        if (field.errors) {
                            set(alreadyErrors, name, {errors: field.errors});
                        }
                        // continue;
                        return;
                    }
                    const fieldMeta = this.fieldsStore.getFieldMeta(name);
                    let newField: NewField = {
                        ...field,
                        errors: undefined,
                        validating: true,
                        dirty: true
                    };
                    allRules[name] = this.getRules(fieldMeta, action);
                    allValues[name] = newField.value;
                    allFields[name] = newField;
                });

                this.setFields(allFields);
                Object.keys(allValues).forEach(f => {
                    allValues[f] = this.fieldsStore.getFieldValue(f);
                });
                if (callback && isEmptyObject(allFields)) {
                    callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.fieldsStore.getFieldsValue(fieldNames));
                    return;
                }
                const validator = new AsyncValidator(allRules);
                if (validateMessages) {
                    validator.messages(validateMessages);
                }

                validator.validate(allValues, options, (errors: ValidateError[]) => {
                    const errorsGroup = {
                        ...alreadyErrors
                    };
                    if (errors && errors.length) {
                        for (let i = 0; i < errors.length; i++) {
                            let e = errors[i];
                            const errorFieldName = e.field;
                            let fieldName = errorFieldName;

                            // Handle using array validation rule.
                            Object.keys(allRules).some(ruleFieldName => {
                                const rules = allRules[ruleFieldName] || [];

                                // Exist if match rule
                                if (ruleFieldName === errorFieldName) {
                                    fieldName = ruleFieldName;
                                    return true;
                                }

                                // Skip if not match array type
                                if (rules.every(({type}) => type !== 'array')
                                    && errorFieldName?.indexOf(ruleFieldName) !== 0) {
                                    return false;
                                }

                                // Exist if match the field name
                                const restPath = errorFieldName?.slice(ruleFieldName.length + 1) || '';
                                if (/\d+/.test(restPath)) {
                                    fieldName = ruleFieldName;
                                    return true;
                                }

                                return false;
                            });

                            const field = get(errorsGroup, fieldName);
                            if (typeof field !== 'object' || Array.isArray(field)) {
                                set(errorsGroup, fieldName, {errors: []});
                            }
                            const fieldErrors = get(errorsGroup, fieldName?.concat('.errors'));
                            fieldErrors.push(e);
                        }
                    }
                    const expired: Array<Record<string, string>> = [];
                    const nowAllFields: Record<string, Field> = {};
                    Object.keys(allRules).forEach(name => {
                        const fieldErrors = get(errorsGroup, name);
                        const nowField = this.fieldsStore.getField(name);
                        // avoid concurrency problems
                        if (!eq(nowField.value, allValues[name])) {
                            expired.push({
                                name
                            });
                        }
                        else {
                            nowField.errors = fieldErrors && fieldErrors.errors;
                            nowField.value = allValues[name];
                            nowField.validating = false;
                            nowField.dirty = false;
                            nowAllFields[name] = nowField;
                        }
                    });
                    this.setFields(nowAllFields);
                    if (callback) {
                        if (expired.length) {
                            expired.forEach(({name}) => {
                                const fieldErrors = [{
                                    message: `${name} need to revalidate`,
                                    field: name
                                }];
                                set(errorsGroup, name, {
                                    expired: true,
                                    errors: fieldErrors
                                });
                            });
                        }

                        callback(isEmptyObject(errorsGroup) ? null : errorsGroup, this.fieldsStore.getFieldsValue(fieldNames));
                    }
                });
            },

            // 表单校验方法
            validateFields(ns, opt, cb) {
                const pending = new Promise((resolve, reject) => {
                    const {names, options = {}, callback} = getParams(ns, opt, cb);
                    let newCallback: ValidateFieldsCb = noop;

                    if (!callback || typeof callback === 'function') {
                        const oldCb = callback;
                        newCallback = (errors, values) => {
                            if (oldCb) {
                                oldCb(errors, values);
                            }
                            else if (errors) {
                                reject({errors, values});
                            }
                            else {
                                resolve(values);
                            }
                        };
                    }

                    const fieldNames = names
                        ? this.fieldsStore.getValidFieldsFullName(names)
                        : this.fieldsStore.getValidFieldsName();

                    const fields = fieldNames
                        .filter(name => {
                            const fieldMeta = this.fieldsStore.getFieldMeta(name);
                            return hasRules(fieldMeta.validate);
                        }).map(name => {
                            const field = this.fieldsStore.getField(name);
                            field.value = this.fieldsStore.getFieldValue(name);
                            return field;
                        });

                    if (!fields.length) {
                        newCallback(null, this.fieldsStore.getFieldsValue(fieldNames));
                        return;
                    }

                    if (!(options && 'firstFields' in options)) {
                        options.firstFields = fieldNames.filter(name => {
                            const fieldMeta = this.fieldsStore.getFieldMeta(name);
                            return !!fieldMeta.validateFirst;
                        });
                    }
                    this.validateFieldsInternal(fields, {
                        fieldNames,
                        options
                    }, newCallback);
                });
                pending.catch(e => e);
                this.data.set('form', this, {force: true});
                return pending;
            },

            // 获取事件缓存
            getCacheBind(name: string, action: string, fn: (innerName: string, action: string, ...args: unknown[]) => void) {
                if (!this.cachedBind[name]) {
                    this.cachedBind[name] = {};
                }
                const cache = this.cachedBind[name];
                if (!cache[action] || cache[action].oriFn !== fn) {
                    cache[action] = {
                        fn: fn.bind(this, name, action),
                        oriFn: fn
                    };
                }
                return cache[action].fn;
            },

            onCollectCommon(
                name: string,
                action: string,
                args: unknown[]
            ): {name: string; fieldMeta: FieldMeta, field: RequiredPartKey<Field<unknown>, 'touched'>} {
                const fieldMeta = this.fieldsStore.getFieldMeta(name);
                if (fieldMeta[action]) {
                    (fieldMeta[action] as FieldActionFun)(...args);
                }
                else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
                    (fieldMeta.originalProps[action] as FieldActionFun)(...args);
                }
                const value = fieldMeta.getValueFromEvent
                    ? fieldMeta.getValueFromEvent((args[2] as {e: unknown}).e)
                    : (args[2] as {value: unknown}).value;
                if (onValuesChange && value !== this.fieldsStore.getFieldValue(name)) {
                    const valuesAll = this.fieldsStore.getAllValues();
                    const valuesAllSet = {};
                    valuesAll[name] = value;
                    Object.keys(valuesAll).forEach(key => set(valuesAllSet, key, valuesAll[key]));
                    onValuesChange(this, set({}, name, value), valuesAllSet);
                }
                const field = this.fieldsStore.getField(name);
                return ({
                    name,
                    field: {...field, value, touched: true},
                    fieldMeta
                });
            },

            onCollectValidate(name: string, action: string, ...args: unknown[]) {
                const {
                    field,
                    fieldMeta
                } = this.onCollectCommon(name, action, args);

                const newField = {
                    ...field,
                    dirty: true
                };

                this.fieldsStore.setFieldsAsDirty();

                this.validateFieldsInternal([newField], {
                    action,
                    options: {
                        firstFields: !!fieldMeta.validateFirst
                    }
                });
            },

            onCollect(innerName: string, action: string, ...args: unknown[]) {
                const {name, field, fieldMeta} = this.onCollectCommon(innerName, action, args);
                const validate = fieldMeta.validate;

                this.fieldsStore.setFieldsAsDirty();

                const newField = {
                    ...field,
                    dirty: hasRules(validate)
                };
                this.setFields({
                    [name]: newField
                });
            },

            getFieldProps(name: string, options: DecoratorOptions) {
                if (!name) {
                    return;
                }

                const fieldOptions: FieldMeta & {name: string, trigger: string; valuePropName: string} = {
                    name,
                    trigger: 'change',
                    valuePropName: 'value',
                    validate: [],
                    ...options
                };

                const {
                    rules,
                    trigger,
                    validateTrigger = trigger,
                    validate
                } = fieldOptions;

                const fieldMeta = this.fieldsStore.getFieldMeta(name);

                if ('initialValue' in fieldOptions) {
                    fieldMeta.initialValue = fieldOptions.initialValue;
                }

                const inputProps = {
                    ...this.fieldsStore.getFieldValuePropValue(fieldOptions)
                };

                const validateRules = normalizeValidateRules(validate, rules, validateTrigger);
                const validateTriggers = getValidateTriggers(validateRules);

                // 添加trigger时的validate事件
                validateTriggers?.forEach(action => {
                    if (inputProps[action]) {
                        return;
                    }
                    inputProps[action] = this.getCacheBind(name, action, this.onCollectValidate);
                });

                // 添加不在triggers里面的其他事件
                if (trigger && validateTriggers.indexOf(trigger) === -1) {
                    inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
                }

                const meta = {
                    ...fieldMeta,
                    ...fieldOptions,
                    validate: validateRules
                };
                this.fieldsStore.setFieldMeta(name, meta);
                if (fieldMetaProp) {
                    inputProps[fieldMetaProp] = meta;
                }

                if (fieldDataProp) {
                    inputProps[fieldDataProp] = this.fieldsStore.getField(name);
                }

                // This field is rendered, record it
                // this.data.set('renderFields.' + name, inputProps);
                this.renderFields[name] = inputProps;
                return inputProps;
            },

            getDecoratorComponent(name: string) {
                let component: Base | undefined;
                this.items.forEach(item => {
                    let decoratorComponents = item.data.get('decoratorComponents') || [];
                    decoratorComponents.forEach(decoratorComponent => {
                        const decoratorName = decoratorComponent.data.get('decorator.name');
                        if (name === decoratorName) {
                            component = decoratorComponent;
                        }
                    });
                });
                return component;
            },

            resetFields(ns: string[]) {
                const newFields = this.fieldsStore.resetFields(ns);
                if (Object.keys(newFields).length > 0) {
                    this.setFields(newFields);
                }
                Object.keys(newFields).forEach(field => {
                    const props = newFields[field];
                    const decoratorComponent = this.getDecoratorComponent(field);
                    if (decoratorComponent) {
                        decoratorComponent.data.set('value', props.value || '');
                    }
                });
            },

            setDecoratorPropValue(decorator: DecoratorOptions, decoratorComponent: FormItem, options: FormCreateOptions) {
                let props = this.getFieldProps(decorator.name as string, decorator);
                let name = options.name;

                if (name) {
                    name += decorator.name ? `-${decorator.name}` : '';
                    decoratorComponent.data.set('id', name);
                }

                const value = this.fieldsStore.getFieldValue(decorator.name as string);
                if (value === undefined) {
                    return;
                }
                decoratorComponent.data.set(props && 'checked' in props ? 'checked' : 'value', value);
            },

            clearField(name: string) {
                this.fieldsStore.clearField(name);
            },

            updated() {
                this.items.forEach(item => {
                    item.data.set('form', {...this});
                });
            },

            attached() {
                let wrappedComponentAttached = wrappedComponent.attached || noop;
                wrappedComponentAttached.bind(this)();
                this.updated();
            },

            messages: {
                santd_form_change(payload) {
                    const value = payload?.value as FormItemChange;
                    const {name, action} = value;
                    if (!name) {
                        return;
                    }
                    let field = this.renderFields[name];
                    if (field && field[action]) {
                        field[action](name, action, value);
                    }
                },
                santd_formitem_add(payload) {
                    const formItem = payload?.value as FormItem;
                    this.items.push(formItem);
                    const decoratorComponents = formItem.data.get('decoratorComponents');
                    // 如果有decoratorComponent，收集信息，加入到fieldStore里面去
                    if (decoratorComponents && decoratorComponents.length) {
                        decoratorComponents.forEach(decoratorComponent => {
                            let decorator = decoratorComponent.data.get('decorator');
                            this.setDecoratorPropValue(decorator, decoratorComponent, options);
                            // @ts-ignore
                            decoratorComponent.watch('decorator', val => {
                                this.setDecoratorPropValue(val, decoratorComponent, options);
                            });
                        });
                    }
                },
                santd_formitem_remove(payload) {
                    const formItem = payload?.value as FormItem;
                    const decoratorComponents = formItem.data.get('decoratorComponents');
                    // 找到对应的decorator信息，从fieldsStore里删除
                    if (decoratorComponents && decoratorComponents.length) {
                        decoratorComponents.forEach(decoratorComponent => {
                            let decorator = decoratorComponent.data.get('decorator');
                            let fieldMeta = this.fieldsStore.getFieldMeta(decorator.name as string);
                            if (!fieldMeta.preserve && decorator.name) {
                                this.clearField(decorator.name);
                            }
                        });
                    }
                },
                ...wrappedComponent.messages
            }
        }, san.defineComponent(wrappedComponent));
    };
}
