<text lang="cn">
#### 定制日期单元格
使用 `dateRender` 可以自定义日期单元格的内容和样式。
</text>

```html
<template>
    <div>
        <div>
            <s-datepicker dateRender="{{dateRender}}" />
            <br /><br />
            <s-rangepicker dateRender="{{rangeDateRender}}" />
        </div>
    </div>
</template>

<script>
import san from 'san';
import DatePicker from 'santd/date-picker';

export default {
    components: {
        's-datepicker': DatePicker,
        's-rangepicker': DatePicker.RangePicker
    },
    initData() {
        return { 
            dateRender: san.defineComponent({
                computed: {
                    style() { 
                        const current = this.data.get('value');
                        if (current.date() === 1) {
                            return 'border: 1px solid #1890ff; border-radius: 50%';
                        }
                    },
                    date() {
                        const current = this.data.get('value');
                        return current.date();
                    }
                },
                template: `<div class="san-calendar-date" style="{{style}}">{{date}}</div>`
            }),
            rangeDateRender: san.defineComponent({
                computed: {
                    style() { 
                        const current = this.data.get('value');
                        if (current.date() === 1) {
                            return 'border: 1px solid #1890ff; border-radius: 50%';
                        }
                    },
                    date() {
                        const current = this.data.get('value');
                        return current.date();
                    }
                },
                template: `<div class="san-calendar-date" style="{{style}}">{{date}}</div>`
            })
        }
    },
    handleChange({date, dateString}) {
        console.log(date, dateString);
    }
}
</script>

```
