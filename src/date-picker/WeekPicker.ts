/**
 * @file Santd week picker createpicker file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import Calendar from '../calendar/src/Calendar';
import dayjs from 'dayjs';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Trigger from '../core/trigger';
import Placements from '../calendar/src/placements';
import {
    WeekPickerProps as Props,
    WeekPickerState as State,
    WeekPickerComputed as Computed,
    ChangeEvent,
    PanelChangeEvent
} from './interface';

const prefixCls = classCreator('calendar')();

export default class WeekPicker extends Base<State, Props, Computed> {
    static computed: Computed = {
        displayValue(this: WeekPicker) {
            const value = this.data.get('value');
            const format = this.data.get('format');
            return value && value.format(format);
        }
    }
    initData(): State {
        return {
            allowClear: true,
            format: 'gggg-wo',
            placements: Placements,
            trigger: 'click',
            popupPlacement: 'bottomLeft'
        };
    }
    inited() {
        let align = this.data.get('align');
        let placements = this.data.get('placements');
        let popupPlacement = this.data.get('popupPlacement');
        if (align && typeof align === 'object') {
            placements[popupPlacement] = {...placements[popupPlacement], ...align};
        }
        this.data.set('defaultValue', this.data.get('defaultPickerValue') || dayjs());
        this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
        this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
    }
    handleCalendarChange(data: PanelChangeEvent) {
        this.data.set('value', data.value);
    }
    handleOpenChange(open: boolean) {
        this.data.set('open', open);
        this.fire('openChange', open);
    }
    handleClearSelection(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        this.data.set('value', null);
        this.fire('change', {date: null, dateString: null});
    }
    handleChange(data: ChangeEvent) {
        const value = data.value;
        const cause = data.cause || {};
        const format = this.data.get('format');
        this.data.set('value', value);
        this.fire('change', {date: value, dateString: value && value.format(format)});
        if (cause.source === 'keyboard'
            || cause.source === 'dateInputSelect'
            || (!this.data.get('showTime') && cause.source !== 'dateInput')
            || cause.source === 'todayButton'
        ) {
            this.handleOpenChange(false);
        }
    }
    static components = {
        's-icon': Icon,
        's-trigger': Trigger,
        's-calendar': Calendar
    }
    static template = `<span
            id="{{id}}"
            class="{{pickerClass}}"
        >
            <s-trigger
                prefixCls="${prefixCls}-picker-container"
                popupTransitionName="{{transitionName}}"
                dropdownClassName="{{dropdownClassName}}"
                getCalendarContainer="{{getCalendarContainer}}"
                visible="{{open}}"
                action="{{disabled ? [] : trigger}}"
                builtinPlacements="{{placements}}"
                popupPlacement="{{popupPlacement}}"
                on-visibleChange="handleOpenChange"
            >
                <s-calendar
                    slot="popup"
                    style="{{popupStyle}}"
                    showWeekNumber="{{true}}"
                    inputReadOnly="{{inputReadOnly}}"
                    format="{{format}}"
                    showDateInput="{{false}}"
                    showToday="{{false}}"
                    disabledDate="{{disabledDate}}"
                    value="{{value || defaultValue}}"
                    locale="{{customLocale.lang}}"
                    localeCode="{{customLocaleCode}}"
                    hasExtraFooter="{{hasExtraFooter}}"
                    on-select="handleChange"
                    on-panelChange="handleCalendarChange"
                    on-clear="handleClearSelection"
                >
                    <slot name="renderExtraFooter" slot="renderExtraFooter" />
                </s-calendar>
                <input
                    disabled="{{disabled}}"
                    readOnly
                    value="{{displayValue}}"
                    placeholder="{{placeholder || customLocale.lang.placeholder}}"
                    class="{{pickerInputClass}}"
                    tabIndex="{{tabIndex}}"
                    name="{{name}}"
                    style="{{inputStyle}}"
                    s-ref="input"
                />
                <s-icon
                    s-if="!disabled && allowClear && value"
                    type="close-circle"
                    class="${prefixCls}-picker-clear"
                    theme="filled"
                    on-click="handleClearSelection"
                />
                <span class="{{prefixCls}}-picker-icon" s-if="hasSuffixIcon">
                    <slot name="suffixIcon" />
                </span>
                <s-icon class="${prefixCls}-picker-icon" type="calendar" s-else />
            </s-trigger>
        </span>
    `
};

export type TWeekPicker = typeof WeekPicker;
