<text lang="cn">
#### 自定义表单控件
自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

提供受控属性 `value` 或其它与 `valuePropName` 的值同名的属性。
提供名为 `UI:form-item-interact` 的事件，参数请参考下面的代码示例。
</text>

```html
<template>
  <div>
      <s-form layout="inline" on-submit="handleSubmit">
        <s-formitem label="Price">
            <s-priceinput decorator="{{priceInputDecorator}}"></s-priceinput>
        </s-formitem>
        <s-formitem>
            <s-button type="primary" htmlType="submit">Submit</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>

<script>
import san from 'san';
import {Form, Input, Button, Select} from 'santd';

const PriceInput = san.defineComponent({
    components: {
        's-input': Input,
        's-select': Select,
        's-selectoption': Select.Option
    },
    handleNumberChange(value) {
        const number = parseInt(value || 0, 10);
        if (Number.isNaN(number)) {
            return;
        }
        this.data.set('value.number', number);
    },
    handleCurrencyChange(value) {
        this.data.set('value.currency', value);
    },
    messages: {
        'UI:form-item-interact'(payload) {
            const value = this.data.get('value');
            this.dispatch('UI:form-item-interact', {fieldValue: value, type: 'change'});
        }
    },
    template: `<span>
        <s-input type="text" size="{{size}}" value="{{value.number}}" style="width: 50%; margin-right: 3%; display: inline-block;" on-change="handleNumberChange"></s-input>
        <s-select value="{{value.currency}}" size="{{size}}" style="width: 40%; display: inline-block;" on-change="handleCurrencyChange">
            <s-selectoption value="rmb">RMB</s-selectoption>
            <s-selectoption value="dollar">Dollar</s-selectoption>
        </s-select>
    </span>`
});

export default Form.create({name: 'customized_form_controls'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-button': Button,
        's-priceinput': PriceInput
    },
    initData () {
        return {
            priceInputDecorator: {
                name: 'price',
                initialValue: {number: 0, currency: 'rmb'},
                rules: [{validator: this.checkPrice.bind(this)}]
            }
        }
    },
    checkPrice(rule, value, callback) {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    },
    handleSubmit(e) {
        e.preventDefault();
        this.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
})
</script>
```
