/**
 * @file Santd timepicker source file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Trigger from '../../core/trigger';
import Placement from './placements';
import moment from 'moment';
import inherits from '../../core/util/inherits';
import Panel from './panel';
import Icon from '../../icon';

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
        timePlaceholder: DataTypes.string,
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
            const placeholder = this.data.get('timePlaceholder');
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
            return [prefixCls, pickerClassName || className];
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
            let classArr = [popupClassName, `${prefixCls}-panel-column-${selectColumnCount}`];
            (!showHour || !showMinute || !showSecond) && !use12Hours && classArr.push(`${prefixCls}-panel-narrow`);
            return classArr.join(' ');
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

        this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
        this.data.set('hasClearIcon', !!this.sourceSlots.named.clearIcon);
    },
    components: {
        's-trigger': Trigger,
        's-icon': Icon,
        's-panel': Panel
    },
    setOpen(open) {
        console.log(open);
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
        this.dispatch('UI:form-item-interact', {fieldValue: '', type: 'change'});
    },
    handleChange(value) {
        this.data.set('value', value);
        const format = this.data.get('format') || 'HH:mm:ss';

        this.fire('change', {time: value, timeString: value && value.format(format) || ''});
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
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
            popupAlign="{{align}}"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{popupPlacement}}"
            action="{{disabled ? [] : ['click']}}"
            destroyPopupOnHide
            getPopupContainer="{{getPopupContainer}}"
            popupTransitionName="{{transitionName}}"
            visible="{{open}}"
            on-visibleChange="handleVisibleChange"
        >
            <span class="{{classes}}" style="{{bodyStyle}}">
                <input
                    class="{{prefixCls}}-input"
                    type="text"
                    placeholder="{{timePlaceholder}}"
                    name="{{name}}"
                    value="{{displayValue}}"
                    disabled="{{disabled}}"
                    autoComplete="{{autoComplete}}"
                    readOnly="{{!!inputReadOnly}}"
                    id="{{id}}"
                    on-keydown="handleKeyDown"
                    s-ref="picker"
                />
                <span class="{{prefixCls}}-icon">
                    <slot name="suffixIcon" s-if="hasSuffixIcon" />
                    <s-icon s-else type="clock-circle" class="{{prefixCls}}-clock-icon" />
                </span>
                <template s-if="!disabled && allowClear && value">
                    <slot name="clearIcon" s-if="hasClearIcon" />
                    <s-icon s-else type="close-circle" class="{{prefixCls}}-clear" theme="filled" on-click="handleClear"/>
                </template>
            </span>
            <s-panel
                slot="popup"
                prefixCls="{{prefixCls + '-panel'}}"
                placeholder="{{placeholder}}"
                disabledHours="{{disabledHours}}"
                disabledMinutes="{{disabledMinutes}}"
                disabledSeconds="{{disabledSeconds}}"
                hideDisabledOptions="{{hideDisabledOptions}}"
                inputReadOnly="{{inputReadOnly}}"
                showHour="{{showHour}}"
                showMinute="{{showMinute}}"
                showSecond="{{showSecond}}"
                defaultOpenValue="{{defaultOpenValue}}"
                clearText="{{clearText}}"
                addon="{{addon}}"
                use12Hours="{{use12Hours}}"
                focusOnOpen="{{focusOnOpen}}"
                hourStep="{{hourStep}}"
                minuteStep="{{minuteStep}}"
                secondStep="{{secondStep}}"
                clearIcon="{{clearIcon}}"
                format="{{getFormat}}"
                value="{{value}}"
            />
        </s-trigger>
    </span>`
});
