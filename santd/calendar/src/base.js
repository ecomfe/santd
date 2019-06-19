/**
 * @file Santd calendar base file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import locale from './locale/zh_CN';
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

            return classNames(prefixCls, {
                [`${prefixCls}-hidden`]: !visible,
                [`${prefixCls}-week-number`]: showWeekNumber
            }, customClassName, className);
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
        this.data.set('value', value);
        this.fire('change', value);
        this.dispatch('change', value);
    },
    isAllowedDate(value) {
        const disabledDate = this.data.get('disabledDate');
        const disabledTime = this.data.get('disabledTime');
        return isAllowedDate(value, disabledDate, disabledTime);
    }
});
