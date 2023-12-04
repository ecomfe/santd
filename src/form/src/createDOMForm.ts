/**
 * @file Santd Form createDOMForm
 * @author mayihui@baidu.com
 **/

import scrollIntoView from 'dom-scroll-into-view';
import createBaseForm, {BaseForm} from './createBaseForm';
import {getParams, getScrollableContainer} from './utils';
import has from 'lodash/has';
import {
    ValidateFieldsOptions,
    Mixins,
    ValidateFieldsCb
} from '../interface';


const mixin: Mixins<BaseForm> = {
    validateFieldsAndScroll(ns, opt, cb) {
        const {names, options} = getParams(ns, opt, cb);
        const that = this;

        const newCb: ValidateFieldsCb = function (error, _values) {
            if (error) {
                // 补充类型
                const fieldsStore = that.data.get('fieldsStore');
                const validNames: string[] = fieldsStore.getValidFieldsName();

                let firstNode: HTMLInputElement | undefined;
                let firstTop: number | undefined;

                validNames.forEach(name => {
                    if (has(error, name)) {
                        // 补充类型 (没有搜到该方法的实现逻辑)
                        const instance = that.getFieldInstance(name);
                        if (instance) {
                            const node = instance.el as HTMLInputElement;
                            const top = node.getBoundingClientRect().top;
                            if (node.type !== 'hidden' && (firstTop === undefined || firstTop > top)) {
                                firstTop = top;
                                firstNode = node;
                            }
                        }
                    }
                });

                if (firstNode) {
                    const newOpt = options as ValidateFieldsOptions;
                    const c = newOpt.container || getScrollableContainer(firstNode);
                    scrollIntoView(firstNode, c, {
                        onlyScrollIfNeeded: true,
                        ...newOpt.scroll
                    });
                }
            }
        };
        return this.validateFields(names, options, newCb);
    }
};

export default function <DataT extends {} = {}, OptionsT extends {} = {}>(options: Record<string, any>) {
    return createBaseForm<DataT, OptionsT>({
        ...options
    }, mixin);
}
