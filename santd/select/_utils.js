/**
* @file select 组件公用函数库
* @author fuqiangqiang@baidu.com
*/

export function getMapKey(value) {
    return `${typeof value}-${value}`;
}
export function toArray(value) {
    let ret = value;
    if (value === undefined) {
        ret = [];
    } else if (!Array.isArray(value)) {
        ret = [value];
    }
    return ret;
}

export function findIndexInValueBySingleValue(values, singleValue) {
    let index = -1;
    if (values) {
        for (let i = 0; i < values.length; i++) {
            if (values[i].value === singleValue) {
                index = i;
                break;
            }
        }
    }
    return index;
}

export function defaultFilterFn(input, child) {
    if (child.disabled) {
        return false;
    }
    const optionValue = child.value.toString();
    return optionValue ? optionValue.toLowerCase().indexOf(input.toString().toLowerCase()) > -1 : false;
}
