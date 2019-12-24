/**
 * @file 原生js处理
 * @author fuqiangqiang@baidu.com
 */

import {CLASSNAME_PREFIX} from '../constants';
import getRequestAnimationFrame, {cancelRequestAnimationFrame as caf} from './getRequestAnimationFrame';

const raf = getRequestAnimationFrame();

export const hasClass = (elements, cName) =>
    !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));

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
 *
 * @param {string} prefix classname prefix
 * @return {string} guid
 */
export const guid = (prefix = CLASSNAME_PREFIX) => {
    let id = (+(Math.random() + '').substr(2, 16)).toString(36);
    return `${prefix}-${id}`;
};

/**
 * 获取 class
 *
 * @param {string} prefix string
 * @return {Function} creator
 */
export const classCreator = prefix =>
    part => part ? `${CLASSNAME_PREFIX}-${prefix}-${part}` : `${CLASSNAME_PREFIX}-${prefix}`;


export const type = (o, s) => typeof o === s;

export const deepCopy = target => {
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
        if (Array.isArray(target)) {
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

export const cancelAnimationTimeout = frame => caf(frame.id);

export const requestAnimationTimeout = (callback, delay) => {
    const start = Date.now();
    /* eslint-disable fecs-use-computed-property */
    const frame = {};
    function timeout() {
        if (Date.now() - start >= delay) {
            callback.call();
        }
        else {
            frame.id = raf(timeout);
        }
    }

    frame.id = raf(timeout);
    return frame;
};
