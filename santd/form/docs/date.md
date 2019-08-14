<text lang="cn">
#### 时间类控件
时间类组件的 `value` 类型为 `moment` 对象，所以在提交服务器前需要预处理。
</text>

```html
<template>
  <div>
      <s-form on-submit="handleSubmit" labelCol="{{labelCol}}" wrapperCol="{{wrapperCol}}">
        <s-formitem label="DatePicker">
            <s-datepicker decorator="{{datePickerRules}}"/>
        </s-formitem>
        <s-formitem label="DatePicker[showTime]">
            <s-datepicker showTime format="YYYY-MM-DD HH:mm:ss" decorator="{{dateTimeRules}}"/>
        </s-formitem>
        <s-formitem label="MonthPicker">
            <s-monthpicker decorator="{{monthRules}}"/>
        </s-formitem>
        <s-formitem label="RangePicker">
            <s-rangepicker decorator="{{rangeRules}}"/>
        </s-formitem>
        <s-formitem label="RangePicker[showTime]">
            <s-rangepicker showTime format="YYYY-MM-DD HH:mm:ss" decorator="{{rangeTimeRules}}"/>
        </s-formitem>
        <s-formitem label="TimePicker">
            <s-timepicker decorator="{{timeRules}}"/>
        </s-formitem>
        <s-formitem wrapperCol="{{buttonWrapperCol}}">
            <s-button type="primary" htmlType="submit">Submit</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import san from 'san';
import Form from 'santd/form';
import Button from 'santd/button';
import DatePicker from 'santd/date-picker';
import TimePicker from 'santd/timepicker';

export default Form.create({name: 'time_related_controls'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-button': Button,
        's-datepicker': DatePicker,
        's-monthpicker': DatePicker.MonthPicker,
        's-rangepicker': DatePicker.RangePicker,
        's-timepicker': TimePicker
    },
    initData () {
        return {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            },
            buttonWrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 16, offset: 8}
            },
            datePickerRules: {
                name: 'datePicker',
                rules: [{type: 'object', required: true, message: 'Please select time!'}]
            },
            dateTimeRules: {
                name: 'dateTimePicker',
                rules: [{type: 'object', required: true, message: 'Please select time!'}]
            },
            monthRules: {
                name: 'monthPicker',
                rules: [{type: 'object', required: true, message: 'Please select time!'}]
            },
            rangeRules: {
                name: 'rangePicker',
                rules: [{type: 'array', required: true, message: 'Please select time!'}]
            },
            rangeTimeRules: {
                name: 'rangeTimePicker',
                rules: [{type: 'array', required: true, message: 'Please select time!'}]
            },
            timeRules: {
                name: 'timePicker',
                rules: [{type: 'object', required: true, message: 'Please select time!'}]
            }
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        const form = this.data.get('form');
        form.validateFields((err, values) => {
            const rangeValue = values['rangePicker'];
            const rangeTimeValue = values['rangeTimePicker'];
            const results = {
                ...values,
                'datePicker': values['datePicker'].format('YYYY-MM-DD'),
                'dateTimePicker': values['dateTimePicker'].format('YYYY-MM-DD HH:mm:ss'),
                'monthPicker': values['monthPicker'].format('YYYY-MM'),
                'rangePicker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
                'rangeTimePicker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
                ],
                'timePicker': values['timePicker'].format('HH:mm:ss'),
            };
            console.log('Received values of form: ', results);
        });
    }
});
</script>
```
