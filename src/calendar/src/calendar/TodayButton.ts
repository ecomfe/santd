/**
 * @file Santd calendar today button file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import * as I from './interface';
import {dayjsType} from '../../interface';
import {getTodayTimeStr, getTodayTime, isAllowedDate} from '../util/index';

export default class TodayButton extends Base<I.TodayButtonState, I.TodayButtonProps, I.TodayButtonComputed> {
    static computed: I.TodayButtonComputed = {
        disabledToday(this: TodayButton) {
            const value = this.data.get('value');
            const disabledDate = this.data.get('disabledDate');
            return disabledDate && !isAllowedDate(getTodayTime(value), disabledDate);
        },
        localeNow(this: TodayButton) {
            const text = this.data.get('text');
            const showTime = this.data.get('showTime');
            const locale = this.data.get('locale');

            return (!text && showTime ? locale.now : text) || locale.today;
        }
    }
    getTitle(value: dayjsType) {
        return value && getTodayTimeStr(value);
    }
    handleToday(): void {
        const disabled = this.data.get('disabled');
        const disabledToday = this.data.get('disabledToday');
        if (!disabled && !disabledToday) {
            this.fire('today');
        }
    };
    static template = /* html */ `
        <a
            class="{{prefixCls}}-today-btn {{(disabledToday || disabled) ? prefixCls + '-today-btn-disabled' : ''}}"
            role="button"
            on-click="handleToday"
            title="{{getTitle(value)}}"
        >
            {{localeNow}}
        </a>
    `
};
