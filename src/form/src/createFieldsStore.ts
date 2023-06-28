/**
 * @file Santd form createFieldsStore
 * @author mayihui@baidu.com
 **/
import set from 'lodash/set';
import {Field, FieldMeta} from '../interface';
import createFormField, {isFormField} from './createFormField';
import {hasRules, flattenFields, getErrorStrs, startsWith} from './utils';

function partOf(a: string, b: string) {
    return b.startsWith(a) && ['.', '['].includes(b[a.length]);
}

function internalFlattenFields(fields: unknown) {
    return flattenFields(
        fields,
        (_, node) => isFormField(node),
        'You must wrap field data with `createFormField`.'
    );
}

export class FieldsStore {
    fields: Record<string, Field>;
    fieldsMeta: Record<string, FieldMeta>;

    constructor(fields: unknown) {
        this.fields = internalFlattenFields(fields);
        this.fieldsMeta = {};
    }

    updateFields(fields: unknown) {
        this.fields = internalFlattenFields(fields);
    }

    flattenRegisteredFields(fields: unknown) {
        const validFieldsName = this.getAllFieldsName();
        return flattenFields(
            fields,
            path => validFieldsName.includes(path),
            'You cannot set a form field before rendering a field associated with the value.'
        );
    }

    setFieldsInitialValue(initialValues: unknown) {
        const flattenedInitialValues = this.flattenRegisteredFields(initialValues);
        const fieldsMeta = this.fieldsMeta;
        Object.keys(flattenedInitialValues).forEach(name => {
            if (fieldsMeta[name]) {
                this.setFieldMeta(name, {
                    ...this.getFieldMeta(name),
                    initialValue: flattenedInitialValues[name]
                });
            }
        });
    }

    setFields(fields: Record<string, any>) {
        const fieldsMeta = this.fieldsMeta;
        const nowFields = {
            ...this.fields,
            ...fields
        };
        const nowValues: Record<string, unknown> = {};
        Object.keys(fieldsMeta)
            .forEach(f => {
                nowValues[f] = this.getValueFromFields(f, nowFields);
            });
        Object.keys(nowValues).forEach(f => {
            const value = nowValues[f];
            const fieldMeta = this.getFieldMeta(f);
            if (fieldMeta && fieldMeta.normalize) {
                const nowValue = fieldMeta.normalize(value, this.getValueFromFields(f, this.fields), nowValues);
                if (nowValue !== value) {
                    nowFields[f] = {
                        ...nowFields[f],
                        value: nowValue
                    };
                }
            }
        });
        this.fields = nowFields;
    }

    resetFields(ns: string[]) {
        const fields = this.fields;
        const names = ns
            ? this.getValidFieldsFullName(ns)
            : this.getAllFieldsName();
        return names.reduce((acc: Record<string, any>, name) => {
            const field = fields[name];
            if (field && 'value' in field) {
                acc[name] = {};
            }
            return acc;
        }, {});
    }

    setFieldMeta(name: string, meta: FieldMeta) {
        this.fieldsMeta[name] = meta;
    }

    setFieldsAsDirty() {
        Object.keys(this.fields).forEach(name => {
            const field = this.fields[name];
            const fieldMeta = this.fieldsMeta[name];
            if (field && fieldMeta && hasRules(fieldMeta.validate)) {
                this.fields[name] = {
                    ...field,
                    dirty: true
                };
            }
        });
    }

    getFieldMeta(name: string): FieldMeta {
        this.fieldsMeta[name] = this.fieldsMeta[name] || {};
        return this.fieldsMeta[name];
    }

    getValueFromFields(name: string, fields: Record<string, any>): unknown {
        const field = fields[name];
        if (field && 'value' in field) {
            return field.value;
        }
        const fieldMeta = this.getFieldMeta(name);
        return fieldMeta && fieldMeta.initialValue;
    }

    getAllValues(): Record<string, unknown> {
        const {fieldsMeta, fields} = this;
        return Object.keys(fieldsMeta)
            .reduce((acc, name) => set(acc, name, this.getValueFromFields(name, fields)), {});
    }

    getValidFieldsName() {
        const fieldsMeta = this.fieldsMeta;
        return fieldsMeta
            ? Object.keys(fieldsMeta).filter(name => !this.getFieldMeta(name).hidden)
            : [];
    }

    getAllFieldsName() {
        const fieldsMeta = this.fieldsMeta;
        return fieldsMeta ? Object.keys(fieldsMeta) : [];
    }

    getValidFieldsFullName(maybePartialName: string | string[]) {
        const maybePartialNames = Array.isArray(maybePartialName)
            ? maybePartialName : [maybePartialName];
        return this.getValidFieldsName()
            .filter(fullName => maybePartialNames.some(partialName => (
                fullName === partialName || (
                    startsWith(fullName, partialName) && ['.', '['].includes(fullName[partialName.length])
                )
            )));
    }

    getFieldValuePropValue(fieldMeta: {
        name: string;
        getValueProps?: (fieldValue: string) => Record<string, unknown>;
        valuePropName: string;
        initialValue?: unknown;
    }) {
        const {name, getValueProps, valuePropName} = fieldMeta;
        const field = this.getField(name);
        const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
        if (getValueProps) {
            return getValueProps(fieldValue);
        }
        return {[valuePropName]: fieldValue};
    }

    getField(name: string): Field {
        return {
            ...this.fields[name],
            name
        };
    }

    getNotCollectedFields(): Record<string, Field<unknown>> {
        const fieldsName = this.getValidFieldsName();
        return fieldsName
            .filter(name => !this.fields[name])
            .map(name => ({
                name,
                dirty: false,
                value: this.getFieldMeta(name).initialValue
            }))
            .reduce((acc, field) => set(acc, field.name, createFormField(field)), {});
    }

    getNestedAllFields() {
        return Object.keys(this.fields)
            .reduce(
                (acc, name) => set(acc, name, createFormField(this.fields[name])),
                this.getNotCollectedFields()
            );
    }

    getFieldMember(name: string, member: keyof Field) {
        return this.getField(name)[member];
    }

    getNestedFields(names: string[] | undefined, getter: (name: string) => any): Record<string, unknown> {
        const fields = names || this.getValidFieldsName();
        return fields.reduce((acc, f) => set(acc, f, getter.bind(this)(f)), {});
    }

    getNestedField(name: string, getter: (name: string) => unknown) {
        const fullNames = this.getValidFieldsFullName(name);
        if (
            fullNames.length === 0 || (fullNames.length === 1 && fullNames[0] === name) // Name already is full name.
        ) {
            return getter(name);
        }
        const isArrayValue = fullNames[0][name.length] === '[';
        const suffixNameStartIndex = isArrayValue ? name.length : name.length + 1;
        return fullNames
            .reduce(
                (acc, fullName) => set(
                    acc,
                    fullName.slice(suffixNameStartIndex),
                    getter(fullName)
                ),
                isArrayValue ? [] : {}
            );
    }

    getFieldsValue(names: string[] | undefined) {
        return this.getNestedFields(names, this.getFieldValue);
    }

    getFieldValue(name: string) {
        const fields = this.fields;
        return this.getNestedField(name, fullName => this.getValueFromFields(fullName, fields));
    }

    getFieldsError(names?: string[]) {
        const newNames: string[] | undefined = Array.isArray(names) ? names : undefined;
        return this.getNestedFields(newNames, this.getFieldError);
    }

    getFieldError(name: string) {
        return this.getNestedField(
            name,
            fullName => getErrorStrs(this.getFieldMember(fullName, 'errors'))
        );
    }

    isFieldValidating(name: string): boolean {
        return this.getFieldMember(name, 'validating');
    }

    isFieldsValidating(ns: string[] | undefined) {
        const names = ns || this.getValidFieldsName();
        return names.some(n => this.isFieldValidating(n));
    }

    isFieldTouched(name: string): boolean {
        return this.getFieldMember(name, 'touched');
    }

    isFieldsTouched(ns: string[] | undefined) {
        const names = ns || this.getValidFieldsName();
        return names.some(n => this.isFieldTouched(n));
    }

    // @private
    // BG: `a` and `a.b` cannot be use in the same form
    isValidNestedFieldName(name: string) {
        const names: string[] = this.getAllFieldsName();
        return names.every(n => !partOf(n, name) && !partOf(name, n));
    }

    clearField(name: string) {
        delete this.fields[name];
        delete this.fieldsMeta[name];
    }
}

export default function createFieldsStore(fields: unknown) {
    return new FieldsStore(fields);
}
