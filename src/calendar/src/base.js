/**
 * @file Santd calendar base file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import locale from './locale/en_US';
import {isAllowedDate} from './util/index';
import TimePickerPanel from '../../timepicker/panel';

export default san.defineComponent({
    dataTypes: {
        customClassName: DataTypes.string,
        visible: DataTypes.bool,
        prefixCls: DataTypes.string
    },

    initData() {
        return {
            visible: true,
            prefixCls: 'calendar',
            locale: locale,
            timeFormat: 'HH:mm:ss'
        };
    },

    components: {
        's-timepicker': TimePickerPanel
    },

    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const customClassName = this.data.get('customClassName');
            const visible = this.data.get('visible');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [prefixCls, customClassName];
            !visible && classArr.push(`${prefixCls}-hidden`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
        },
        showHour() {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('H') > -1 || format.indexOf('h') > -1 || format.indexOf('k') > -1;
        },
        showMinute() {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('m') > -1;
        },
        showSecond() {
            const showTime = this.data.get('showTime') || {};
            const format = showTime.format || this.data.get('timeFormat');
            return format.indexOf('s') > -1;
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
        }
    },

    getFormat() {
        const {locale, showTime, format} = this.data.get('');

        if (format) {
            return format;
        }

        if (showTime) {
            return locale.dateTimeFormat;
        }

        return locale.dateFormat;
    },

    focus() {
        if (this.ref('focusEl')) {
            this.ref('focusEl').focus();
        }
        else if (this.el) {
            this.el.focus();
        }
    },

    handleSelect(value, cause) {
        if (value) {
            this.setValue(value);
        }
        this.setSelectedValue(value, cause);
    },

    setSelectedValue(selectedValue, cause) {
        this.data.set('selectedValue', selectedValue);
        this.fire('select', {selectedValue, cause});
    },

    setValue(value) {
        const originalValue = this.data.get('value');

        this.data.set('value', value);
        if (originalValue && value && !originalValue.isSame(value) || originalValue || value) {
            this.fire('change', value);
        }
    },

    isAllowedDate(value) {
        const disabledDate = this.data.get('disabledDate');
        const disabledTime = this.data.get('disabledTime');
        return isAllowedDate(value, disabledDate, disabledTime);
    }
});
