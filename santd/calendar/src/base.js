/**
 * @file Santd calendar base file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import locale from './locale/en_US';
import {isAllowedDate} from '../src/util/index';

export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        customClassName: DataTypes.string,
        visible: DataTypes.bool,
        prefixCls: DataTypes.string
    },
    initData() {
        return {
            visible: true,
            prefixCls: 'calendar',
            className: '',
            locale: locale
        };
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const customClassName = this.data.get('customClassName');
            const className = this.data.get('className');
            const visible = this.data.get('visible');
            const showWeekNumber = this.data.get('showWeekNumber');

            let classArr = [prefixCls, customClassName, className];
            !visible && classArr.push(`${prefixCls}-hidden`);
            showWeekNumber && classArr.push(`${prefixCls}-week-number`);
            return classArr;
        }
    },
    getFormat() {
        const {locale, timePicker, format} = this.data.get('');
        if (!format) {
            if (timePicker) {
                return locale.dateTimeFormat;
            }
            return locale.dateFormat;
        }
        return format;
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
        if (originalValue && value && !originalValue.isSame(value) || (!originalValue && value) || (originalValue && !value)) {
            this.fire('change', value);
            // this.dispatch('change', value);
        }
    },
    isAllowedDate(value) {
        const disabledDate = this.data.get('disabledDate');
        const disabledTime = this.data.get('disabledTime');
        return isAllowedDate(value, disabledDate, disabledTime);
    }
});
