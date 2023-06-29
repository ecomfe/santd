/**
* @file form 组件
* @author fuqiangqiang@baidu.com
*/

import Base from 'santd/base';
import {classCreator} from '../core/util';
import createFormField from './src/createFormField';
import scrollIntoView from 'dom-scroll-into-view';
import createBaseForm, {BaseForm} from './src/createBaseForm';
import {getParams, getScrollableContainer} from './src/utils';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import './style/index';
import {
    FormProps as Props,
    FormState as State,
    FormComputed as Computed,
    FormCreateOptions,
    ValidateFieldsOptions,
    Mixins,
    ValidateFieldsCb
} from './interface';
import FormItem , {TFormItem} from './FormItem';
import {FieldsStore} from './src/createFieldsStore';

type Messags = {
    'santd_formitem_add': (this: Form, payload: {value: FormItem}) => void;
};

interface DiffComponent {
    fieldsStore?: FieldsStore;
    parentComponent: DiffComponent;
}

const prefixCls = classCreator('form')();

const mixins: Mixins<BaseForm> = {
    validateFieldsAndScroll(ns, opt, cb) {
        const {names, options, callback} = getParams(ns, opt, cb);

        const newCb: ValidateFieldsCb = (error, values) => {
            if (error !== null) {
                const validNames: string[] = this.fieldsStore.getValidFieldsName();

                let firstNode: Element | undefined;
                let firstTop: number | undefined;

                validNames.forEach(name => {
                    if (has(error, name)) {
                        let decoratorComponent = this.getDecoratorComponent(name);
                        if (decoratorComponent) {
                            const node = decoratorComponent.el as Element & {type?: string};
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
            else {
                callback && callback(error, values);
            }
        };
        return this.validateFields(names, options, newCb);
    }
};

class Form extends Base<State, Props, Computed> {
    static computed: Computed = {
        classes(this: Form) {
            const layout = this.data.get('layout');
            const hideRequiredMark = this.data.get('hideRequiredMark');
            let classArr = [prefixCls];

            layout === 'horizontal' && classArr.push(`${prefixCls}-horizontal`);
            layout === 'vertical' && classArr.push(`${prefixCls}-vertical`);
            layout === 'inline' && classArr.push(`${prefixCls}-inline`);
            hideRequiredMark && classArr.push(`${prefixCls}-hide-required-mark`);
            return classArr;
        }
    };

    static messages: Messags = {
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
    };

    static template = `
        <form
            class="{{classes}}"
            on-submit="handleSubmit"
        >
            <slot></slot>
        </form>
    `;

    static FormItem: TFormItem;

    static createFormField = createFormField;

    static create = function <DataT extends {} = {}, OptionsT extends {} = {}>(options: FormCreateOptions) {
        return createBaseForm<DataT, OptionsT>({
            ...options,
            fieldNameProps: 'id',
            fieldMetaProp: 'data-__meta',
            fieldDataProp: 'data-__field'
        }, mixins);
    };
    // 待补充
    form!: Form;
    items!: FormItem[];

    initData(): State {
        return {
            colon: true,
            layout: 'horizontal',
            hideRequiredMark: false,
            labelAlign: 'right'
        };
    }

    inited() {
        this.items = [];
    }

    handleSubmit(e: Event) {
        this.fire('submit', e);
    }

    setFormProps(formItem: FormItem) {
        const labelAlign = formItem.data.get('labelAlign') || this.data.get('labelAlign');
        let labelCol = formItem.data.get('labelCol');
        isEmpty(labelCol) && (labelCol = this.data.get('labelCol') as NonNullable<Props['labelCol']>);
        let wrapperCol = formItem.data.get('wrapperCol');
        isEmpty(wrapperCol) && (wrapperCol = this.data.get('wrapperCol') as NonNullable<Props['wrapperCol']>);
        const colon = formItem.data.get('colon') || this.data.get('colon');

        formItem.data.set('labelAlign', labelAlign);
        formItem.data.set('labelCol', labelCol);
        formItem.data.set('wrapperCol', wrapperCol);
        formItem.data.set('colon', colon);
    }

    updated() {
        this.items.forEach(item => {
            const form = this.form || this;
            item.data.set('form', {...form});
        });
    }

    attached() {
        this.updated();
        this.dispatch('santd_form_add', this);
    }

    getForm() {
        let component = this.parentComponent as DiffComponent;
        let form;
        while (component) {
            if (component.fieldsStore) {
                form = component;
                break;
            }
            component = component.parentComponent;
        }
        return form as unknown as Form;
    }
}

export default Form;
