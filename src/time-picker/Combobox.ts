/**
 * @file Santd timepicker combobox file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import Select from './Select';
import {ComboboxState, ComboboxProps} from './interface';

const formatOption = (option: number, disabledOptions: number[]) => {
    let value = `${option}`;
    if (option < 10) {
        value = `0${option}`;
    }

    let disabled = false;
    if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
        disabled = true;
    }

    return {
        value,
        disabled
    };
};

export default class Combobox extends Base<ComboboxState, ComboboxProps> {
    initData() {
        return {
            invalid: false,
            inputReadOnly: false
        };
    }
    static computed = {
        hourData(this: Combobox) {
            const value = this.data.get('value') || this.data.get('defaultOpenValue');
            const hour = value.hour();
            const hourOptions = this.data.get('hourOptions');
            const disabledHours = this.data.get('disabledHours') || function () {};
            const showHour = this.data.get('showHour');
            const use12Hours = this.data.get('use12Hours');

            if (!showHour) {
                return false;
            }

            const disabledOptions = disabledHours();
            let hourOptionsAdj;
            let hourAdj;

            if (use12Hours) {
                hourOptionsAdj = [12].concat(hourOptions.filter((h: number) => h < 12 && h > 0));
                hourAdj = hour % 12 || 12;
            }
            else {
                hourOptionsAdj = hourOptions;
                hourAdj = hour;
            }

            return {
                options: hourOptionsAdj.map((option: number) => formatOption(option, disabledOptions)),
                selectedIndex: hourOptions.indexOf(hourAdj)
            };
        },
        minuteData(this: Combobox) {
            const value = this.data.get('value') || this.data.get('defaultOpenValue');
            const minute = value.minute();
            const minuteOptions = this.data.get('minuteOptions');
            const disabledMinutes = this.data.get('disabledMinutes') || function () {};
            const showMinute = this.data.get('showMinute');

            if (!showMinute) {
                return false;
            }

            const disabledOptions = disabledMinutes(value.hour());

            return {
                options: minuteOptions.map((option: number) => formatOption(option, disabledOptions)),
                selectedIndex: minuteOptions.indexOf(minute)
            };
        },
        secondData(this: Combobox) {
            const value = this.data.get('value') || this.data.get('defaultOpenValue');
            const second = value.second();
            const secondOptions = this.data.get('secondOptions');
            const disabledSeconds = this.data.get('disabledSeconds') || function () {};
            const showSecond = this.data.get('showSecond');

            if (!showSecond) {
                return false;
            }

            const disabledOptions = disabledSeconds(value.hour(), value.minute());

            return {
                options: secondOptions.map((option: number) => formatOption(option, disabledOptions)),
                selectedIndex: secondOptions.indexOf(second)
            };
        },
        ampmData(this: Combobox) {
            const use12Hours = this.data.get('use12Hours');
            const format = this.data.get('format');
            const isAM = this.data.get('isAM');

            if (!use12Hours) {
                return false;
            }

            const options = ['am', 'pm']
                .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
                .map(c => ({value: c}));

            const selectedIndex = isAM ? 0 : 1;

            return {
                options,
                selectedIndex
            };
        }
    }
    static components = {
        's-select': Select
    }
    handleItemChange({type, itemValue}: any) {
        const {
            defaultOpenValue,
            use12Hours,
            value: propValue,
            isAM
        } = this.data.get();
        let value = propValue || defaultOpenValue;

        if (type === 'hour') {
            if (use12Hours) {
                if (isAM) {
                    value = value!.hour(+itemValue % 12);
                }
                else {
                    value = value!.hour((+itemValue % 12) + 12);
                }
            }
            else {
                value = value!.hour(+itemValue);
            }
        }
        else if (type === 'minute') {
            value = value!.minute(+itemValue);
        }
        else if (type === 'ampm') {
            const ampm = itemValue.toUpperCase();
            if (use12Hours) {
                if (ampm === 'PM' && value!.hour() < 12) {
                    value = value!.hour((value!.hour() % 12) + 12);
                }

                if (ampm === 'AM') {
                    if (value!.hour() >= 12) {
                        value = value!.hour(value!.hour() - 12);
                    }
                }
            }
            this.fire('ampmChange', ampm);
        }
        else {
            value = value!.second(+itemValue);
        }
        this.fire('change', value);
    }
    handleEnterSelectPanel(range: any) {
        this.fire('currentSelectPanelChange', range);
    }
    static template = `<div class="{{prefixCls}}-combobox">
        <s-select
            s-if="hourData"
            prefixCls="{{prefixCls}}"
            type="hour"
            options="{{hourData.options}}"
            selectedIndex="{{hourData.selectedIndex}}"
            on-select="handleItemChange"
            on-mouseenter="handleEnterSelectPanel('hour')"
        />
        <s-select
            s-if="minuteData"
            prefixCls="{{prefixCls}}"
            type="minute"
            options="{{minuteData.options}}"
            selectedIndex="{{minuteData.selectedIndex}}"
            on-select="handleItemChange"
            on-mouseenter="handleEnterSelectPanel('minute')"
        />
        <s-select
            s-if="secondData"
            prefixCls="{{prefixCls}}"
            type="second"
            options="{{secondData.options}}"
            selectedIndex="{{secondData.selectedIndex}}"
            on-select="handleItemChange"
            on-mouseenter="handleEnterSelectPanel('second')"
        />
        <s-select
            s-if="ampmData"
            prefixCls="{{prefixCls}}"
            type="ampm"
            options="{{ampmData.options}}"
            selectedIndex="{{ampmData.selectedIndex}}"
            on-select="handleItemChange"
            on-mouseenter="handleEnterSelectPanel('ampm')"
        />
    </div>`
};
