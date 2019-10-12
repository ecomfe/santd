/**
 * @file Santd date picker wrappicker file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import {classCreator} from '../core/util/index';
import localeReceiver from '../localeprovider/receiver';

const prefixCls = classCreator('calendar')();
const inputPrefixCls = classCreator('input')();

const DEFAULT_FORMAT = {
    date: 'YYYY-MM-DD',
    dateTime: 'YYYY-MM-DD HH:mm:ss',
    week: 'gggg-wo',
    month: 'YYYY-MM'
};

export default function (Picker, pickerType) {
    return san.defineComponent({
        initData() {
            return {
                ...Picker.prototype.initData(),
                componentName: 'DatePicker',
                prefixCls,
                transitionName: 'slide-up',
                timeFormat: 'HH:mm:ss'
            };
        },

        inited() {
            localeReceiver.inited.bind(this)();
            Picker.prototype.inited.bind(this)();
        },

        computed: {
            ...localeReceiver.computed,
            ...Picker.prototype.computed,

            format() {
                const format = this.data.get('format');
                const showTime = this.data.get('showTime');
                const mergedPickerType = showTime ? `${pickerType}Time` : pickerType;

                return format || DEFAULT_FORMAT[mergedPickerType];
            },

            pickerClass() {
                const size = this.data.get('size');
                let classArr = [`${prefixCls}-picker`];
                size && classArr.push(`${prefixCls}-picker-${size}`);
                return classArr.join(' ');
            },

            pickerInputClass() {
                const prefixCls = this.data.get('prefixCls');
                const size = this.data.get('size');
                const disabled = this.data.get('disabled');
                let classArr = [`${prefixCls}-picker-input`, inputPrefixCls];

                size && classArr.push(`${inputPrefixCls}-${size}`);
                disabled && classArr.push(`${inputPrefixCls}-disabled`);
                return classArr.join(' ');
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
    }, Picker);
}
