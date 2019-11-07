/**
 * @file Santd date picker createpicker file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import MonthCalendar from '../calendar/src/monthCalendar';
import {classCreator} from '../core/util';
import Trigger from '../core/trigger';
import Icon from '../icon';
import Placements from '../calendar/src/placements';

const prefixCls = classCreator('calendar')();

export default function (calendar) {
    return san.defineComponent({
        computed: {
            displayValue() {
                const value = this.data.get('value');
                const format = this.data.get('format');
                return value && value.format(format);
            },
            calendarClasses() {
                let classArr = [];
                const showTime = this.data.get('showTime');
                showTime && classArr.push(`${prefixCls}-time`);
                calendar === MonthCalendar && classArr.push(`${prefixCls}-month`);

                return classArr.join(' ');
            }
        },
        initData() {
            return {
                prefixCls,
                allowClear: true,
                showToday: true,
                trigger: 'click',
                placements: Placements
            };
        },
        inited() {
            this.data.set('value', this.data.get('value') || this.data.get('defaultValue'));
            this.data.set('hasExtraFooter', !!this.sourceSlots.named.renderExtraFooter);
            this.data.set('hasDateRender', !!this.sourceSlots.named.dateRender);
            this.data.set('hasSuffixIcon', !!this.sourceSlots.named.suffixIcon);
        },
        handleChange(data) {
            const format = this.data.get('format');
            const value = data.value;
            const cause = data.cause || {};
            this.data.set('value', value.clone(), {force: true});
            this.fire('change', {date: value, dateString: value && value.format(format)});
            this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});

            if (cause.source === 'keyboard'
                || cause.source === 'dateInputSelect'
                || (!this.data.get('showTime') && cause.source !== 'dateInput')
                || cause.source === 'todayButton'
            ) {
                this.handleOpenChange(false);
            }
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
            this.dispatch('UI:form-item-interact', {fieldValue: '', type: 'change', e});
        },
        handleOk(value) {
            this.data.set('value', value);
            this.fire('ok', value);
            this.handleOpenChange(false);
        },
        components: {
            's-calendar': calendar,
            's-icon': Icon,
            's-trigger': Trigger
        },
        focus() {
            this.ref('input').focus();
        },
        blur() {
            this.ref('input').blur();
        },
        template: `<span
            id="{{id}}"
            class="{{pickerClass}}"
            style="{{!showTime && 'min-width:195px;'}}"
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
                destroyPopupOnHide="{{true}}"
                on-visibleChange="handleOpenChange"
            >
                <s-calendar
                    slot="popup"
                    style="{{popupStyle}}"
                    format="{{format}}"
                    disabledDate="{{disabledDate}}"
                    disabledTime="{{showTime ? disabledTime : null}}"
                    value="{{value || defaultValue}}"
                    selectedValue="{{value}}"
                    timePicker="{{timePicker}}"
                    dateInputPlaceholder="{{placeholder || locale.lang.placeholder}}"
                    prefixCls="${prefixCls}"
                    customClassName="{{calendarClasses}}"
                    format="{{format}}"
                    showToday="{{showToday}}"
                    showTime="{{showTime}}"
                    locale="{{locale.lang}}"
                    localeCode="{{localeCode}}"
                    mode="{{mode}}"
                    hasExtraFooter="{{hasExtraFooter}}"
                    hasDateRender="{{hasDateRender}}"
                    on-select="handleChange"
                    on-clear="handleClearSelection"
                    on-ok="handleOk"
                >
                    <slot name="renderExtraFooter" slot="renderExtraFooter" />
                    <slot name="dateRender" slot="dateRender" var-current="{{current}}" />
                </s-calendar>
                <input
                    style="{{showTime ? 'min-width: 195px;' : ''}}"
                    disabled="{{disabled}}"
                    readOnly
                    value="{{displayValue}}"
                    placeholder="{{placeholder || locale.lang.placeholder}}"
                    class="{{pickerInputClass}}"
                    tabIndex="{{tabIndex}}"
                    name="{{name}}"
                    autocomplete="off"
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
        </span>`
    });
}
