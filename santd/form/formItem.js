/**
* @file form-item 组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Row from 'santd/row';
import Col from 'santd/col';
import Icon from 'santd/icon';
import {findComponentUpward} from 'santd/core/util/findCompont';
const pagin = classCreator('form');
// const prefixCls = pagin();

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        classname: DataTypes.string,
        id: DataTypes.string,
        label: DataTypes.string,
        labelAlign: DataTypes.oneOf(['left', 'right']),
        labelCol: DataTypes.object,
        wrapperCol: DataTypes.object,
        // help: DataTypes.string,
        extra: DataTypes.string,
        validateStatus: DataTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
        hasFeedback: DataTypes.bool,
        required: DataTypes.bool,
        colon: DataTypes.bool,
        bodyStyle: DataTypes.object,
        prop: DataTypes.string,
        decorator: DataTypes.object
    },
    initData() {
        return {
            validateState: false,
            showMessage: true,
            fieldData: ''
        };
    },
    components: {
        's-row': Row,
        's-col': Col,
        's-icon': Icon
    },
    computed: {
        prefixCls() {
            return this.data.get('prefixCls') || pagin();
        },
        classes() {
            const prefixCls = this.data.get('prefixCls') || pagin();
            const className = this.data.get('className');
            const helpShow = this.data.get('getHelpMessage');
            return classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item-with-help`]: !!helpShow,
                [`${className}`]: !!className
            });
        },
        isRequired() {
            const required = this.data.get('required');
            if (required !== undefined) {
                return required;
            }
            const name = this.data.get('name');
            const form = this.data.get('form');
            const refresh = this.data.get('refresh');
            if (name && form) {
                const fieldMeta = form.data.get('fieldsStore.fieldsMeta')[name] || {};
                const validate = fieldMeta.validate || [];
                return validate
                    .filter(item => !!item.rules)
                    .some(item => item.rules.some(rule => rule.required));
            }
            return false;
        },
        labelClassName() {
            const prefixCls = this.data.get('prefixCls');
            const required = this.data.get('isRequired');
            const colon = this.data.get('colon');
            const formInstance = this.data.get('formInstance');
            const formColon = formInstance && formInstance.data.get('colon');
            const computedColon = formColon !== undefined ? formColon : colon;
            return classNames({
                [`${prefixCls}-item-required`]: required,
                [`${prefixCls}-item-no-colon`]: !computedColon
            });
        },
        labelColClassName() {
            const prefixCls = this.data.get('prefixCls');
            const labelCol = this.data.get('labelCol');
            const labelAlign = this.data.get('labelAlign');
            const formInstance = this.data.get('formInstance');
            const mergedLabelCol = labelCol ? labelCol : (formInstance && formInstance.data.get('labelCol')) || {};
            const labelClsBasic = `${prefixCls}-item-label`;
            const align = labelAlign ? labelAlign : (formInstance && formInstance.data.get('labelAlign'));
            return classNames(
                labelClsBasic,
                align === 'left' && `${labelClsBasic}-left`,
                mergedLabelCol.className
            );
        },
        mergedWrapperCol() {
            const prefixCls = this.data.get('prefixCls');
            const wrapperCol = this.data.get('wrapperCol');
            const formInstance = this.data.get('formInstance');

            return wrapperCol ? wrapperCol : (formInstance && formInstance.data.get('wrapperCol')) || {};
        },
        mergedLabelCol() {
            const prefixCls = this.data.get('prefixCls');
            const labelCol = this.data.get('labelCol');
            const formInstance = this.data.get('formInstance');
            return labelCol ? labelCol : (formInstance && formInstance.data.get('labelCol')) || {};
        },
        wrapperClassName() {
            const prefixCls = this.data.get('prefixCls');
            const mergedWrapperCol = this.data.get('mergedWrapperCol');
            return classNames(`${prefixCls}-item-control-wrapper`, mergedWrapperCol.className);
        },
        getValidateStatus() {
            const name = this.data.get('name');
            const form = this.data.get('form');
            const refresh = this.data.get('refresh');
            if (name && form) {
                const field = form.data.get('fieldsStore.fields')[name] || {};
                const fieldMeta = form.data.get('fieldsStore.fieldsMeta')[name] || {};
                if (field.validating) {
                    return 'validating';
                }
                if (field.errors) {
                    return 'error';
                }
                const fieldValue = 'value' in field ? field.value : fieldMeta.initialValue;
                if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
                    return 'success';
                }
            }
            return '';
        },
        getHelpMessage() {
            const name = this.data.get('name');
            const form = this.data.get('form');
            const help = this.data.get('help');
            const refresh = this.data.get('refresh');
            if (help === undefined && name && form) {
                const field = form.data.get('fieldsStore.fields')[name] || {};
                const fieldMeta = form.data.get('fieldsStore.fieldsMeta')[name] || {};

                const errors = field.errors;
                if (errors) {
                    return errors.map((e, index) => {
                        return e.message;
                    }).reduce((current, item) => [...current, ' ', item], []).slice(1);
                }
                return '';
            }
            return help;
        },
        iconType() {
            const propsValidateStatus = this.data.get('validateStatus');
            const validateStatus = propsValidateStatus === undefined
                ? this.data.get('getValidateStatus')
                : propsValidateStatus;
            let iconType = '';

            switch (validateStatus) {
                case 'success':
                    iconType = 'check-circle';
                    break;
                case 'warning':
                    iconType = 'exclamation-circle';
                    break;
                case 'error':
                    iconType = 'close-circle';
                    break;
                case 'validating':
                    iconType = 'loading';
                    break;
                default:
                    iconType = '';
                    break;
            }

            return iconType;
        },
        validateWrapperClassName() {
            const propsValidateStatus = this.data.get('validateStatus');
            const validateStatus = propsValidateStatus === undefined
                ? this.data.get('getValidateStatus')
                : propsValidateStatus;

            const prefixCls = this.data.get('prefixCls');
            const hasFeedback = this.data.get('hasFeedback');
            let classes = `${prefixCls}-item-control`;
            if (validateStatus) {
                classes = classNames(`${prefixCls}-item-control`, {
                    'has-feedback': hasFeedback || validateStatus === 'validating',
                    'has-success': validateStatus === 'success',
                    'has-warning': validateStatus === 'warning',
                    'has-error': validateStatus === 'error',
                    'is-validating': validateStatus === 'validating'
                });
            }
            return classes;
        }
    },
    attached() {
        let parent = this;
        while (parent && !parent.getFieldDecorator) {
            if (parent.tagName === 'form') {
                this.data.set('formInstance', parent);
            }
            parent = parent.parentComponent;
        }
        this.data.set('parent', parent);
        const children = this.slotChildren[0].children;
        const that = this;
        function dfs(children, callback) {
            children.forEach(item => {
                if (item.nodeType === 5 && item.data.get('decorator')) {
                    callback(item);
                }
                else if (item.slotChildren && item.slotChildren.length) {
                    dfs(item.slotChildren[0].children, callback);
                }
            });
        }
        dfs(children, function (component) {
            that.data.set('decoratorInstance', component);
            const decorator = component.data.get('decorator');
            if (decorator && decorator.name && parent.getFieldDecorator) {
                const props = parent.getFieldDecorator(decorator);
                decorator.name && that.data.set('name', decorator.name);
                decorator.name && component.data.set('name', decorator.name);
                that.data.set('decorator', decorator);
                if ('checked' in props) {
                    component.data.set('checked', props['checked']);
                }
                else if ('value' in props && props['value']) {
                    component.data.set('value', props['value']);
                }
            }
        });
        this.dispatch('attachFormItem', this);
        const decoratorInstance = this.data.get('decoratorInstance');
        this.watch('form', val => {
            const prevValue = decoratorInstance && decoratorInstance.data.get('value');
            const name = decoratorInstance && decoratorInstance.data.get('decorator.name');
            const form = this.data.get('form');
            const fieldsStore = form && form.data.get('fieldsStore');
            if (name && fieldsStore) {
                const value = fieldsStore.getFieldValue(name);
                if (value !== prevValue && value) {
                    decoratorInstance.data.set('value', value);
                }
            }
        });
        if (decoratorInstance) {
            decoratorInstance.watch('decorator', val => {
                if (val) {
                    parent.getFieldDecorator(val);
                    that.data.set('decorator', val);
                    this.data.set('form', this.data.get('form'), {force: true});
                    // this.data.set('refresh', Math.random());
                }
            });
        }
    },
    detached() {
        this.dispatch('removeFormItem', this);
    },
    messages: {
        'UI:form-item-interact'(item) {
            const decorator = this.data.get('decorator') || {};
            this.dispatch('formChange', {
                name: decorator.name,
                value: item.value.fieldValue,
                action: item.value.type
            });
        }
    },
    template: `
        <div key="row" class="{{classes}}" style="{{bodyStyle}}">
            <s-row>
                <s-col
                    s-if="label"
                    class="{{labelColClassName}}"
                    s-bind="{{mergedLabelCol}}"
                ><label
                    htmlFor="{{id}}"
                    title="{{label}}"
                    class="{{labelClassName}}"
                >{{label}}</label></s-col>
                <s-col
                    s-bind="{{mergedWrapperCol}}"
                    class="{{wrapperClassName}}"
                >
                    <div class="{{validateWrapperClassName}}">
                        <div className="{{prefixCls + '-item-children'}}">
                            <slot></slot>
                            <span
                                s-if="hasFeedback && iconType"
                                class="{{prefixCls + '-item-children-icon'}}"
                            ><s-icon
                                type="{{iconType}}"
                                theme="{{iconType === 'loading' ? 'outlined' : 'filled'}}"
                            ></s-icon></span>
                        </div>
                        <div
                            s-if="getHelpMessage"
                            class="{{prefixCls + '-explain'}}"
                            key="help"
                        >{{getHelpMessage}}</div>
                        <div
                            s-if="extra"
                            class="{{prefixCls + '-extra'}}"
                        >{{extra}}</div>
                    </div>
                </s-col>
            </s-row>
        </div>
    `
});
