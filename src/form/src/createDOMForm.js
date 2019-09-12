/**
 * @file Santd Form createDOMForm
 * @author mayihui@baidu.com
 **/

import san from 'san';
import scrollIntoView from 'dom-scroll-into-view';
import createBaseForm from './createBaseForm';
import {getParams} from './utils';
import has from 'lodash/has';

function computedStyle(el, prop) {
    const getComputedStyle = window.getComputedStyle;
    const style = getComputedStyle
        ? getComputedStyle(el)
        : el.currentStyle;
    if (style) {
        return style
        [
            // Switch to camelCase for CSSOM
            // DEV: Grabbed from jQuery
            // https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
            // https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
            prop.replace(/-(\w)/gi, (word, letter) => {
                return letter.toUpperCase();
            })
        ];
    }
    return undefined;
}

function getScrollableContainer(n) {
    let node = n;
    let nodeName;
    while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
        const overflowY = computedStyle(node, 'overflowY');
        if (node !== n
            && (overflowY === 'auto' || overflowY === 'scroll')
            && node.scrollHeight > node.clientHeight) {
            return node;
        }
        node = node.parentNode;
    }
    return nodeName === 'body' ? node.ownerDocument : node;
}

const mixin = {
    validateFieldsAndScroll(ns, opt, cb) {
        const {names, callback, options} = getParams(ns, opt, cb);
        const that = this;

        const newCb = function (error, values) {
            if (error) {
                const fieldsStore = that.data.get('fieldsStore');
                const validNames = fieldsStore.getValidFieldsName();

                let firstNode;
                let firstTop;

                validNames.forEach(name => {
                    if (has(error, name)) {
                        const instance = that.getFieldInstance(name);
                        if (instance) {
                            const node = instance.el;
                            const top = node.getBoundingClientRect().top;
                            if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                                firstTop = top;
                                firstNode = node;
                            }
                        }
                    }
                });

                if (firstNode) {
                    const c = options.container || getScrollableContainer(firstNode);
                    scrollIntoView(firstNode, c, {
                        onlyScrollIfNeeded: true,
                        ...options.scroll
                    });
                }
            }
        };

        return this.validateFields(names, options, newCb);
    }
};

export default function (options) {
    return createBaseForm({
        ...options
    }, [mixin]);
}
