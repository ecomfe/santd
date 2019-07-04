/**
 * @file Santd range picker createpicker file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Picker from '../calendar/src/picker';
import RangeCalendar from '../calendar/src/rangeCalendar';
import classNames from 'classnames';
import moment from 'moment';
import {classCreator} from 'santd/core/util';
import inherits from 'santd/core/util/inherits';
import Icon from 'santd/icon';
import Tag from 'santd/tag';

const prefixCls = classCreator('calendar')();
const tagPrefixCls = classCreator('tag')();

function getShowDateFromValue(value, mode) {
    const [start, end] = value;
    // value could be an empty array, then we should not reset showDate
    if (!start && !end) {
        return;
    }
    if (mode && mode[0] === 'month') {
        return [start, end];
    }
    const newEnd = end && end.isSame(start, 'month') ? end.clone().add(1, 'month') : end;
    return [start, newEnd];
}

function isEmptyArray(arr) {
    if (Array.isArray(arr)) {
        return arr.length === 0 || arr.every(i => !i);
    }
    return false;
}

function pickerValueAdapter(value) {
    if (!value) {
        return;
    }
    if (Array.isArray(value)) {
        return value;
    }
    return [value, value.clone().add(1, 'month')];
}

export default san.defineComponent({
    computed: {
        classes() {
            const className = this.data.get('className');
            const pickerClass = this.data.get('pickerClass');

            return classNames(className, pickerClass);
        },
        renderFooter() {
            const renderExtraFooter = this.data.get('renderExtraFooter');
            const ranges = this.data.get('ranges');
            const prefixCls = this.data.get('prefixCls');
            const instance = this.data.get('instance');

            if (!renderExtraFooter && !ranges) {
                return null;
            }

            return san.defineComponent({
                computed: {
                    operations() {
                        const ranges = this.data.get('ranges');
                        return Object.keys(ranges || {});
                    }
                },
                initData() {
                    return {
                        ranges,
                        prefixCls,
                        tagPrefixCls,
                        renderExtraFooter
                    };
                },
                components: {
                    's-tag': Tag,
                    's-footer': renderExtraFooter && renderExtraFooter()
                },
                handleRangeClick(value) {
                    instance.handleRangeClick(value);
                },
                handleMouseEnter(value) {
                    instance.data.set('hoverValue', value);
                },
                handleMouseLeave() {
                    instance.handleRangeMouseLeave();
                },
                template: `<div>
                    <div
                        s-if="operations && operations.length"
                        class="{{prefixCls}}-footer-extra {{prefixCls}}-range-quick-selector"
                        key="range"
                    >
                        <s-tag
                            s-for="operation in operations"
                            key="{{operation}}"
                            prefixCls="{{tagPrefixCls}}"
                            color="blue"
                            on-click="handleRangeClick(ranges[operation])"
                            on-mouseenter="handleMouseEnter(ranges[operation])"
                            on-mouseleave="handleMouseLeave"
                        >
                            {{operation}}
                        </s-tag>
                    </div>
                    <div class="{{prefixCls}}-footer-extra" key="extra" s-if="{{renderExtraFooter}}">
                        <s-footer />
                    </div>
                </div>`
            });
        },
        calendar() {
            const separator = this.data.get('separator');
            const format = this.data.get('format');
            const prefixCls = this.data.get('prefixCls');
            const showTime = this.data.get('showTime');
            const ranges = this.data.get('ranges');
            const calendarClassName = classNames({
                [`${prefixCls}-time`]: showTime,
                [`${prefixCls}-range-with-ranges`]: ranges
            });
            const locale = this.data.get('locale');
            const renderFooter = this.data.get('renderFooter');
            const timePicker = this.data.get('timePicker');
            const disabledDate = this.data.get('disabledDate');
            const disabledTime = this.data.get('disabledTime');
            const placeholder = this.data.get('placeholder');
            const rangePlaceholder = locale && locale.lang.rangePlaceholder;
            const dateInputPlaceholder = [
                placeholder && placeholder[0] || rangePlaceholder[0],
                placeholder && placeholder[1] || rangePlaceholder[1]
            ];
            const dateRender = this.data.get('dateRender');
            const showDate = this.data.get('showDate');
            const showToday = this.data.get('showToday');
            const hoverValue = this.data.get('hoverValue');
            const mode = this.data.get('mode');
            const localeCode = this.data.get('localeCode');
            if (localeCode) {
                showDate[0].locale(localeCode);
                showDate[1].locale(localeCode);
            }

            return inherits(san.defineComponent({
                initData() {
                    return {
                        separator,
                        format,
                        prefixCls,
                        className: calendarClassName,
                        renderFooter,
                        timePicker,
                        disabledDate,
                        disabledTime,
                        dateInputPlaceholder,
                        dateRender,
                        value: showDate,
                        showToday,
                        hoverValue,
                        propMode: mode,
                        locale: locale.lang
                    };
                }
            }), RangeCalendar);
        },
        displayStartValue() {
            const value = this.data.get('value');
            const format = this.data.get('format');
            return value && value[0] && value[0].format(format);
        },
        displayEndValue() {
            const value = this.data.get('value');
            const format = this.data.get('format');
            return value && value[1] && value[1].format(format);
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
        }
    },
    initData() {
        return {
            prefixCls,
            allowClear: true,
            showToday: false,
            separator: '~',
            hoverValue: [],
            disabledTime() {}
        };
    },
    inited() {
        this.data.set('instance', this);
        const value = this.data.get('value');
        const defaultValue = this.data.get('defaultValue');
        const pickerValue = !value || isEmptyArray(value) ? this.data.get('defaultPickerValue') : value;

        this.data.set('value', value || defaultValue || []);
        this.data.set('showDate', pickerValueAdapter(pickerValue || moment()));
        this.data.set('inputStyle', this.data.get('style'));
        this.data.set('style', {});
    },
    clearHoverValue() {
        this.data.set('hoverValue', []);
    },
    handleCalendarChange(value) {
        this.data.set('value', value);
    },
    handleOpenChange(open) {
        if (open === false) {
            this.clearHoverValue();
        }
        this.data.set('open', open);
        this.fire('openChange', open);
    },
    handleClearSelection(e) {
        e.preventDefault();
        e.stopPropagation();

        this.data.set('value', []);
        this.handleChange([]);
    },
    handleChange(value) {
        this.data.set('value', value);
        this.data.set('showDate', getShowDateFromValue(value) || this.data.get('showDate'));
        const format = this.data.get('format');
        const [start, end] = value;

        this.fire('change', {
            date: value,
            dateString: [start && start.format(format) || '', end && end.format(format) || '']
        });
    },
    setValue(value, hidePanel) {
        this.handleChange(value);
        if ((hidePanel || !this.data.get('showTime'))) {
            this.data.set('open', false);
        }
    },
    handleRangeClick(value) {
        if (typeof value === 'function') {
            value = value();
        }

        this.setValue(value, true);

        this.fire('ok', value);
        this.fire('openChange', false);
    },
    handleRangeMouseLeave() {
        if (this.data.get('open')) {
            this.clearHoverValue();
        }
    },
    handleOk(value) {
        this.fire('ok', value);
    },
    handlePanelChange(params) {
        this.fire('panelChange', params);
    },
    messages: {
        valueChange(payload) {
            this.data.set('showDate', payload.value);
        },
        hoverChange(payload) {
            this.data.set('hoverValue', payload.value);
        },
        panelChange(payload) {
            this.fire('panelChange', payload.value);
        }
    },
    components: {
        's-picker': Picker,
        's-icon': Icon
    },
    template: `<span
            id="{{id}}"
            class="{{classes}}"
            tabIndex="{{disabled ? -1 : 0}}"
        >
            <s-picker
                calendar="{{calendar}}"
                value="{{value}}"
                prefixCls="{{prefixCls}}-picker-container"
                style="{{popupStyle}}"
                transitionName="{{transitionName}}"
                open="{{open}}"
                dropdownClassName="{{dropdownClassName}}"
                getCalendarContainer="{{getCalendarContainer}}"
                on-visibleChange="handleOpenChange"
                on-change="handleChange"
                on-panelChange="handlePanelChange"
                on-ok="handleOk"
                disabled="{{disabled}}"
            >
                <div class="{{pickerInputClass}}">
                    <input
                        disabled="{{disabled}}"
                        readOnly
                        value="{{displayStartValue}}"
                        placeholder="{{placeholder && placeholder[0] || locale.lang.rangePlaceholder[0]}}"
                        className="{{prefixCls}}-range-picker-input"
                        tabIndex="-1"
                        style="{{inputStyle}}"
                    />
                    <span class="{{prefixCls}}-range-picker-separator">{{separator}}</span>
                    <input
                        disabled="{{disabled}}"
                        readOnly
                        value="{{displayEndValue}}"
                        placeholder="{{placeholder && placeholder[1] || locale.lang.rangePlaceholder[1]}}"
                        className="{{prefixCls}}-range-picker-input"
                        tabIndex="-1"
                        style="{{inputStyle}}"
                    />
                    <s-icon
                        s-if="!disabled && allowClear && value && (value[0] || value[1])"
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
