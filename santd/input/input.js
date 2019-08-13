/**
* @file input 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';
import BaseInput from './base';
import Icon from '../icon';
const pagin = classCreator('input');
const prefixCls = pagin();

// 前置、后置标签
const addon = `
<span class="{{groupClasses}}">
    <span class="{{className}}">
        <span class="{{addonClassName}}" s-if="{{addonBefore}}" s-ref="addonBefore">
            {{addonBefore}}
        </span>
        <s-base-input
            size="{{size}}"
            s-bind="{{_INPUTPROPS}}"
            value="{{value}}"
        ></s-base-input>
        <span class="{{addonClassName}}" s-if="{{addonAfter}}" s-ref="addonAfter">
            {{addonAfter}}
        </span>
    </span>
</span>
`;
const presuffix = `
<span class="{{fixClass}}">
    <span class="${prefixCls}-prefix" s-if="{{prefix}}" s-ref="prefix">
    </span>
    <s-base-input
        size="{{size}}"
        s-bind="{{_INPUTPROPS}}"
        value="{{value}}"
    ></s-base-input>
    <span class="${prefixCls}-suffix" s-if="{{suffix}}" s-ref="suffix">
    </span>
</span>
`;

const AddonRenderer = san.defineComponent({
    components: {
        's-base-input': BaseInput
    },
    computed: {
        groupClasses() {
            const size = this.data.get('sizeMap')[this.data.get('size')];
            let classArr = [`${prefixCls}-group-wrapper`];
            size && classArr.push(`${prefixCls}-group-wrapper-${size}`);
            return classArr;
        },
        className() {
            return [`${prefixCls}-wrapper`, `${prefixCls}-group`];
        },
        addonClassName() {
            return [`${prefixCls}-group-addon`];
        }
    },
    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    messages: {
        inputChange(data) {
            this.dispatch('inputChange', data.value);
        }
    },
    attached() {
        const {addonBefore, addonAfter} = this.data.get();
        if (addonBefore && typeof addonBefore === 'function') {
            this.ref('addonBefore').innerHTML = '';
            let renderer = addonBefore();
            renderer.attach(this.ref('addonBefore'));
        }
        if (addonAfter && typeof addonAfter === 'function') {
            this.ref('addonAfter').innerHTML = '';
            let renderer = addonAfter();
            renderer.attach(this.ref('addonAfter'));
        }
    },
    template: addon
});

const PresuffixRenderer = san.defineComponent({
    components: {
        's-base-input': BaseInput
    },
    computed: {
        fixClass() {
            const size = this.data.get('sizeMap')[this.data.get('size')];
            let classArr = [`${prefixCls}-affix-wrapper`];
            size && classArr.push(`${prefixCls}-affix-wrapper-${size}`);
            return classArr;
        }
    },
    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    messages: {
        inputChange(data) {
            this.dispatch('inputChange', data.value);
        }
    },
    attached() {
        const {prefix, suffix} = this.data.get();
        let renderer;
        if (prefix && typeof prefix === 'function') {
            renderer = prefix();
            renderer.attach(this.ref('prefix'));
        }
        if (suffix && typeof suffix === 'function') {
            renderer = suffix();
            renderer.attach(this.ref('suffix'));
        }
    },
    template: presuffix
});

export default san.defineComponent({
    dataTypes: {
        addonAfter: DataTypes.oneOfType([DataTypes.string, DataTypes.instanceOf(Object)]),
        addonBefore: DataTypes.oneOfType([DataTypes.string, DataTypes.instanceOf(Object)]),
        prefix: DataTypes.oneOfType([DataTypes.string, DataTypes.instanceOf(Object)]),
        suffix: DataTypes.oneOfType([DataTypes.string, DataTypes.instanceOf(Object)]),
        defaultValue: DataTypes.any,
        placeholder: DataTypes.string,
        disabled: DataTypes.bool,
        inputType: DataTypes.oneOf(['inputGroup', 'inputFix']),
        id: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        size: DataTypes.oneOf(['large', 'default', 'small']),
        type: DataTypes.string,
        value: DataTypes.any
    },
    components: {
        's-base-input': BaseInput,
        's-icon': Icon,
        'a-addonrenderer': AddonRenderer,
        'a-presuffix': PresuffixRenderer
    },
    computed: {
        closeAllow() {
            const couldClear = this.data.get('couldClear');
            return couldClear ? [`${prefixCls}-affix-wrapper`] : '';
        }
    },
    inited() {
        this.watch('value', value => {
            this.setBindData();
        });
        this.watch('placeholder', value => {
            this.setBindData();
        });
    },
    created() {
        const defaultValue = this.data.get('defaultValue');
        const value = this.data.get('value');
        const stateValue = value ? value : (defaultValue ? defaultValue : '');
        this.setBindData();
        this.data.set('value', stateValue);
    },
    initData() {
        return {
            placeholder: '',
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },
    messages: {
        inputChange(item) {
            const value = item.value;
            const allow = this.data.get('allowClear');
            if (value && allow) {
                this.data.set('couldClear', true);
            } else {
                this.data.set('couldClear', false);
            }
            this.inputComponent = item.target;

            this.data.set('value', item.value);
            this.fire('change', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
        },
        // 接收input-enter
        pressEnter(item) {
            this.fire('pressEnter', item.value);
        },
        inputBlur(item) {
            this.fire('blur', item.value);
            this.dispatch('formBlur', item.value);
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'blur'});
        }
    },
    handleIconClear() {
        this.inputComponent.el.value = '';
    },
    setBindData() {
        const allData = Object.assign({}, this.data.get());
        delete allData.size;
        delete allData.style;
        this.data.set('_INPUTPROPS', allData);
    },
    template: `
    <span class="{{closeAllow}}">
        <a-addonrenderer s-if="addonBefore || addonAfter" s-bind="{{_INPUTPROPS}}"></a-addonrenderer>
        <a-presuffix s-else-if="prefix || suffix" s-bind="{{_INPUTPROPS}}"></a-presuffix>
        <s-base-input size="{{size}}" s-else s-bind="{{_INPUTPROPS}}"></s-base-input>
        <span
            class="${prefixCls}-suffix"
            s-if="couldClear"
            on-click="handleIconClear"
        >
            <s-icon type="close-circle"></s-icon>
        </span>
    </span>`

});
