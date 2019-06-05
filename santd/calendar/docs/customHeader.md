<cn>
####  自定义头部
自定义日历头部内容。
</cn>

```html
<template>
    <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px;">
        <s-calendar on-panelChange="panelChange" headerRender="{{headerRender}}" fullscreen="{{false}}"/>
    </div>
</template>
<script>
import san from 'san';
import moment from 'moment';
import Calendar from 'santd/calendar';
import Grid from 'santd/grid';
import Radio from 'santd/radio';
import Select from 'santd/select';

const headerRender = san.defineComponent({
    components: {
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-group': Radio.Group,
        's-radiobutton': Radio.Button,
        's-select': Select,
        's-option': Select.Option
    },
    computed: {
        year() {
            const value = this.data.get('value');
            return value && String(value.year());
        },
        years() {
            const options = [];
            const year = this.data.get('value').year();
            for (let i = year - 10; i < year + 10; i++) {
                options.push(String(i));
            }
            return options;
        },
        month() {
            const value = this.data.get('value');
            return value && String(value.month());
        },
        months() {
            const options = [];
            const value = this.data.get('value');
            const current = value.clone();
            const localeData = value.localeData();

            for (let i = 0; i < 12; i++) {
                current.month(i);
                options.push({label: localeData.monthsShort(current), value: String(i)});
            }
            return options;
        }
    },
    handleTypeChange(e) {
        this.fire('typeChange', e);
    },
    handleYearChange(value) {
        this.fire('yearChange', value);
    },
    handleMonthChange(value) {
        this.fire('monthChange', value);
    },
    template: `<div style="padding: 10px;">
        <div style="margin-bottom: 10px;">Custom header</div>
        <s-row type="flex" justify="space-between">
            <s-col>
                <s-group size="small" value="{{type}}" on-change="handleTypeChange">
                    <s-radiobutton value="month">Month</s-radiobutton>
                    <s-radiobutton value="year">Year</s-radiobutton>
                </s-group>
            </s-col>
            <s-col>
                <s-select
                    size="small"
                    className="my-year-select"
                    value="{{year}}"
                    on-change="handleYearChange"
                >
                    <s-option s-for="year in years" value="{{year}}">{{year}}</s-option>
                </s-select>
            </s-col>
            <s-col>
                <s-select
                    size="small"
                    value="{{month}}"
                    on-change="handleMonthChange"
                >
                    <s-option s-for="month in months" value="{{month.value}}">{{month.label}}</s-option>
                </s-select>
            </s-col>
        </s-row>
    </div>`
});

export default {
    components: {
        's-calendar': Calendar
    },
    computed: {
        displayDate() {
            const selectedValue = this.data.get('selectedValue');
            return selectedValue && selectedValue.format('YYYY-MM-DD');
        }
    },
    initData() {
        return {
            headerRender: headerRender
        }
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
