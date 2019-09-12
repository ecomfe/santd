/**
 * @file Santd calendar today button file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {getTodayTimeStr, getTodayTime, isAllowedDate} from '../util/index';


export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        value: DataTypes.object,
        timePicker: DataTypes.func,
        locale: DataTypes.object,
        disabledDate: DataTypes.func,
        text: DataTypes.string
    },
    computed: {
        disabledToday() {
            const value = this.data.get('value');
            const disabledDate = this.data.get('disabledDate');
            return disabledDate && !isAllowedDate(getTodayTime(value), disabledDate);
        },
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const disabledToday = this.data.get('disabledToday');
            const disabled = this.data.get('disabled');

            let classArr = [`${prefixCls}-today-btn`];
            (disabledToday || disabled) && classArr.push(`${prefixCls}-today-btn-disabled`);
            return classArr;
        },
        localeNow() {
            const text = this.data.get('text');
            const timePicker = this.data.get('timePicker');
            const locale = this.data.get('locale');

            return (!text && timePicker ? locale.now : text) || locale.today;
        },
        title() {
            const value = this.data.get('value');
            return value && getTodayTimeStr(value);
        }
    },
    handleToday() {
        const disabled = this.data.get('disabled');
        const disabledToday = this.data.get('disabledToday');
        if (!disabled && !disabledToday) {
            this.fire('today');
        }
    },
    template: `
        <a
            class="{{classes}}"
            role="button"
            on-click="handleToday"
            title="{{title}}"
        >
            {{localeNow}}
        </a>
    `
});
