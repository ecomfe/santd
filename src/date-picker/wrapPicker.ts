/**
 * @file Santd date picker wrappicker file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import {classCreator} from '../core/util/index';
import localeReceiver from '../locale-provider/receiver';
import dayjs from 'dayjs';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import {
    WeekPickerComputed,
    RangerPickerComputed,
    InnerCompComputed,
    LocaleType
} from './interface';

dayjs.extend(weekYear);
dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

const prefixCls = classCreator('calendar')();
const inputPrefixCls = classCreator('input')();

const DEFAULT_FORMAT = {
    date: 'YYYY-MM-DD',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    week: 'gggg-wo',
    month: 'YYYY-MM'
} as const;

type PickerType = 'date' | 'week' | 'month';
type MergedPickerKey = keyof typeof DEFAULT_FORMAT;

interface BaseComputed {
    customLocale: () => LocaleType;
    customLocaleCode: () => any;
    format: () => string;
    pickerClass: () => string;
    pickerInputClass: () => string;
}

export interface WeekComputed extends BaseComputed, WeekPickerComputed {}

export interface RangeComputed extends BaseComputed, RangerPickerComputed {}

export interface CalendarComputed extends BaseComputed, InnerCompComputed {}

interface DatePicker {
    new (): Base;
    computed: any;
}

type GetComputed<T extends string> = T extends 'week'
    ? WeekComputed
    : T extends 'range'
        ? RangeComputed
        : CalendarComputed;


export default function <T extends string>(Picker: DatePicker, pickerType: PickerType) {
    class BasePicker extends Picker {
        initData() {
            return {
                ...Picker.prototype.initData(),
                componentName: 'DatePicker',
                prefixCls,
                transitionName: 'slide-up',
                timeFormat: 'HH:mm:ss'
            };
        }

        static computed: GetComputed<T>  = {
            ...Picker.computed,
            customLocale(this: BasePicker) {
                let locale = this.data.get('locale') || {};
                return {...localeReceiver.computed.locale.bind(this)(), ...locale};
            },
            customLocaleCode(this: BasePicker) {
                return localeReceiver.computed.localeCode.bind(this)();
            },
            format(this: BasePicker) {
                const format = this.data.get('format');
                const showTime = this.data.get('showTime');
                const mergedPickerType = showTime ? `${pickerType}Time` : pickerType;

                return format || DEFAULT_FORMAT[mergedPickerType as MergedPickerKey];
            },

            pickerClass(this: BasePicker) {
                const size = this.data.get('size');
                let classArr = [`${prefixCls}-picker`];
                size && classArr.push(`${prefixCls}-picker-${size}`);
                return classArr.join(' ');
            },

            pickerInputClass(this: BasePicker) {
                const prefixCls = this.data.get('prefixCls');
                const size = this.data.get('size');
                const disabled = this.data.get('disabled');
                let classArr = [`${prefixCls}-picker-input`, inputPrefixCls];

                size && classArr.push(`${inputPrefixCls}-${size}`);
                disabled && classArr.push(`${inputPrefixCls}-disabled`);
                return classArr.join(' ');
            }
        }

        inited() {
            localeReceiver.inited.bind(this)();
            Picker.prototype.inited.bind(this)();
        }

        focus() {
            (this.ref('input') as unknown as HTMLInputElement).focus();
        }

        blur() {
            (this.ref('input') as unknown as HTMLInputElement).blur();
        }

        attached() {
            const autoFocus = this.data.get('autoFocus');
            const disabled = this.data.get('disabled');
            if (autoFocus && !disabled) {
                this.focus();
            }
        }
    };
    return BasePicker;
}
