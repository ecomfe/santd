/**
 * @file 组件 statistic
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import Statistic from './statistic';
import moment from 'moment';

const timeUnits = [
    [/Y+/g, 1000 * 60 * 60 * 24 * 365], // years
    [/M+/g, 1000 * 60 * 60 * 24 * 30], // months
    [/D+/g, 1000 * 60 * 60 * 24], // days
    [/H+/g, 1000 * 60 * 60], // hours
    [/m+/g, 1000 * 60], // minutes
    [/s+/g, 1000], // seconds
    [/S+/g, 1] // million seconds
];

const REFRESH_INTERVAL = 33;

function padStart(string, length, chars) {
    let strLength = length ? string.length : 0;
    let l = length - strLength;
    let padding = '';
    // 这里要判断l > 0，否则会死循环，因为l有可能算出来是-1
    while (l-- > 0) {
        padding += chars;
    }

    return (length && strLength < length)
        ? (padding + string)
        : string;
}

function formatTimeStr(duration, format) {
    let leftDuration = duration;

    timeUnits.forEach(([rule, unit]) => {
        format = format.replace(rule, match => {
            const value = Math.floor(leftDuration / unit);
            leftDuration -= value * unit;

            return padStart('' + value, match.length, '0');
        });
    });

    return format;
}

export default san.defineComponent({
    initData() {
        return {
            ...Statistic.prototype.initData(),
            format: 'HH:mm:ss'
        };
    },

    inited() {
        Statistic.prototype.inited.bind(this)();
        this.data.set('deadline', this.data.get('value'));
        this.data.set('value', this.getFormatValue());

        this.syncTimer();
    },

    getFormatValue() {
        const target = moment(this.data.get('deadline')).valueOf();
        const current = moment().valueOf();
        const diff = Math.max(target - current, 0);
        return formatTimeStr(diff, this.data.get('format'));
    },

    syncTimer() {
        const value = this.data.get('deadline');
        const timestamp = moment(value).valueOf();
        if (timestamp >= Date.now()) {
            this.startTimer();
        }
        else {
            this.stopTimer();
            this.fire('finish');
        }
    },

    startTimer() {
        if (this.countdownId) {
            return;
        }

        this.countdownId = window.setInterval(() => {
            this.data.set('value', this.getFormatValue());
            this.syncTimer();
        }, REFRESH_INTERVAL);
    },

    stopTimer() {
        if (this.countdownId) {
            window.clearInterval(this.countdownId);
            this.countdownId = null;
        }
    }
}, Statistic);
