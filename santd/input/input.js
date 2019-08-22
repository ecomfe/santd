/**
* @file input 输入框组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';
import BaseInput from './base';
import Icon from '../icon';
const prefixCls = classCreator('input')();

// 前置、后置标签
const addon = `
<span class="{{groupClasses}}">
    <span class="${prefixCls}-wrapper ${prefixCls}-group">
        <span class="${prefixCls}-group-addon" s-if="{{addonBefore}}" s-ref="addonBefore">
            {{addonBefore}}
        </span>
        <s-base-input
            value="{{value}}"
            size="{{size}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            disabled="{{disabled}}"
            readOnly="{{readOnly}}"
            tabIndex="{{tabIndex}}"
            className="{{className}}"
            autoComplete="{{autoComplete}}"
            autoFocus="{{autoFocus}}"
            prefixCls="${prefixCls}"
        />
        <span class="${prefixCls}-group-addon" s-if="{{addonAfter}}" s-ref="addonAfter">
            {{addonAfter}}
        </span>
    </span>
</span>
`;
const presuffix = `
<span class="{{fixClass}}">
    <span class="${prefixCls}-prefix" s-if="{{prefix}}" s-ref="prefix">{{prefixString}}</span>
    <s-base-input
        value="{{value}}"
        size="{{size}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        disabled="{{disabled}}"
        readOnly="{{readOnly}}"
        tabIndex="{{tabIndex}}"
        className="{{className}}"
        autoComplete="{{autoComplete}}"
        autoFocus="{{autoFocus}}"
        prefixCls="${prefixCls}"
    />
    <span class="${prefixCls}-suffix" s-if="{{suffix}}" s-ref="suffix">{{suffixString}}</span>
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
        else if (typeof prefix === 'string') {
            this.data.set('prefixString', prefix);
        }
        if (suffix && typeof suffix === 'function') {
            renderer = suffix();
            renderer.attach(this.ref('suffix'));
        }
        else if (typeof suffix === 'string') {
            this.data.set('suffixString', suffix);
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
    created() {
        const defaultValue = this.data.get('defaultValue');
        const value = this.data.get('value');
        this.data.set('value', value || defaultValue || '');
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

            this.data.set('couldClear', !!(value && allow));
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
            this.dispatch('UI:form-item-interact', {fieldValue: item.value, type: 'blur'});
        }
    },
    handleIconClear() {
        this.data.set('value', '');
    },
    template: `<span class="{{couldClear ? '${prefixCls}-affix-wrapper' : ''}}">
        <a-addonrenderer
            s-if="{{addonBefore || addonAfter}}"
            addonAfter="{{addonAfter}}"
            addonBefore="{{addonBefore}}"
            value="{{value}}"
            size="{{size}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            disabled="{{disabled}}"
            readOnly="{{readOnly}}"
            tabIndex="{{tabIndex}}"
            className="{{className}}"
            autoComplete="{{autoComplete}}"
            autoFocus="{{autoFocus}}"
        ></a-addonrenderer>
        <a-presuffix
            s-else-if="{{prefix || suffix}}"
            prefix="{{prefix}}"
            suffix="{{suffix}}"
            value="{{value}}"
            disabled="{{disabled}}"
            size="{{size}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            readOnly="{{readOnly}}"
            tabIndex="{{tabIndex}}"
            className="{{className}}"
            autoComplete="{{autoComplete}}"
            autoFocus="{{autoFocus}}"
        ></a-presuffix>
        <s-base-input
            s-else
            size="{{size}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            disabled="{{disabled}}"
            size="{{size}}"
            readOnly="{{readOnly}}"
            tabIndex="{{tabIndex}}"
            className="{{className}}"
            autoComplete="{{autoComplete}}"
            autoFocus="{{autoFocus}}"
            prefixCls="${prefixCls}"
        />
        <span
            class="${prefixCls}-suffix"
            s-if="{{couldClear}}"
            on-click="handleIconClear"
        >
            <s-icon type="close-circle"></s-icon>
        </span>
    </span>`

});
