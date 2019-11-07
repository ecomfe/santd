/**
 * @file Santd Form createDOMForm
 * @author mayihui@baidu.com
 **/

import scrollIntoView from 'dom-scroll-into-view';
import createBaseForm from './createBaseForm';
import {getParams, getScrollableContainer} from './utils';
import has from 'lodash/has';

const mixin = {
    validateFieldsAndScroll(ns, opt, cb) {
        const {names, options} = getParams(ns, opt, cb);
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
