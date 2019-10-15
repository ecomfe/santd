/**
 * @file 组件 timepicker
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Trigger from '../core/trigger';
import Placement from './placements';
import moment from 'moment';
import Panel from './panel';
import Icon from '../icon';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('time-picker')();
const noop = function () {};

export default san.defineComponent({
    dataTypes: {
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
        popupClassName: DataTypes.string,
        popupStyle: DataTypes.object,
        disabledHours: DataTypes.func,
        disabledMinutes: DataTypes.func,
        disabledSeconds: DataTypes.func,
        hideDisabledOptions: DataTypes.bool,
        name: DataTypes.string,
        autoComplete: DataTypes.string,
        use12Hours: DataTypes.bool,
        hourStep: DataTypes.number,
        minuteStep: DataTypes.number,
        secondStep: DataTypes.number,
        focusOnOpen: DataTypes.bool,
        autoFocus: DataTypes.bool,
        id: DataTypes.string
    },
    initData() {
        return {
            clearText: 'clear',
            defaultOpen: false,
            inputReadOnly: false,
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
            builtinPlacements: Placement,
            action: ['click'],
            popupPlacement: 'bottomLeft',
            use12Hours: false,
            autoFocus: false,
            transitionName: 'slide-up',
            componentName: 'TimePicker'
        };
    },
    computed: {
        ...localeReceiver.computed,
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
        getPopupClassName() {
            const showHour = this.data.get('showHour');
            const showMinute = this.data.get('showMinute');
            const showSecond = this.data.get('showSecond');
            const use12Hours = this.data.get('use12Hours');
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
        defaultFormat() {
            const format = this.data.get('format');
            const use12Hours = this.data.get('use12Hours');
            if (format) {
                return format;
            }
            else if (use12Hours) {
                return 'h:mm:ss a';
            }
            return 'HH:mm:ss';
        },
        showHour() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('m') > -1;
        },
        showSecond() {
            const format = this.data.get('defaultFormat');
            return format.indexOf('s') > -1;
        }
    },
    inited() {
        const open = this.data.get('open');
        const defaultOpen = this.data.get('defaultOpen');
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');

        localeReceiver.inited.bind(this)();
        this.data.set('open', open || defaultOpen);
        this.data.set('value', value || defaultValue);

        this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
        this.data.set('hasClearIcon', !!this.sourceSlots.named.clearIcon);
        this.data.set('hasAddon', !!this.sourceSlots.named.addon);
    },
    components: {
        's-trigger': Trigger,
        's-icon': Icon,
        's-panel': Panel
    },
    setValue(value) {
        this.data.set('value', value);
        if (value) {
            this.handleChange(value);
        }
    },
    handleVisibleChange(visible) {
        this.data.set('open', visible);
        this.fire('openChange', visible);
    },
    handleKeyDown(e) {
        if (e.keyCode === 40) {
            this.handleVisibleChange(true);
        }
    },
    handleClear(e) {
        e.stopPropagation();
        this.fire('click');
        this.setValue(null);
        this.handleVisibleChange(false);
        this.dispatch('UI:form-item-interact', {fieldValue: '', type: 'change'});
    },
    handleChange(value) {
        this.data.set('value', value.clone());
        const format = this.data.get('format') || 'HH:mm:ss';

        this.fire('change', {time: value, timeString: value && value.format(format) || ''});
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
    },
    focus() {
        this.ref('picker').focus();
    },
    blur() {
        this.ref('picker').blur();
    },
    template: `<span>
        <s-trigger
            popupClassName="{{getPopupClassName}}"
            popupStyle="{{popupStyle}}"
            popupAlign="{{align}}"
            builtinPlacements="{{builtinPlacements}}"
            popupPlacement="{{popupPlacement}}"
            action="{{disabled ? [] : action}}"
            destroyPopupOnHide
            getPopupContainer="{{getPopupContainer}}"
            popupTransitionName="{{transitionName}}"
            visible="{{open}}"
            on-visibleChange="handleVisibleChange"
        >
            <span class="${prefixCls} {{size ? '${prefixCls}-' + size : ''}}">
                <input
                    class="${prefixCls}-input"
                    type="text"
                    placeholder="{{placeholder || locale.placeholder}}"
                    name="{{name}}"
                    value="{{displayValue}}"
                    disabled="{{disabled}}"
                    autoComplete="{{autoComplete}}"
                    readOnly="{{!!inputReadOnly}}"
                    id="{{id}}"
                    on-keydown="handleKeyDown"
                    s-ref="picker"
                />
                <span class="${prefixCls}-icon">
                    <slot name="suffixIcon" s-if="hasSuffixIcon" />
                    <s-icon s-else type="clock-circle" class="${prefixCls}-clock-icon" />
                </span>
                <template s-if="!disabled && allowClear && value">
                    <slot name="clearIcon" s-if="hasClearIcon" />
                    <s-icon s-else type="close-circle" class="${prefixCls}-clear" theme="filled" on-click="handleClear"/>
                </template>
            </span>
            <s-panel
                slot="popup"
                prefixCls="${prefixCls}-panel"
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
                use12Hours="{{use12Hours}}"
                focusOnOpen="{{focusOnOpen}}"
                hourStep="{{hourStep}}"
                minuteStep="{{minuteStep}}"
                secondStep="{{secondStep}}"
                format="{{getFormat}}"
                value="{{value}}"
                hasAddon="{{hasAddon}}"
                on-change="handleChange"
            >
                <slot name="addon" slot="addon" />
            </s-panel>
        </s-trigger>
    </span>`
});
