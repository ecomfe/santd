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
        localeNow() {
            const text = this.data.get('text');
            const showTime = this.data.get('showTime');
            const locale = this.data.get('locale');

            return (!text && showTime ? locale.now : text) || locale.today;
        }
    },
    getTitle(value) {
        return value && getTodayTimeStr(value);
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
            class="{{prefixCls}}-today-btn {{(disabledToday || disabled) ? prefixCls + '-today-btn-disabled' : ''}}"
            role="button"
            on-click="handleToday"
            title="{{getTitle(value)}}"
        >
            {{localeNow}}
        </a>
    `
});
