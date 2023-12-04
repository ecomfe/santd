/**
 * @file select/utils
 * @author
 */
import Base from 'santd/base';
import {classCreator} from '../core/util';
import {DefaultValueType, RawValueType} from './interface';

export const prefixCls = classCreator('select')();
export const emptyPrefixCls = classCreator('empty')();
export const dropdownPrefixCls = `${prefixCls}-dropdown`;

export function toTitle(title?: string) {
    if (typeof title === 'string') {
        return title;
    }
    return '';
}

export function toArray<T>(value: T | T[] | undefined): T[] {
    let ret = value === undefined ? [] : value;

    if (!Array.isArray(ret)) {
        ret = [ret];
    }
    return ret;
}

// export function toArray(value) {
//     let ret = value;
//     if (value === undefined) {
//         ret = [];
//     }
//     else if (!Array.isArray(value)) {
//         ret = [value];
//     }
//     return ret;
// }

export function getPropValue(child: Base, prop?: string) {
    if (prop === 'children') {
        return (child.el as HTMLElement)?.innerText;
    }
    if (prop === undefined) {
        return;
    }
    return child.data.get(prop);
}

export function getMapKey(value: string | number) {
    return `${typeof value}-${value}`;
}

export function memoize() {
    let cache: Record<string, any> = {};
    const cacheFun = (obj: Record<string, any>) => {
        cache = {...cache, ...obj};
        return cache;
    };
    return cacheFun;
    // return function (obj: Record<string, any>) {
    //     cache = {...cache, ...obj};
    //     return cache;
    // };
}

export function preventDefaultEvent(e: Event) {
    e.preventDefault();
}

export function includesSeparators(str: string, separators: string[]) {
    for (const item of separators) {
        if (str.lastIndexOf(item) > 0) {
            return true;
        }
    }
    return false;
}

export function splitBySeparators(str: string, separators: string[]) {
    const reg = new RegExp(`[${separators.join()}]`);
    return str.split(reg).filter(token => token);
}

export function generateUUID(): string {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
}

export function defaultFilterFn(input: string, child: any, optionFilterProp?: string) {
    if (child.data.get('disabled')) {
        return false;
    }
    const value = getPropValue(child, optionFilterProp);
    return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}

export function isValueArray(value: DefaultValueType | undefined): value is RawValueType[] {
    return Array.isArray(value);
}
export function isValueString(value: DefaultValueType | undefined): value is string {
    return !isValueArray(value) && typeof value === 'string';
}
export function isValueArrayOrString(value: DefaultValueType | undefined): value is RawValueType[] | string {
    return isValueArray(value) || isValueString(value);
}
