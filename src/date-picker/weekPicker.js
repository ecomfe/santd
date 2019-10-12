/**
 * @file Santd week picker createpicker file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Calendar from '../calendar/src/calendar';
import moment from 'moment';
import {classCreator} from '../core/util';
import Icon from '../icon';
import Trigger from '../core/trigger';
import Placements from '../calendar/src/placements';

const prefixCls = classCreator('calendar')();

export default san.defineComponent({
    computed: {
        displayValue() {
            const value = this.data.get('value');
            const format = this.data.get('format');
            return value && value.format(format);
        }
    },
    initData() {
        return {
            allowClear: true,
            format: 'gggg-wo',
            placements: Placements,
            trigger: 'click'
        };
    },
    inited() {
        this.data.set('defaultValue', this.data.get('defaultPickerValue') || moment());
        this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
        this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
    },
    handleCalendarChange(data) {
        this.data.set('value', data.value);
    },
    handleOpenChange(open) {
        this.data.set('open', open);
        this.fire('openChange', open);
    },
    handleClearSelection(e) {
        e.preventDefault();
        e.stopPropagation();

        this.data.set('value', null);
        this.fire('change', {date: null, dateString: null});
    },
    handleChange(data) {
        const value = data.value;
        const cause = data.cause || {};
        const format = this.data.get('format');
        this.data.set('value', value, {force: true});
        this.fire('change', {date: value, dateString: value && value.format(format)});
        if (cause.source === 'keyboard'
            || cause.source === 'dateInputSelect'
            || (!this.data.get('showTime') && cause.source !== 'dateInput')
            || cause.source === 'todayButton'
        ) {
            this.handleOpenChange(false);
        }
    },
    components: {
        's-icon': Icon,
        's-trigger': Trigger,
        's-calendar': Calendar
    },
    template: `<span
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
                popupPlacement="bottomLeft"
                on-visibleChange="handleOpenChange"
            >
                <s-calendar
                    slot="popup"
                    style="{{popupStyle}}"
                    showWeekNumber="{{true}}"
                    format="{{format}}"
                    showDateInput="{{false}}"
                    showToday="{{false}}"
                    disabledDate="{{disabledDate}}"
                    value="{{value || defaultValue}}"
                    locale="{{locale.lang}}"
                    localeCode="{{localeCode}}"
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
                    placeholder="{{placeholder || locale.lang.placeholder}}"
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
});
