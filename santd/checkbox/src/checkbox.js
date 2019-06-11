/**
 * @file Santd checkbox file
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

export default san.defineComponent({
    DataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        style: DataTypes.object,
        name: DataTypes.string,
        id: DataTypes.string,
        type: DataTypes.string,
        defaultChecked: DataTypes.oneOfType([DataTypes.number, DataTypes.bool]),
        checked: DataTypes.oneOfType([DataTypes.number, DataTypes.bool]),
        disabled: DataTypes.bool,
        tabIndex: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        readOnly: DataTypes.bool,
        autoFocus: DataTypes.bool,
        value: DataTypes.any
    },
    initData() {
        return {
            prefixCls: 'checkbox',
            className: '',
            style: {},
            type: 'checkbox',
            defaultChecked: false
        };
    },
    inited() {
        const checked = this.data.get('checked');
        this.data.set('checked', checked || this.data.get('defaultChecked'));
    },
    computed: {
        classes() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');

            return classNames(prefixCls, className, {
                [`${prefixCls}-checked`]: checked,
                [`${prefixCls}-disabled`]: disabled
            });
        }
    },
    focus() {
        const input = this.ref('input');
        input.focus();
    },
    blur() {
        const input = this.ref('input');
        input.blur();
    },
    handleClick(e) {
        this.fire('click', e);
    },
    handleFocus(e) {
        this.fire('focus', e);
    },
    handleBlur(e) {
        this.fire('blur', e);
    },
    handleChange(e) {
        if (this.data.get('disabled')) {
            return;
        }
        let checked = e.target.checked;
        if (checked === this.data.get('checked')) {
            checked = !checked;
        }
        this.data.set('checked', checked);
        this.fire('change', {
            target: {
                ...this.data.get(),
                checked
            },
            stopPropagation() {
                e.stopPropagation();
            },
            preventDefault() {
                e.preventDefault();
            },
            nativeEvent: e.nativeEvent
        });
    },
    template: `
        <span class="{{classes}}" style="{{style}}">
            <input
                name="{{name}}"
                id="{{id}}"
                type="{{type}}"
                checked="{{checked}}"
                readonly="{{readOnly}}"
                disabled="{{disabled}}"
                tabindex="{{tabIndex}}"
                class="{{prefixCls}}-input"
                on-click="handleClick"
                on-focus="handleFocus"
                on-blur="handleBlur"
                on-change="handleChange"
                autofocus="{{autoFocus}}"
                s-ref="input"
                value="{{value}}"
            />
            <span class="{{prefixCls}}-inner" />
        </span>
    `
});
