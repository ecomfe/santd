/**
 * @file 组件 timepicker
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import {classCreator} from '../core/util';
import Trigger from '../core/trigger';
import Placement from './placements';
import dayjs from 'dayjs';
import Panel from './Panel';
import Icon from '../icon';
import localeReceiver from '../locale-provider/receiver';
import type {Props, State, Computed} from './interface';
import Base from 'santd/base';

const prefixCls = classCreator('time-picker')();
const noop = function () {};
export default class TimePicker extends Base<Props, State, Computed> {
    initData(){
        return {
            clearText: 'clear',
            defaultOpen: false,
            inputReadOnly: false,
            popupClassName: '',
            popupStyle: {},
            id: '',
            align: {},
            defaultOpenValue: dayjs(),
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
    }
    static computed: Computed = {
        ...localeReceiver.computed,
        getFormat(this: TimePicker) {
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
        displayValue(this: TimePicker) {
            const value = this.data.get('value');
            const getFormat = this.data.get('getFormat');
            return value && value.format(getFormat);
        },
        getPopupClassName(this: TimePicker) {
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
        defaultFormat(this: TimePicker) {
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
        showHour(this: TimePicker) {
            const format = this.data.get('defaultFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute(this: TimePicker) {
            const format = this.data.get('defaultFormat');
            return format.indexOf('m') > -1;
        },
        showSecond(this: TimePicker) {
            const format = this.data.get('defaultFormat');
            return format.indexOf('s') > -1;
        }
    }
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
    }
    static components = {
        's-trigger': Trigger,
        's-icon': Icon,
        's-panel': Panel
    }
    setValue(value: dayjs.Dayjs | null) {
        this.data.set('value', value);
        if (value) {
            this.handleChange(value);
        }
    }
    handleVisibleChange(visible: boolean) {
        this.data.set('open', visible);
        this.fire('openChange', visible);
    }
    handleKeyDown(e: { keyCode: number; preventDefault: () => void; }) {
        if (e.keyCode === 40) {
            this.handleVisibleChange(true);
        }
    }
    handleClear(e: Event) {
        e.stopPropagation();
        this.fire('click');
        this.setValue(null);
        this.handleVisibleChange(false);
        this.dispatch('UI:form-item-interact', {fieldValue: '', type: 'change', e});
    }
    handleChange(value: dayjs.Dayjs) {
        this.data.set('value', value);
        const format = this.data.get('format') || 'HH:mm:ss';

        this.fire('change', {time: value, timeString: value && (value.format(format)) || ''});
        this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
    }
    focus() {
        (this.ref('picker') as unknown as HTMLInputElement).focus();
    }
    blur() {
        (this.ref('picker') as unknown as HTMLInputElement).blur();
    }
    static template = `
    <span>
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
                    autofocus="{{autoFocus}}"
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
}
