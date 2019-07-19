/**
 * @file Santd date picker createpicker file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Picker from '../calendar/src/picker';
import MonthCalendar from '../calendar/src/monthCalendar';
import classNames from 'classnames';
import moment from 'moment';
import {classCreator} from 'santd/core/util';
import inherits from 'santd/core/util/inherits';
import Icon from 'santd/icon';

const prefixCls = classCreator('calendar')();

export default function (theCalendar) {
    return san.defineComponent({
        computed: {
            classes() {
                const className = this.data.get('className');
                const pickerClass = this.data.get('pickerClass');

                return classNames(className, pickerClass);
            },
            calendar() {
                const locale = this.data.get('locale');
                const localeCode = this.data.get('localeCode');
                const value = this.data.get('value');
                if (localeCode) {
                    moment.locale(localeCode);
                }
                if (value && localeCode) {
                    value.locale(localeCode);
                }
                const disabledDate = this.data.get('disabledDate');
                const disabledTime = this.data.get('disabledTime');
                const timePicker = this.data.get('timePicker');
                const defaultValue = this.data.get('defaultValue') || moment();
                const dateInputPlaceholder = this.data.get('placeholder') || locale.lang.placeholder;
                const prefixCls = this.data.get('prefixCls');
                const dateRender = this.data.get('dateRender');
                const format = this.data.get('format');
                const showToday = this.data.get('showToday');
                const monthCellContentRender = this.data.get('monthCellContentRender');
                const renderFooter = this.data.get('renderFooter');
                const showTime = this.data.get('showTime');
                const calendarClassName = classNames({
                    [`${prefixCls}-time`]: showTime,
                    [`${prefixCls}-month`]: theCalendar === MonthCalendar
                });
                const mode = this.data.get('mode');
                let calendarProps = {};
                if (mode) {
                    calendarProps.mode = mode;
                }

                return inherits(san.defineComponent({
                    initData() {
                        return {
                            disabledDate,
                            disabledTime: showTime ? disabledTime : null,
                            timePicker,
                            defaultValue,
                            dateInputPlaceholder,
                            prefixCls,
                            customClassName: calendarClassName,
                            dateRender,
                            format,
                            showToday,
                            monthCellContentRender,
                            renderFooter,
                            showTime,
                            locale: locale.lang,
                            localeCode,
                            ...calendarProps
                        };
                    }
                }), theCalendar);
            },
            displayValue() {
                const value = this.data.get('value');
                const format = this.data.get('format');
                return value && value.format(format);
            },
            injectInputIcon() {
                const suffixIcon = this.data.get('suffixIcon');
                const instance = this.data.get('instance');

                let inputIcon;
                if (typeof suffixIcon === 'function') {
                    inputIcon = suffixIcon;
                }
                else if (typeof suffixIcon === 'string') {
                    inputIcon = san.defineComponent({
                        template: `<span class="{{className}}">
                            {{suffixIcon}}
                        </span>`
                    });
                }
                else {
                    inputIcon = Icon;
                }
                instance && (instance.components.inputicon = inputIcon);
            },
            renderFooter() {
                const renderExtraFooter = this.data.get('renderExtraFooter');
                const prefixCls = this.data.get('prefixCls');
                const instance = this.data.get('instance');

                if (!renderExtraFooter) {
                    return null;
                }

                return san.defineComponent({
                    initData() {
                        return {
                            prefixCls,
                            renderExtraFooter
                        };
                    },
                    components: {
                        's-footer': renderExtraFooter()
                    },
                    template: `<div>
                        <div class="{{prefixCls}}-footer-extra" key="extra" s-if="{{renderExtraFooter}}">
                            <s-footer />
                        </div>
                    </div>`
                });
            }
        },
        initData() {
            return {
                prefixCls,
                allowClear: true,
                showToday: true
            };
        },
        inited() {
            this.data.set('instance', this);
            const value = this.data.get('value');
            const defaultValue = this.data.get('defaultValue');
            this.data.set('value', value || defaultValue);
        },
        handleChange(value) {
            const format = this.data.get('format');
            this.data.set('value', value, {force: false});
            this.fire('change', {date: value, dateString: value && value.format(format)});
            this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
        },
        handleOpenChange(open) {
            this.fire('openChange', open);
        },
        handleClearSelection(e) {
            e.preventDefault();
            e.stopPropagation();

            this.data.set('value', null);
            this.fire('change', {date: null, dateString: null});
            this.dispatch('UI:form-item-interact', {fieldValue: '', type: 'change'});
        },
        handleOk(value) {
            this.fire('ok', value);
        },
        components: {
            's-thecalendar': theCalendar,
            's-picker': Picker,
            's-icon': Icon
        },
        focus() {
            this.ref('input').focus();
        },
        blur() {
            this.ref('input').blur();
        },
        template: `<span
            id="{{id}}"
            class="{{classes}}"
            style="{{style}} {{!showTime && 'min-width:195px;'}}"
        >
            <s-picker
                calendar="{{calendar}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}-picker-container"
                style="{{popupStyle}}"
                transitionName="{{transitionName}}"
                on-visibleChange="handleOpenChange"
                on-change="handleChange"
                on-ok="handleOk"
                disabled="{{disabled}}"
                open="{{open}}"
                localeCode="{{localeCode}}"
                dropdownClassName="{{dropdownClassName}}"
                getCalendarContainer="{{getCalendarContainer}}"
                s-ref="picker"
            >
                <div>
                    <input
                        disabled="{{disabled}}"
                        readOnly
                        value="{{displayValue}}"
                        placeholder="{{placeholder || locale.lang.placeholder}}"
                        className="{{pickerInputClass}}"
                        tabIndex="{{tabIndex}}"
                        name="{{name}}"
                        autocomplete="off"
                        s-ref="input"
                    />
                    <s-icon
                        s-if="!disabled && allowClear && value"
                        type="close-circle"
                        class="{{prefixCls}}-picker-clear"
                        theme="filled"
                        on-click="handleClearSelection"
                    />
                    <inputicon className="{{prefixCls}}-picker-icon" type="calendar"/>
                </div>
            </s-picker>
        </span>`
    });
}
