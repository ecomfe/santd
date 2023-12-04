/**
 * @file 原生js处理
 * @author fuqiangqiang@baidu.com
 */
import {CLASSNAME_PREFIX} from '../constants';

import getRequestAnimationFrame, {cancelRequestAnimationFrame as caf} from './getRequestAnimationFrame';


const raf = getRequestAnimationFrame();

export const hasClass = (elements: HTMLElement, cName: string) =>
    /* eslint-disable @typescript-eslint/prefer-regexp-exec */
    !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
    /* eslint-enable @typescript-eslint/prefer-regexp-exec */

export const addClass = (ele: HTMLElement, cls: string) => {
    if (!hasClass(ele, cls)) {
        /* eslint-disable no-param-reassign */
        ele.className += ' ' + cls;
        /* eslint-enable no-param-reassign */
    }

};
export const removeClass = (ele: HTMLElement, cls: string) => {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        /* eslint-disable no-param-reassign */
        ele.className = ele.className.replace(reg, ' ');
        /* eslint-enable no-param-reassign */
    }

};

/**
 * 获取唯一 class id
 *
 * @param {string} prefix classname prefix
 * @return {string} guid
 */
export const guid = (prefix = CLASSNAME_PREFIX) => {
    // let id = (+(Math.random() + '').substr(2, 16)).toString(36);
    const id = Number((`${Math.random()}`.substr(2, 16))).toString(36);
    return `${prefix}-${id}`;
};

/**
 * 获取 class
 *
 * @param {string} prefix string
 * @return {Function} creator
 */
// export const classCreator = (prefix: string, part?: string) => (part
//     ? `${CLASSNAME_PREFIX}-${prefix}-${part}`
//     : `${CLASSNAME_PREFIX}-${prefix}`
// );
export const classCreator = (prefix: string | number) => (part?: string | number) => (part
    ? `${CLASSNAME_PREFIX}-${prefix}-${part}`
    : `${CLASSNAME_PREFIX}-${prefix}`
);

export const type = (o: unknown, s: string) => typeof o === s;

export const deepCopy = (target: any) => {
    const copyedObjs: any[] = [];
    /* eslint-disable no-underscore-dangle */
    function _deepCopy(target: any) {
    /* eslint-enable no-underscore-dangle */
        if ((typeof target !== 'object') || !target) {
            return target;
        }
        /* eslint-disable @typescript-eslint/prefer-for-of */
        for (let i = 0; i < copyedObjs.length; i++) {
        /* eslint-enable @typescript-eslint/prefer-for-of */
            if (copyedObjs[i].target === target) {
                return copyedObjs[i].copyTarget;
            }
        }
        let obj: Record<string, any> = {};
        if (Array.isArray(target)) {
            obj = [];
        }
        copyedObjs.push({target: target, copyTarget: obj});
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
 * @return component children
 */
export const getComponentChildren = <T>(
    list: any[],
    conditionFn: (item: any, step: number) => boolean,
    dep: number = 100
) => {
    const itemlist: T[] = [];
    let step = 0;
    const loopCMPT = (list?: any[]) => {
        step++;
        if (step > dep) {
            return;
        }
        if (list && list.length) {
            for (const item of list) {
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

export const cancelAnimationTimeout = (frame: {id: number}) => caf(frame.id);

export const requestAnimationTimeout = (callback: () => void, delay: number) => {
    const start = Date.now();
    /* eslint-disable fecs-use-computed-property */
    const frame: {id?: number | void} = {};
    const timeout = () => {
        if (Date.now() - start >= delay) {
            callback.call(this);
        }
        else {
            frame.id = raf(timeout);
        }
    };

    frame.id = raf(timeout);
    return frame as {id: number};
};

export function isUndefined<T>(value: T | undefined): value is undefined {
    return typeof value === 'undefined';
}
