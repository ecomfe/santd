/**
 * @file Santd timepicker source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Trigger from 'santd/core/trigger';
import Placement from './placements';
import classNames from 'classnames';
import moment from 'moment';
import inherits from 'santd/core/util/inherits';
import Panel from './panel';

const noop = function () {};

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        clearText: DataTypes.string,
        value: DataTypes.object,
        defaultOpenValue: DataTypes.object,
        inputReadOnly: DataTypes.bool,
        disabled: DataTypes.bool,
        allowClear: DataTypes.bool,
        defaultValue: DataTypes.object,
        open: DataTypes.bool,
        defaultOpen: DataTypes.bool,
        align: DataTypes.object,
        popupPlacement: DataTypes.string,
        transitionName: DataTypes.string,
        getPopupContainer: DataTypes.func,
        placeholder: DataTypes.string,
        format: DataTypes.string,
        showHour: DataTypes.bool,
        showMinute: DataTypes.bool,
        showSecond: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.object, DataTypes.string]),
        className: DataTypes.string,
        popupClassName: DataTypes.string,
        popupStyle: DataTypes.object,
        disabledHours: DataTypes.func,
        disabledMinutes: DataTypes.func,
        disabledSeconds: DataTypes.func,
        hideDisabledOptions: DataTypes.bool,
        addon: DataTypes.func,
        name: DataTypes.string,
        autoComplete: DataTypes.string,
        use12Hours: DataTypes.bool,
        hourStep: DataTypes.number,
        minuteStep: DataTypes.number,
        secondStep: DataTypes.number,
        focusOnOpen: DataTypes.bool,
        autoFocus: DataTypes.bool,
        id: DataTypes.string,
        inputIcon: DataTypes.func,
        clearIcon: DataTypes.func
    },
    initData() {
        return {
            clearText: 'clear',
            prefixCls: 'time-picker',
            defaultOpen: false,
            inputReadOnly: false,
            style: {},
            className: '',
            popupClassName: '',
            popupStyle: {},
            id: '',
            align: {},
            defaultOpenValue: moment(),
            allowClear: true,
            showHour: true,
            showMinute: true,
            showSecond: true,
            disabledHours: noop,
            disabledMinutes: noop,
            disabledSeconds: noop,
            hideDisabledOptions: false,
            placement: 'bottomLeft',
            builtinPlacements: Placement,
            action: ['click'],
            popupPlacement: 'bottomLeft',
            use12Hours: false,
            autoFocus: false
        };
    },
    computed: {
        popupVisible() {
            return this.data.get('visible');
        },
        popup() {
            const prefixCls = this.data.get('prefixCls');
            const placeholder = this.data.get('placeholder');
            const disabledHours = this.data.get('disabledHours');
            const disabledMinutes = this.data.get('disabledMinutes');
            const disabledSeconds = this.data.get('disabledSeconds');
            const hideDisabledOptions = this.data.get('hideDisabledOptions');
            const inputReadOnly = this.data.get('inputReadOnly');
            const showHour = this.data.get('showHour');
            const showMinute = this.data.get('showMinute');
            const showSecond = this.data.get('showSecond');
            const defaultOpenValue = this.data.get('defaultOpenValue');
            const clearText = this.data.get('clearText');
            const addon = this.data.get('pickerAddon');
            const use12Hours = this.data.get('use12Hours');
            const focusOnOpen = this.data.get('focusOnOpen');
            const hourStep = this.data.get('hourStep');
            const minuteStep = this.data.get('minuteStep');
            const secondStep = this.data.get('secondStep');
            const clearIcon = this.data.get('clearIcon');
            const value = this.data.get('value');
            const getFormat = this.data.get('getFormat');

            return inherits(san.defineComponent({
                initData() {
                    return {
                        prefixCls: prefixCls + '-panel',
                        placeholder,
                        disabledHours,
                        disabledMinutes,
                        disabledSeconds,
                        hideDisabledOptions,
                        inputReadOnly,
                        showHour,
                        showMinute,
                        showSecond,
                        defaultOpenValue,
                        clearText,
                        addon,
                        use12Hours,
                        focusOnOpen,
                        hourStep,
                        minuteStep,
                        secondStep,
                        clearIcon,
                        format: getFormat,
                        value
                    };
                }
            }), Panel);
        },
        getFormat() {
            const format = this.data.get('format');
            const showHour = this.data.get('showHour');
            const showMinute = this.data.get('showMinute');
            const showSecond = this.data.get('showSecond');
            const use12Hours = this.data.get('use12Hours');
            if (format) {
                return format;
            }

            if (use12Hours) {
                const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
                    .filter(item => !!item)
                    .join(':');

                return fmtString.concat(' a');
            }

            return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
                .filter(item => !!item)
                .join(':');
        },
        displayValue() {
            const value = this.data.get('value');
            const getFormat = this.data.get('getFormat');
            return value && value.format(getFormat);
        },
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const pickerClassName = this.data.get('pickerClassName');
            return classNames(prefixCls, pickerClassName || className);
        },
        getPopupClassName() {
            const showHour = this.data.get('showHour');
            const showMinute = this.data.get('showMinute');
            const showSecond = this.data.get('showSecond');
            const use12Hours = this.data.get('use12Hours');
            const prefixCls = this.data.get('prefixCls');
            const popupClassName = this.data.get('popupClassName');

            let selectColumnCount = 0;

            showHour && selectColumnCount++;
            showMinute && selectColumnCount++;
            showSecond && selectColumnCount++;
            use12Hours && selectColumnCount++;

            return classNames(popupClassName, {
                [`${prefixCls}-panel-narrow`]: (!showHour || !showMinute || !showSecond) && !use12Hours
            }, `${prefixCls}-panel-column-${selectColumnCount}`);
        },
        injectComponent() {
            const instance = this.data.get('instance');
            const inputIcon = this.data.get('inputIcon') || this.data.get('renderInputIcon');
            const clearIcon = this.data.get('clearIcon') || this.data.get('renderClearIcon');
            if (instance) {
                inputIcon && (instance.components.inputicon = inputIcon);
                clearIcon && (instance.components.clearicon = clearIcon);
            }
            return {
                inputIcon,
                clearIcon
            };
        }
    },
    inited() {
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});
        this.data.set('instance', this);

        const open = this.data.get('open');
        const defaultOpen = this.data.get('defaultOpen');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        this.data.set('open', open || defaultOpen);
        this.data.set('value', value || defaultValue);
    },
    components: {
        's-trigger': Trigger
    },
    setOpen(open) {
        this.data.set('open', open);
        this.fire(open ? 'open' : 'close', open);
    },
    setValue(value) {
        this.data.set('value', value);
        if (value) {
            this.handleChange(value);
        }
    },
    handleVisibleChange(visible) {
        this.setOpen(visible);
    },
    handleKeyDown(e) {
        if (e.keyCode === 40) {
            this.setOpen(true);
        }
    },
    handleClear(e) {
        e.stopPropagation();
        this.fire('click');
        this.setValue(null);
        this.setOpen(false);
    },
    handleChange(value) {
        this.data.set('value', value);
        const format = this.data.get('format') || 'HH:mm:ss';

        this.fire('change', {time: value, timeString: value && value.format(format) || ''});
    },
    messages: {
        change(payload) {
            this.data.set('value', payload.value, {force: true});
            this.handleChange(payload.value);
        }
    },
    focus() {
        this.ref('picker').focus();
    },
    blur() {
        this.ref('picker').blur();
    },
    template: `<span>
        <s-trigger
            prefixCls="{{prefixCls}}-panel"
            popupClassName="{{getPopupClassName}}"
            popupStyle="{{popupStyle}}"
            popup="{{popup}}"
            popupAlign="{{align}}"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{popupPlacement}}"
            action="{{disabled ? [] : ['click']}}"
            destroyPopupOnHide
            getPopupContainer="{{getPopupContainer}}"
            popupTransitionName="{{transitionName}}"
            popupVisible="{{open}}"
            on-visibleChange="handleVisibleChange"
        >
            <span class="{{classes}}" style="{{bodyStyle}}">
                <input
                    class="{{prefixCls}}-input"
                    type="text"
                    placeholder="{{placeholder}}"
                    name="{{name}}"
                    value="{{displayValue}}"
                    disabled="{{disabled}}"
                    autoComplete="{{autoComplete}}"
                    autoFocus="{{autoFocus}}"
                    readOnly="{{!!inputReadOnly}}"
                    id="{{id}}"
                    on-keydown="handleKeyDown"
                    s-ref="picker"
                />
                <inputicon s-if="injectComponent.inputIcon" />
                <span class="{{prefixCls}}-icon" s-else />
                <clearicon s-if="injectComponent.clearIcon && !disabled && allowClear" on-click="handleClear"/>
                <template s-else>
                    <a
                        s-if="!disabled && value && allowClear && !disabled"
                        role="button"
                        class="{{prefixCls}}-clear"
                        title="{{clearText}}"
                        tabIndex="0"
                        on-click="handleClear"
                    >
                        <i class="{{prefixCls}}-clear-icon" />
                    </a>
                </template>
        </span>
        </s-trigger>
    </span>`
});
