<text lang="cn">
#### 自行处理表单数据
使用 `Form.create` 处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用 `Form.create` 并自行处理数据。
</text>

```html
<template>
  <div>
      <s-form>
        <s-formitem
            label="Prime between 8 & 12"
            labelCol="{{labelCol}}"
            wrapperCol="{{wrapperCol}}"
            validateStatus="{{number.validateStatus}}"
            help="{{number.errorMsg || tips}}"
        >
            <s-inputnumber min="{{8}}" max="{{12}}" value="{{number.value}}" on-change="handleNumberChange"></s-inputnumber>
        </s-formitem>
      </s-form>
  </div>
</template>

<script>
import {Form, InputNumber} from 'santd';

function validatePrimeNumber(number) {
    if (number === 11) {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: 'The prime between 8 and 12 is 11!',
    };
}

export default {
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-inputnumber': InputNumber
    },
    initData () {
        return {
            number: {
                value: 11
            },
            labelCol: {span: 7},
            wrapperCol: {span: 12},
            tips: 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.'
        }
    },
    checkPrice(rule, value, callback) {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    },
    handleNumberChange(value) {
        this.data.set('number', {
            ...validatePrimeNumber(value),
            value
        })
    }
};
</script>
```
