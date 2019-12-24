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
import createFieldsStore from './createFieldsStore';

const noop = function () {};

export default function (options = {}, mixins = {}) {
    const {
        validateMessages,
        onFieldsChange,
        onValuesChange,
        mapPropsToFields,
        fieldMetaProp,
        fieldDataProp
    } = options;
    return function (wrappedComponent) {
        return san.defineComponent({
            initData() {
                let wrappedComponentInitData = wrappedComponent.initData || noop;
                return {
                    ...wrappedComponentInitData.bind(this)(),
                    submiting: false
                };
            },

            ...mixins,

            inited() {
                // 表单实例
                this.items = [];
                // 表单存储对象
                this.fieldsStore = {};
                // 渲染的表单
                this.renderFields = {};
                // 事件缓存
                this.cachedBind = {};

                // 创建表单存储对象
                let fields = mapPropsToFields && mapPropsToFields(this) || {};
                this.fieldsStore = createFieldsStore(fields);


                // 附加fieldsStore上的方法给当前的form来用
                [
                    'getFieldsValue',
                    'getFieldValue',
                    'setFieldsInitialValue',
                    'getFieldsError',
                    'getFieldError',
                    'isFieldValidating',
                    'isFieldsValidating',
                    'isFieldsTouched',
                    'isFieldTouched'
                ].forEach(key => {
                    this[key] = (...args) => this.fieldsStore[key](...args);
                });

                // 这里把form的实例写入供外部调用
                this.data.set('form', this);

                let wrappedComponentInited = wrappedComponent.inited;
                wrappedComponentInited && wrappedComponentInited.bind(this)();
            },

            getRules(fieldMeta, action) {
                const actionRules = fieldMeta.validate.filter(
                    item => !action || item.trigger.indexOf(action) >= 0
                ).map(item => item.rules);
                return flattenArray(actionRules);
            },

            setFields(maybeNestedFields, callback) {
                const fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
                this.fieldsStore.setFields(fields);
                if (onFieldsChange) {
                    const changedFields = Object.keys(fields)
                        .reduce((acc, name) => set(acc, name, this.fieldsStore.getField(name)), {});
                    onFieldsChange(this, changedFields, this.fieldsStore.getNestedAllFields());
                }
                this.data.set('form', this, {force: true});
            },

            setFieldsValue(changedValues, callback) {
                const fieldsMeta = this.fieldsStore.fieldsMeta;
                const values = this.fieldsStore.flattenRegisteredFields(changedValues);
                const newFields = Object.keys(values).reduce((acc, name) => {
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
                    if (decoratorComponent && 'value' in newFields[name]) {
                        decoratorComponent.data.set('value', newFields[name].value || '');
                    }
                });
            },

            validateFieldsInternal(fields, {fieldNames, action, options = {}}, callback) {
                // 所有的校验规则
                const allRules = {};
                // 所有值
                const allValues = {};
                // 校验的表单
                const allFields = {};
                // 已经有的错误
                const alreadyErrors = {};
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
                    let newField = {
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

                validator.validate(allValues, options, errors => {
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
                                    && errorFieldName.indexOf(ruleFieldName) !== 0) {
                                    return false;
                                }

                                // Exist if match the field name
                                const restPath = errorFieldName.slice(ruleFieldName.length + 1);
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
                            const fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
                            fieldErrors.push(e);
                        }
                    }
                    const expired = [];
                    const nowAllFields = {};
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
                    const {names, options, callback} = getParams(ns, opt, cb);
                    let newCallback;

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

                    if (!('firstFields' in options)) {
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
            getCacheBind(name, action, fn) {
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

            onCollectCommon(name, action, args) {
                const fieldMeta = this.fieldsStore.getFieldMeta(name);
                if (fieldMeta[action]) {
                    fieldMeta[action](...args);
                }
                else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
                    fieldMeta.originalProps[action](...args);
                }
                const value = fieldMeta.getValueFromEvent
                    ? fieldMeta.getValueFromEvent(args[2].e)
                    : args[2].value;
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

            onCollectValidate(name, action, ...args) {
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

            onCollect(innerName, action, ...args) {
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

            getFieldProps(name, options) {
                if (!name) {
                    return;
                }

                const fieldOptions = {
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
                validateTriggers.forEach(action => {
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

            getDecoratorComponent(name) {
                let component;
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

            resetFields(ns) {
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

            setDecoratorPropValue(decorator, decoratorComponent, options) {
                let props = this.getFieldProps(decorator.name, decorator);
                let name = options.name;

                if (name) {
                    name += decorator.name ? `-${decorator.name}` : '';
                    decoratorComponent.data.set('id', name);
                }

                const value = this.fieldsStore.getFieldValue(decorator.name);
                if (value === undefined) {
                    return;
                }
                decoratorComponent.data.set('checked' in props ? 'checked' : 'value', value);
            },

            clearField(name) {
                this.fieldsStore.clearField(name);
            },

            updated() {
                this.items.forEach(item => {
                    item.data.set('form', this, {force: true});
                });
            },

            attached() {
                let wrappedComponentAttached = wrappedComponent.attached || noop;
                wrappedComponentAttached.bind(this)();
                this.updated();
            },

            messages: {
                santd_form_change(payload) {
                    const {name, action} = payload.value;
                    if (!name) {
                        return;
                    }
                    let field = this.renderFields[name];
                    if (field && field[action]) {
                        field[action](name, action, payload.value);
                    }
                },
                santd_formitem_add(payload) {
                    const formItem = payload.value;
                    this.items.push(formItem);
                    const decoratorComponents = formItem.data.get('decoratorComponents');
                    // 如果有decoratorComponent，收集信息，加入到fieldStore里面去
                    if (decoratorComponents && decoratorComponents.length) {
                        decoratorComponents.forEach(decoratorComponent => {
                            let decorator = decoratorComponent.data.get('decorator');
                            this.setDecoratorPropValue(decorator, decoratorComponent, options);

                            decoratorComponent.watch('decorator', val => {
                                this.setDecoratorPropValue(val, decoratorComponent, options);
                            });
                        });
                    }
                },
                santd_formitem_remove(payload) {
                    const formItem = payload.value;
                    const decoratorComponents = formItem.data.get('decoratorComponents');
                    // 找到对应的decorator信息，从fieldsStore里删除
                    if (decoratorComponents && decoratorComponents.length) {
                        decoratorComponents.forEach(decoratorComponent => {
                            let decorator = decoratorComponent.data.get('decorator');
                            let fieldMeta = this.fieldsStore.getFieldMeta(decorator.name);
                            if (!fieldMeta.preserve && decorator.name) {
                                this.clearField(decorator.name);
                            }
                        });
                    }
                }
            }
        }, san.defineComponent(wrappedComponent));
    };
}
