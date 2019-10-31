/**
 * @file select/utils
 * @author
 */

import {classCreator} from '../core/util';

export const prefixCls = classCreator('select')();
export const emptyPrefixCls = classCreator('empty')();
export const dropdownPrefixCls = `${prefixCls}-dropdown`;

export function toTitle(title) {
    if (typeof title === 'string') {
        return title;
    }
    return '';
}

export function toArray(value) {
    let ret = value;
    if (value === undefined) {
        ret = [];
    }
    else if (!Array.isArray(value)) {
        ret = [value];
    }
    return ret;
}

export function getPropValue(child, prop) {
    if (prop === 'children') {
        return child.el.innerText;
    }
    return child.data.get(prop);
}

export function getMapKey(value) {
    return `${typeof value}-${value}`;
}

export function preventDefaultEvent(e) {
    e.preventDefault();
}

export function includesSeparators(str, separators) {
    for (let i = 0; i < separators.length; ++i) {
        if (str.lastIndexOf(separators[i]) > 0) {
            return true;
        }
    }
    return false;
}

export function splitBySeparators(str, separators) {
    const reg = new RegExp(`[${separators.join()}]`);
    return str.split(reg).filter(token => token);
}

export function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16);
    });
    return uuid;
}

export function defaultFilterFn(input, child, optionFilterProp) {
    if (child.data.get('disabled')) {
        return false;
    }
    const value = getPropValue(child, optionFilterProp);
    return value.toLowerCase().indexOf(input.toLowerCase()) > -1;
}
