/**
 * @file Santd date picker wrappicker file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import classNames from 'classnames';
import moment from 'moment';
import inherits from 'santd/core/util/inherits';
import {classCreator} from 'santd/core/util/index';
import TimePickerPanel from '../timepicker/src/panel';
import LocalReceiver from '../localeprovider/localereceiver';

const prefixCls = classCreator('calendar')();
const inputPrefixCls = classCreator('input')();

const DEFAULT_FORMAT = {
    date: 'YYYY-MM-DD',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    week: 'gggg-wo',
    month: 'YYYY-MM'
};

const LOCALE_FORMAT_MAPPING = {
    date: 'dateFormat',
    dateTime: 'dateTimeFormat',
    week: 'weekFormat',
    month: 'monthFormat'
};

const Locale = inherits(san.defineComponent({
    initData() {
        return {
            componentName: 'DatePicker'
        };
    }
}), LocalReceiver);

export default function (Picker, pickerType) {
    return inherits(san.defineComponent({
        initData() {
            return {
                prefixCls,
                transitionName: 'slide-up'
            };
        },
        computed: {
            format() {
                const format = this.data.get('format');
                const showTime = this.data.get('showTime');
                const mergedPickerType = showTime ? `${pickerType}Time` : pickerType;

                return format || DEFAULT_FORMAT[mergedPickerType];
            },
            pickerClass() {
                const size = this.data.get('size');
                return classNames(`${prefixCls}-picker`, {
                    [`${prefixCls}-picker-${size}`]: !!size
                });
            },
            pickerInputClass() {
                const prefixCls = this.data.get('prefixCls');
                const size = this.data.get('size');
                const disabled = this.data.get('disabled');

                return classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
                    [`${inputPrefixCls}-lg`]: size === 'large',
                    [`${inputPrefixCls}-sm`]: size === 'small',
                    [`${inputPrefixCls}-disabled`]: disabled
                });
            },
            timePicker() {
                const showTime = this.data.get('showTime');
                const timeFormat = (showTime && showTime.format) || 'HH:mm:ss';
                const prefixCls = this.data.get('prefixCls');

                if (!showTime) {
                    return null;
                }

                return inherits(san.defineComponent({
                    initData() {
                        return {
                            format: timeFormat,
                            use12Hours: showTime && showTime.use12Hours,
                            prefixCls: `${prefixCls}-time-picker`,
                            transitionName: 'slide-up',
                            ...showTime,
                            // defaultValue: showTime && showTime.defaultValue || moment(),
                            defaultOpenValue: showTime && showTime.defaultValue || moment()
                        };
                    },
                    computed: {
                        className() {
                            const columns = this.data.get('columns');
                            return `${prefixCls}-time-picker-column-${columns}`;
                        },
                        columns() {
                            const showHour = this.data.get('showHour');
                            const showMinute = this.data.get('showMinute');
                            const showSecond = this.data.get('showSecond');
                            const use12Hours = this.data.get('use12Hours');
                            let column = 0;
                            showHour && ++column;
                            showMinute && ++column;
                            showSecond && ++column;
                            use12Hours && ++column;
                            return column;
                        },
                        showHour() {
                            const format = this.data.get('format');
                            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
                        },
                        showMinute() {
                            const format = this.data.get('format');
                            return format.indexOf('m') > -1;
                        },
                        showSecond() {
                            const format = this.data.get('format');
                            return format.indexOf('s') > -1;
                        }
                    }
                }), TimePickerPanel);
            }
        },
        focus() {
            this.ref('input').focus();
        },
        blur() {
            this.ref('input').blur();
        },
        attached() {
            const autoFocus = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            if (autoFocus && !disabled) {
                this.focus();
            }
        }
    }), inherits(Picker, Locale));
}
