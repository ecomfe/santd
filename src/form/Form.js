/**
* @file form 组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import createFormField from './src/createFormField';
import scrollIntoView from 'dom-scroll-into-view';
import createBaseForm from './src/createBaseForm';
import {getParams, getScrollableContainer} from './src/utils';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import './style/index';

const prefixCls = classCreator('form')();

let form = san.defineComponent({
    dataTypes: {
        hideRequiredMark: DataTypes.bool,
        layout: DataTypes.oneOf(['inline', 'horizontal', 'vertical']),
        wrapperCol: DataTypes.object,
        labelCol: DataTypes.object,
        labelAlign: DataTypes.string,
        colon: DataTypes.bool
    },
    computed: {
        classes() {
            const layout = this.data.get('layout');
            const hideRequiredMark = this.data.get('hideRequiredMark');
            let classArr = [prefixCls];

            layout === 'horizontal' && classArr.push(`${prefixCls}-horizontal`);
            layout === 'vertical' && classArr.push(`${prefixCls}-vertical`);
            layout === 'inline' && classArr.push(`${prefixCls}-inline`);
            hideRequiredMark && classArr.push(`${prefixCls}-hide-required-mark`);
            return classArr;
        }
    },
    initData() {
        return {
            colon: true,
            layout: 'horizontal',
            hideRequiredMark: false,
            labelAlign: 'right'
        };
    },
    inited() {
        this.items = [];
    },
    handleSubmit(e) {
        this.fire('submit', e);
    },
    setFormProps(formItem) {
        const labelAlign = formItem.data.get('labelAlign') || this.data.get('labelAlign');
        let labelCol = formItem.data.get('labelCol');
        isEmpty(labelCol) && (labelCol = this.data.get('labelCol'));
        let wrapperCol = formItem.data.get('wrapperCol');
        isEmpty(wrapperCol) && (wrapperCol = this.data.get('wrapperCol'));
        const colon = formItem.data.get('colon') || this.data.get('colon');

        formItem.data.set('labelAlign', labelAlign);
        formItem.data.set('labelCol', labelCol);
        formItem.data.set('wrapperCol', wrapperCol);
        formItem.data.set('colon', colon);
    },
    updated() {
        this.items.forEach(item => {
            const form = this.form || this;
            item.data.set('form', {...form});
        });
    },
    attached() {
        this.updated();
        this.dispatch('santd_form_add', this);
    },
    getForm() {
        let component = this.parentComponent;
        let form;
        while (component) {
            if (component.fieldsStore) {
                form = component;
                break;
            }
            component = component.parentComponent;
        }
        return form;
    },
    messages: {
        santd_formitem_add(payload) {
            if (!this.form) {
                this.form = this.getForm();
            }
            let formItem = payload.value;
            this.setFormProps(formItem);
            // 判断如果父组件不是create出来的form，自己持有子组件
            if (!this.form) {
                this.items.push(formItem);
            }
            else {
                this.dispatch('santd_formitem_add', formItem);
            }
        }
    },
    template: `
        <form
            class="{{classes}}"
            on-submit="handleSubmit"
        >
            <slot></slot>
        </form>
    `
});

const mixins = {
    validateFieldsAndScroll(ns, opt, cb) {
        const {names, options, callback} = getParams(ns, opt, cb);

        const newCb = (error, values) => {
            if (error !== null) {
                const validNames = this.fieldsStore.getValidFieldsName();

                let firstNode;
                let firstTop;

                validNames.forEach(name => {
                    if (has(error, name)) {
                        let decoratorComponent = this.getDecoratorComponent(name);
                        if (decoratorComponent) {
                            const node = decoratorComponent.el;
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
            else {
                callback(error, values);
            }
        };
        return this.validateFields(names, options, newCb);
    }
};

form.createFormField = createFormField;

form.create = function (options) {
    return createBaseForm({
        ...options,
        fieldNameProps: 'id',
        fieldMetaProp: 'data-__meta',
        fieldDataProp: 'data-__field'
    }, mixins);
};

export default form;
