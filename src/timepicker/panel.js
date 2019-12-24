/**
 * @file Santd timepicker panel file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import moment from 'moment';
import Header from './header';
import ComboBox from './combobox';

function generateOptions(length, disabledOptions, hideDisabledOptions, step = 1) {
    const arr = [];
    for (let value = 0; value < length; value += step) {
        if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
            arr.push(value);
        }
    }
    return arr;
}

function toNearestValidTime(time, hourOptions, minuteOptions, secondOptions) {
    const hour = hourOptions
        .slice()
        .sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
    const minute = minuteOptions
        .slice()
        .sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
    const second = secondOptions
        .slice()
        .sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
    return moment(`${hour}:${minute}:${second}`, 'HH:mm:ss');
}

export default san.defineComponent({
    computed: {
        isAM() {
            const defaultOpenValue = this.data.get('defaultOpenValue');
            const value = this.data.get('value');
            const realValue = value || defaultOpenValue;
            return realValue.hour() >= 0 && realValue.hour() < 12;
        },
        disabledHourOptions() {
            const use12Hours = this.data.get('use12Hours');
            const disabledHours = this.data.get('disabledHours') || function () {};

            let disabledOptions = disabledHours();
            if (use12Hours && Array.isArray(disabledOptions)) {
                if (this.data.get('isAM')) {
                    disabledOptions = disabledOptions.filter(h => h < 12).map(h => (h === 0 ? 12 : h));
                }
                else {
                    disabledOptions = disabledOptions.map(h => (h === 12 ? 12 : h - 12));
                }
            }
            return disabledOptions;
        },
        hourOptions() {
            const disabledHourOptions = this.data.get('disabledHourOptions');
            const hideDisabledOptions = this.data.get('hideDisabledOptions');
            const hourStep = this.data.get('hourStep');
            return generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
        },
        minuteOptions() {
            const value = this.data.get('value');
            const disabledMinutes = this.data.get('disabledMinutes') || function () {};
            const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
            const hideDisabledOptions = this.data.get('hideDisabledOptions');
            const minuteStep = this.data.get('minuteStep');

            return generateOptions(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
        },
        secondOptions() {
            const value = this.data.get('value');
            const disabledSeconds = this.data.get('disabledSeconds') || function () {};
            const disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
            const hideDisabledOptions = this.data.get('hideDisabledOptions');
            const secondStep = this.data.get('secondStep');

            return generateOptions(60, disabledSecondOptions, hideDisabledOptions, secondStep);
        },
        validDefaultOpenValue() {
            const defaultOpenValue = this.data.get('defaultOpenValue');
            const hourOptions = this.data.get('hourOptions');
            const minuteOptions = this.data.get('minuteOptions');
            const secondOptions = this.data.get('secondOptions');

            return defaultOpenValue && toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);
        }
    },
    components: {
        's-header': Header,
        's-combobox': ComboBox
    },
    handleChange(value) {
        this.data.set('value', value.clone());
        this.fire('change', value);
    },
    handleAmpmChange(ampm) {
        this.fire('ampmChange', ampm);
    },
    handleCurrentSelectPanelChange(panel) {
        this.data.set('currentSelectPanel', panel);
    },
    handleEsc(e) {
        this.fire('esc', e);
    },
    handleKeyDown(e) {
        this.fire('keydown', e);
    },
    template: `<div class="{{prefixCls}}-inner">
        <s-header
          clearText="{{clearText}}"
          prefixCls="{{prefixCls}}"
          defaultOpenValue="{{validDefaultOpenValue}}"
          value="{{value}}"
          currentSelectPanel="{{currentSelectPanel}}"
          format="{{format}}"
          placeholder="{{placeholder}}"
          hourOptions="{{hourOptions}}"
          minuteOptions="{{minuteOptions}}"
          secondOptions="{{secondOptions}}"
          disabledHours="{{disabledHours}}"
          disabledMinutes="{{disabledMinutes}}"
          disabledSeconds="{{disabledSeconds}}"
          focusOnOpen="{{focusOnOpen}}"
          inputReadOnly="{{inputReadOnly}}"
          on-esc="handleEsc"
          on-keydown="handleKeyDown"
          on-change="handleChange"
        />
        <s-combobox
          prefixCls="{{prefixCls}}"
          value="{{value}}"
          defaultOpenValue="{{validDefaultOpenValue}}"
          format="{{format}}"
          showHour="{{showHour}}"
          showMinute="{{showMinute}}"
          showSecond="{{showSecond}}"
          hourOptions="{{hourOptions}}"
          minuteOptions="{{minuteOptions}}"
          secondOptions="{{secondOptions}}"
          disabledHours="{{disabledHours}}"
          disabledMinutes="{{disabledMinutes}}"
          disabledSeconds="{{disabledSeconds}}"
          use12Hours="{{use12Hours}}"
          isAM="{{isAM}}"
          on-change="handleChange"
          on-ampmChange="handleAmpmChange"
          on-currentSelectPanelChange="handleCurrentSelectPanelChange"
        />
        <div class="{{prefixCls}}-addon" s-if="hasAddon">
            <slot name="addon" />
        </div>
    </div>`
});
