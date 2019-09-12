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
  argumentContainer,
  identity,
  normalizeValidateRules,
  getValidateTriggers,
  getValueFromEvent,
  hasRules,
  getParams,
  isEmptyObject,
  flattenArray
} from './utils';
import createFieldsStore from './createFieldsStore';

export default function (options = {}, mixins = []) {
    const {
        validateMessages,
        onFieldsChange,
        onValuesChange,
        mapProps,
        mapPropsToFields,
        fieldNameProp,
        fieldMetaProp,
        fieldDataProp,
        formPropName = 'form',
        name: formName,
        withRef
    } = options;
    return function (wrappedComponent) {
        let initData = wrappedComponent.initData;
        let created = wrappedComponent.created;
        mixins.forEach(mixin => {
            for (let name in mixin) {
                wrappedComponent[name] = mixin[name];
            }
        });
        wrappedComponent.initData = function () {
            if (typeof initData === 'function') {
                initData = initData.bind(this)();
            }
            return {
                ...initData,
                fieldsStore: {},
                instances: {},
                cachedBind: {},
                clearedFieldMetaCache: {},
                renderFields: {},
                domFields: {},
                submiting: false
            };
        };
        wrappedComponent.created = function () {
            const fields = mapPropsToFields && mapPropsToFields(this) || {};
            this.data.set('fieldsStore', createFieldsStore(fields || {}));
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
                this[key] = function (...args) {
                    return this.data.get('fieldsStore')[key](...args);
                };
            });

            this.data.set('form', this);
            this.watch('form', val => {
                const children = this.data.get('children');
                for (let i in children) {
                    if (children[i] && children[i].data) {
                        children[i].data.set('form', this, {force: true});
                    }
                }
            });
            /*this.watch('refresh', val => {
                const children = this.data.get('children');
                for (let i in children) {
                    if (children[i] && children[i].data) {
                        children[i].data.set('form', this);
                        children[i].data.set('refresh', Math.random());
                    }
                }
            });*/

            if (typeof created === 'function') {
                created.bind(this)();
            }
        };
        wrappedComponent.getFieldInstance = function (name) {
            const instances = this.data.get('instances');
            return instances[name];
        };
        wrappedComponent.getRules = function (fieldMeta, action) {
            const actionRules = fieldMeta.validate.filter(item => {
                return !action || item.trigger.indexOf(action) >= 0;
            }).map(item => item.rules);
            return flattenArray(actionRules);
        };
        wrappedComponent.setFields = function (maybeNestedFields, callback) {
            const fieldsStore = this.data.get('fieldsStore');
            const fields = fieldsStore.flattenRegisteredFields(maybeNestedFields);
            fieldsStore.setFields(fields);
            if (onFieldsChange) {
                const changedFields = Object.keys(fields)
                    .reduce((acc, name) => set(acc, name, fieldsStore.getField(name)), {});
                onFieldsChange({
                    [formPropName]: this
                }, changedFields, fieldsStore.getNestedAllFields());
            }
            // this.data.set('refresh', Math.random());
            this.data.set('form', this, {force: true});
        };

        wrappedComponent.getFieldDecorator = function (options) {
            const props = this.getFieldProps(options.name, options);
            return props;
        };
        wrappedComponent.onCollectCommon = function (name, action, args) {
            const fieldsStore = this.data.get('fieldsStore');
            const fieldMeta = fieldsStore.getFieldMeta(name);
            if (fieldMeta[action]) {
                fieldMeta[action](...args);
            }
            else if (fieldMeta.originalProps && fieldMeta.originalProps[action]) {
                fieldMeta.originalProps[action](...args);
            }
            const value = fieldMeta.getValueFromEvent
                ? fieldMeta.getValueFromEvent(args[2].value)
                : args[2].value;
            if (onValuesChange && value !== fieldsStore.getFieldValue(name)) {
                const valuesAll = fieldsStore.getAllValues();
                const valuesAllSet = {};
                valuesAll[name] = value;
                Object.keys(valuesAll).forEach(key => set(valuesAllSet, key, valuesAll[key]));
                onValuesChange({
                    [formPropName]: this
                }, set({}, name, value), valuesAllSet);
            }
            const field = fieldsStore.getField(name);
            return ({
                name,
                field: {...field, value, touched: true},
                fieldMeta
            });
        };
        wrappedComponent.validateFieldsInternal = function (fields, {fieldNames, action, options = {}}, callback) {
            const allRules = {};
            const allValues = {};
            const allFields = {};
            const alreadyErrors = {};
            const fieldsStore = this.data.get('fieldsStore');
            fields.forEach(field => {
                const name = field.name;
                if (options.force !== true && field.dirty === false) {
                    if (field.errors) {
                        set(alreadyErrors, name, {errors: field.errors});
                    }
                    return;
                }
                const fieldMeta = fieldsStore.getFieldMeta(name);
                const newField = {
                    ...field
                };
                newField.errors = undefined;
                newField.validating = true;
                newField.dirty = true;
                allRules[name] = this.getRules(fieldMeta, action);
                allValues[name] = newField.value;
                allFields[name] = newField;
            });
            this.setFields(allFields);
            Object.keys(allValues).forEach(f => {
                allValues[f] = fieldsStore.getFieldValue(f);
            });
            if (callback && isEmptyObject(allFields)) {
                callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors,
                    fieldsStore.getFieldsValue(fieldNames));
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
                    const nowField = fieldsStore.getField(name);
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

                    callback(isEmptyObject(errorsGroup) ? null : errorsGroup, fieldsStore.getFieldsValue(fieldNames));
                }
            });
        };
        wrappedComponent.onCollectValidate = function (name, action, ...args) {
            const {
                field,
                fieldMeta
            } = this.onCollectCommon(name, action, args);
            const newField = {
                ...field,
                dirty: true
            };

            const fieldsStore = this.data.get('fieldsStore');
            fieldsStore.setFieldsAsDirty();

            this.validateFieldsInternal([newField], {
                action,
                options: {
                    firstFields: !!fieldMeta.validateFirst
                }
            });
            // this.data.set('refresh', Math.random());
            this.data.set('form', this, {force: true});
        };
        wrappedComponent.onCollect = function (innerName, action, ...args) {
            const {name, field, fieldMeta} = this.onCollectCommon(innerName, action, args);
            const validate = fieldMeta.validate;
            const fieldsStore = this.data.get('fieldsStore');

            fieldsStore.setFieldsAsDirty();

            const newField = {
                ...field,
                dirty: hasRules(validate)
            };
            this.setFields({
                [name]: newField
            });
        };
        wrappedComponent.getCacheBind = function (name, action, fn) {
            const cachedBind = this.data.get('cachedBind');
            if (!cachedBind[name]) {
                cachedBind[name] = {};
            }
            const cache = cachedBind[name];
            if (!cache[action] || cache[action].oriFn !== fn) {
                cache[action] = {
                    fn: fn.bind(this, name, action),
                    oriFn: fn
                };
            }
            this.data.set('cachedBind', cachedBind);
            return cache[action].fn;
        };
        wrappedComponent.getFieldProps = function (name, options) {
            if (!name) {
                return;
            }

            const clearedFieldMetaCache = this.data.get('clearedFieldMetaCache');
            delete clearedFieldMetaCache[name];
            this.data.set('clearedFieldMetaCache', clearedFieldMetaCache);

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

            const fieldsStore = this.data.get('fieldsStore');
            const fieldMeta = fieldsStore.getFieldMeta(name);

            if ('initialValue' in fieldOptions) {
                fieldMeta.initialValue = fieldOptions.initialValue;
            }

            const inputProps = {
                ...fieldsStore.getFieldValuePropValue(fieldOptions)
            };

            const validateRules = normalizeValidateRules(validate, rules, validateTrigger);
            const validateTriggers = getValidateTriggers(validateRules);

            validateTriggers.forEach(action => {
                if (inputProps[action]) {
                    return;
                }
                inputProps[action] = this.getCacheBind(name, action, this.onCollectValidate);
            });

            // make sure that the value will be collect
            if (trigger && validateTriggers.indexOf(trigger) === -1) {
                inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
            }

            const meta = {
                ...fieldMeta,
                ...fieldOptions,
                validate: validateRules
            };
            fieldsStore.setFieldMeta(name, meta);
            if (fieldMetaProp) {
                inputProps[fieldMetaProp] = meta;
            }

            if (fieldDataProp) {
                inputProps[fieldDataProp] = fieldsStore.getField(name);
            }

            // This field is rendered, record it
            this.data.set('renderFields.' + name, inputProps);
            return inputProps;
        };
        wrappedComponent.validateFields = function (ns, opt, cb) {
            const pending = new Promise((resolve, reject) => {
                const fieldsStore = this.data.get('fieldsStore');
                const {
                    names,
                    options
                } = getParams(ns, opt, cb);
                let callback = getParams(ns, opt, cb).callback;
                if (!callback || typeof callback === 'function') {
                    const oldCb = callback;
                    callback = (errors, values) => {
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
                    ? fieldsStore.getValidFieldsFullName(names)
                    : fieldsStore.getValidFieldsName();
                const fields = fieldNames
                    .filter(name => {
                        const fieldMeta = fieldsStore.getFieldMeta(name);
                        return hasRules(fieldMeta.validate);
                    }).map(name => {
                        const field = fieldsStore.getField(name);
                        field.value = fieldsStore.getFieldValue(name);
                        return field;
                    });
                if (!fields.length) {
                    callback(null, fieldsStore.getFieldsValue(fieldNames));
                    return;
                }
                if (!('firstFields' in options)) {
                    options.firstFields = fieldNames.filter(name => {
                        const fieldMeta = fieldsStore.getFieldMeta(name);
                        return !!fieldMeta.validateFirst;
                    });
                }
                this.validateFieldsInternal(fields, {
                    fieldNames,
                    options
                }, callback);
            });
            pending.catch(e => {
                if (console.error) {
                    console.error(e);
                }
                return e;
            });
            this.data.set('form', this, {force: true});
            return pending;
        };
        wrappedComponent.resetFields = function (ns) {
            const fieldsStore = this.data.get('fieldsStore');
            const newFields = fieldsStore.resetFields(ns);
            const instances = this.data.get('instances');
            if (Object.keys(newFields).length > 0) {
                this.setFields(newFields);
            }
            Object.keys(newFields).forEach(field => {
                const props = newFields[field];
                if (instances[field]) {
                    const decoratorInstance = instances[field].data.get('decoratorInstance');
                    decoratorInstance.data.set('value', props.value || '');
                }
            });
            if (ns) {
                const names = Array.isArray(ns) ? ns : [ns];
                const clearedFieldMetaCache = this.data.get('clearedFieldMetaCache');
                names.forEach(name => delete clearedFieldMetaCache[name]);
            }
            else {
                this.data.set('clearedFieldMetaCache', {});
            }
        };
        wrappedComponent.setFieldsValue = function (changedValues, callback) {
            const fieldsStore = this.data.get('fieldsStore');
            const fieldsMeta = fieldsStore.fieldsMeta;
            const values = fieldsStore.flattenRegisteredFields(changedValues);
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
                const allValues = fieldsStore.getAllValues();
                onValuesChange({
                    [formPropName]: this
                }, changedValues, allValues);
            }
        };
        wrappedComponent.clearField = function (name) {
            const fieldsStore = this.data.get('fieldsStore');
            fieldsStore.clearField(name);

            this.data.set('instances.' + name, null);
            this.data.set('cachedBind.' + name, null);
        };
        wrappedComponent.cleanUpUselessFields = function () {
            const fieldsStore = this.data.get('fieldsStore');
            const fieldList = fieldsStore.getAllFieldsName();
            const removedList = fieldList.filter(field => {
                const fieldMeta = fieldsStore.getFieldMeta(field);
                return !this.data.get('renderFields.' + field)
                    && !this.data.get('domFields.' + field)
                    && !fieldMeta.preserve;
            });
            if (removedList.length) {
                removedList.forEach(this.clearField.bind(this));
            }
            this.data.set('renderFields', {});
        };
        wrappedComponent.messages = {
            santd_form_change(payload) {
                const {name, action} = payload.value;
                const field = this.data.get('renderFields.' + name);
                if (field && field[action]) {
                    field[action](name, action, payload.value);
                }
            },
            santd_formitem_add(payload) {
                const children = this.data.get('children') || {};
                children[payload.value.id] = payload.value;
                const decorator = payload.value.data.get('decorator');
                if (decorator) {
                    this.data.set('instances.' + decorator.name, payload.value);
                    this.data.set('domFields.' + decorator.name, true);
                }
                this.data.set('children', children);
                this.data.set('form', this, {force: true});
            },
            santd_formitem_remove(payload) {
                const children = this.data.get('children') || {};
                children[payload.value.id] = payload.value;
                const decorator = payload.value.data.get('decorator');
                if (decorator && decorator.name) {
                    const fieldsStore = this.data.get('fieldsStore');
                    const fieldMeta = fieldsStore.getFieldMeta(decorator.name);
                    if (!fieldMeta.preserve && decorator.name) {
                        this.clearField(decorator.name);
                    }
                }
            }
        };
        return wrappedComponent;
    };
}
