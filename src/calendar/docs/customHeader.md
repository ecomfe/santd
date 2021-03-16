<text lang="cn">
####  自定义头部
自定义日历头部内容。
</text>

```html
<template>
    <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px;">
        <s-calendar on-panelChange="panelChange" headerRender="{{headerRender}}" fullscreen="{{false}}" s-ref="calendar">
            <div style="padding: 10px;" slot="headerRender">
                <div style="margin-bottom: 10px;">Custom header</div>
                <s-row type="flex" justify="space-between">
                    <s-col>
                        <s-group size="small" value="{{type}}" on-change="handleTypeChange" name="customgroup">
                            <s-radiobutton value="month">Month</s-radiobutton>
                            <s-radiobutton value="year">Year</s-radiobutton>
                        </s-group>
                    </s-col>
                    <s-col>
                        <s-select
                            size="small"
                            class="my-year-select"
                            value="{{getYear(value)}}"
                            on-change="handleYearChange"
                        >
                        <s-option s-for="year in getYears(value)" value="{{year}}">{{year}}</s-option>
                        </s-select>
                    </s-col>
                    <s-col>
                        <s-select
                            size="small"
                            value="{{getMonth(value)}}"
                            on-change="handleMonthChange"
                        >
                            <s-option s-for="month in getMonths(value)" value="{{month.value}}">{{month.label}}</s-option>
                        </s-select>
                    </s-col>
                </s-row>
            </div>
        </s-calendar>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import {Calendar, Grid, Radio, Select} from 'santd';

dayjs.extend(require('dayjs/plugin/localeData'));

export default {
    components: {
        's-calendar': Calendar,
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-group': Radio.Group,
        's-radiobutton': Radio.Button,
        's-select': Select,
        's-option': Select.Option
    },
    computed: {
        displayDate() {
            const selectedValue = this.data.get('selectedValue');
            return selectedValue && selectedValue.format('YYYY-MM-DD');
        },
    },
    getYear(value) {
        return value && String(value.year());
    },
    getYears(value) {
        const options = [];
        const year = value.year();
        for (let i = year - 10; i < year + 10; i++) {
            options.push(String(i));
        }
        return options;
    },
    getMonth(value) {
        return value && String(value.month());
    },
    getMonths(value) {
        const options = [];
        const current = value.clone();
        const localeData = value.localeData();

        for (let i = 0; i < 12; i++) {
            current.month(i);
            options.push({label: localeData.monthsShort(current), value: String(i)});
        }
        return options;
    },
    handleTypeChange(e) {
        this.ref('calendar').handleHeaderTypeChange(e);
    },
    handleYearChange(value) {
        this.ref('calendar').handleYearChange(value);
    },
    handleMonthChange(value) {
        this.ref('calendar').handleMonthChange(value);
    },
    handleSelect(value) {
        this.data.set('value', value);
        this.data.set('selectedValue', value);
    },
    panelChange(value) {
        console.log(value);
    }
}
</script>
```
