/**
* @file form-item 组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Row from '../row';
import Col from '../col';
import Icon from '../icon';
const prefixCls = classCreator('form')();

// 遍历子找到含有decorator的组件，拿到decorator的数据
function findDecoratorComponent(data, result = []) {
    data.forEach(item => {
        if (item.nodeType === 5 && item.data.get('decorator')) {
            result.push(item);
        }
        if (item.children && item.children.length) {
            findDecoratorComponent(item.children, result);
        }
    });
    return result;
}

export default san.defineComponent({
    dataTypes: {
        id: DataTypes.string,
        label: DataTypes.string,
        labelAlign: DataTypes.oneOf(['left', 'right']),
        labelCol: DataTypes.object,
        wrapperCol: DataTypes.object,
        help: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        extra: DataTypes.string,
        validateStatus: DataTypes.oneOf(['success', 'warning', 'error', 'validating', '']),
        hasFeedback: DataTypes.bool,
        required: DataTypes.bool,
        colon: DataTypes.bool,
        prop: DataTypes.string,
        decorator: DataTypes.object,
        htmlFor: DataTypes.string
    },
    initData() {
        return {
            validateState: false,
            showMessage: true,
            fieldData: '',
            labelCol: {},
            wrapperCol: {}
        };
    },
    inited() {
        this.data.set('hasLabel', !!this.sourceSlots.named.label || this.data.get('label'));
        this.data.set('hasExtra', !!this.sourceSlots.named.extra || this.data.get('extra'));
        this.data.set('hasHelpSlot', !!this.sourceSlots.named.help);
    },
    components: {
        's-row': Row,
        's-col': Col,
        's-icon': Icon
    },
    computed: {
        isRequired() {
            const required = this.data.get('required');
            if (required !== undefined) {
                return required;
            }
            const name = this.data.get('name');
            const form = this.data.get('form');
            if (name && form) {
                const fieldMeta = form.fieldsStore.getFieldMeta(name) || {};
                const validate = fieldMeta.validate || [];
                return validate
                    .filter(item => !!item.rules)
                    .some(item => item.rules.some(rule => rule.required));
            }
            return false;
        },
        labelClassName() {
            const required = this.data.get('isRequired');
            const colon = this.data.get('colon');
            let classArr = [];
            required && classArr.push(`${prefixCls}-item-required`);
            !colon && classArr.push(`${prefixCls}-item-no-colon`);
            return classArr;
        },
        getValidateStatus() {
            const name = this.data.get('name');
            const form = this.data.get('form');
            if (name && form) {
                const field = form.fieldsStore.getField(name) || {};
                const fieldMeta = form.fieldsStore.getFieldMeta(name) || {};
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
            if (help === undefined && name && form) {
                const field = form.fieldsStore.getField(name) || {};

                const errors = field.errors;
                if (errors) {
                    return errors.map(e => e.message)
                        .reduce((current, item) => [...current, ' ', item], []).slice(1);
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

            const hasFeedback = this.data.get('hasFeedback');
            let classes = prefixCls + '-item-control';
            if (validateStatus) {
                let classArr = [`${prefixCls}-item-control`];
                (hasFeedback || validateStatus === 'validating') && classArr.push('has-feedback');
                validateStatus === 'success' && classArr.push('has-success');
                validateStatus === 'warning' && classArr.push('has-warning');
                validateStatus === 'error' && classArr.push('has-error');
                validateStatus === 'validating' && classArr.push('is-validating');
                return classArr;
            }
            return classes;
        }
    },
    attached() {
        let children = this.slotChildren;
        let decoratorComponents = findDecoratorComponent(children);

        this.data.set('decoratorComponents', decoratorComponents);
        // decorators有可能有多个，这里只写入第一个的name，否则没有办法做样式上的处理
        decoratorComponents[0] && this.data.set('name', decoratorComponents[0].data.get('decorator.name'));

        // 把当前的formitem给form去做处理
        this.dispatch('santd_formitem_add', this);
    },
    detached() {
        this.dispatch('santd_formitem_remove', this);
    },
    messages: {
        'UI:form-item-interact'(item) {
            let decoratorComponents = this.data.get('decoratorComponents') || [];
            decoratorComponents.forEach(decoratorComponent => {
                if (item.target === decoratorComponent) {
                    this.dispatch('santd_form_change', {
                        name: decoratorComponent.data.get('decorator').name,
                        value: item.value.fieldValue,
                        action: item.value.type,
                        e: item.value.e
                    });
                }
            });
        }
    },
    template: `
        <div key="row" class="${prefixCls}-item {{getHelpMessage || hasHelpSlot ? '${prefixCls}-item-with-help' : ''}}">
            <s-row>
                <s-col
                    s-if="hasLabel"
                    class="${prefixCls}-item-label {{labelAlign === 'left' ? '${prefixCls}-item-label-left' : ''}}"
                    s-bind="{{labelCol || {}}}"
                >
                    <label htmlFor="{{id || htmlFor}}" title="{{hasLabel ? label || '' : ''}}" class="{{labelClassName}}">
                        <slot name="label" s-if="!label" />
                        <template s-else>{{label}}</template>
                    </label>
                </s-col>
                <s-col s-bind="{{wrapperCol || {}}}" class="${prefixCls}-item-control-wrapper">
                    <div class="{{validateWrapperClassName}}">
                        <div class="${prefixCls}-item-children">
                            <slot />
                            <span s-if="hasFeedback && iconType" class="${prefixCls}-item-children-icon">
                                <s-icon type="{{iconType}}" theme="{{iconType === 'loading' ? 'outlined' : 'filled'}}" />
                            </span>
                        </div>
                        <div s-if="getHelpMessage || hasHelpSlot" class="${prefixCls}-explain" key="help">
                            <slot name="help" s-if="hasHelpSlot" />
                            <template s-else>{{getHelpMessage}}</template>
                        </div>
                        <div s-if="hasExtra" class="${prefixCls}-extra">
                            <slot name="extra" s-if="!extra" />
                            <template s-else>{{extra}}</template>
                        </div>
                    </div>
                </s-col>
            </s-row>
        </div>
    `
});
