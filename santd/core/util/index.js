/**
 * @file 原生js处理
 * @author fuqiangqiang@baidu.com
 */
 /* eslint-disable fecs-camelcase */

import {CLASSNAME_PREFIX} from '../constants';

export const hasClass = (elements, cName) => {
    return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};
export const addClass = (ele, cls) => {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }

};
export const removeClass = (ele, cls) => {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }

};

/**
 * 获取唯一 class id
 * @param {string} prefix
 * @return {string} guid
 */
export const guid = (prefix = CLASSNAME_PREFIX) => {
    let id = (+(Math.random() + '').substr(2, 16)).toString(36);
    return `${prefix}-${id}`;
};

/**
 * 获取 class
 * @param {*} prefix
 */
export const classCreator = prefix => {
    return part => {
        return part ? `${CLASSNAME_PREFIX}-${prefix}-${part}` : `${CLASSNAME_PREFIX}-${prefix}`;
    };
};

export const type = (o, s) => typeof o === s;

export const deepCopy = target =>{
    let copyed_objs = [];
    function _deepCopy(target) {
        if ((typeof target !== 'object') || !target) {
            return target;
        }
        for (let i = 0; i < copyed_objs.length; i++) {
            if (copyed_objs[i].target === target) {
                return copyed_objs[i].copyTarget;
            }
        }
        let obj = {};
        if(Array.isArray(target)){
            obj = [];
        }
        copyed_objs.push({target: target, copyTarget: obj});
        Object.keys(target).forEach(key => {
            if (obj[key]) {
                return;
            }
            obj[key] = _deepCopy(target[key]);
        });
        return obj;
    }
    return _deepCopy(target);
}

/**
* 判断对象是不是相等
*
* return {Boolean} 返回布尔
*/
const toString = Object.prototype.toString;
const isFunction = obj => {
    return toString.call(obj) === '[object Function]';
};

const deepEq = (a, b, aStack, bStack) => {
    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    let className = toString.call(a);
    if (className !== toString.call(b)) {
        return false;
    }
    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            if (+a !== +a) {
                return +b !== +b;
            }
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }

    const areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a !== 'object' || typeof b !== 'object') {
            return false;
        }
        const aCtor = a.constructor;
        const bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor !== bCtor
            && !(isFunction(aCtor)
            && aCtor instanceof aCtor
            && isFunction(bCtor)
            && bCtor instanceof bCtor)
            && ('constructor' in a && 'constructor' in b)
        ) {
            return false;
        }
    }

    aStack = aStack || [];
    bStack = bStack || [];
    let length = aStack.length;

    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }

    aStack.push(a);
    bStack.push(b);

    // 数组判断
    if (areArrays) {

        length = a.length;
        if (length !== b.length) {
            return false;
        }

        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack)) {
                return false;
            }
        }
    }
    // 对象判断
    else {

        let keys = Object.keys(a);
        let key;
        length = keys.length;

        if (Object.keys(b).length !== length) {
            return false;
        }
        while (length--) {

            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) {
                return false;
            }
        }
    }

    aStack.pop();
    bStack.pop();
    return true;
};
export const eq = (a, b, aStack, bStack) => {
    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
    }
    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null) {
        return false;
    }
    // 判断 NaN
    if (a !== a) {
        return b !== b;
    }
    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    let type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
        return false;
    }

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
};

/**
 * 数组去重
 *
 * @param {Array} array 要处理的数组
 *
 * @return {Array} res 返回去重后的数据
*/
export const unique = array => {
    let res = [];
    let arrayLen;
    let resLen;
    let i;
    let j;
    for (i = 0, arrayLen = array.length; i < arrayLen; i++) {
        for (j = 0, resLen = res.length; j < resLen; j++) {
            if (array[i] === res[j]) {
                break;
            }
        }
        if (j === resLen) {
            res.push(array[i]);
        }
    }
    return res;
};

/**
 * 获取list下的所有san components
 *
 * @param  {Array} list 递归遍历该list
 * @param  {Function} conditionFn 判断条件
 * @param  {number} dep 递归深度
 * @return {Array}      component children
 */
export const getComponentChildren = (list, conditionFn, dep = 100) => {
    let itemlist = [];
    let step = 0;
    let loopCMPT = list => {
        step++;
        if (step > dep) {
            return;
        }
        if (list && list.length) {
            for (let item of list) {
                if (conditionFn(item, step)) {
                    itemlist.push(item);
                }
                loopCMPT(item.children);
            }
        }
        step--;
    };
    loopCMPT(list);
    return itemlist;
};
