<text lang="cn">
#### 自定义校验
我们提供了 `validateStatus` `help` `hasFeedback` 等属性，你可以不需要使用 Form.create 和 decorator，自己定义校验的时机和内容。

1. `validateStatus`: 校验状态，可选 'success', 'warning', 'error', 'validating'。
2. `hasFeedback`：用于给输入框添加反馈图标。
3. `help`：设置校验文案。
</text>

```html
<template>
  <div>
      <s-form labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
        <s-formitem label="Fail" validateStatus="error" help="Should be combination of numbers & alphabets">
            <s-input placeholder="unavailable choice" id="error"></s-input>
        </s-formitem>
        <s-formitem label="Warning" validateStatus="warning">
            <s-input placeholder="warning" id="warning"></s-input>
        </s-formitem>
        <s-formitem label="Validating" validateStatus="validating" help="The information is being validated..." hasFeedback>
            <s-input placeholder="I'm the content is being validated" id="validating"></s-input>
        </s-formitem>
        <s-formitem label="Success" validateStatus="success" hasFeedback>
            <s-input placeholder="I'm the content" id="success"></s-input>
        </s-formitem>
        <s-formitem label="Warning" validateStatus="warning" hasFeedback>
            <s-input placeholder="warning" id="warning2"></s-input>
        </s-formitem>
        <s-formitem label="Fail" validateStatus="error" help="Should be combination of numbers & alphabets" hasFeedback>
            <s-input placeholder="unavailable choice" id="error2"></s-input>
        </s-formitem>
        <s-formitem label="Success" validateStatus="success" hasFeedback>
            <s-datepicker style="width: 100%;"></s-datepicker>
        </s-formitem>
        <s-formitem label="Success" validateStatus="success" hasFeedback>
            <s-select defaultValue="1">
                <s-selectoption value="1">Option 1</s-selectoption>
                <s-selectoption value="2">Option 1</s-selectoption>
                <s-selectoption value="3">Option 1</s-selectoption>
            </s-select>
        </s-formitem>
        <s-formitem label="Validating" validateStatus="validating" help="The information is being validated..." hasFeedback>
            <s-cascader defaultValue={{['1']}} options="{{[]}}"></s-cascader>
        </s-formitem>
        <s-formitem label="inline" style="margin-bottom: 0;">
            <s-formitem validateStatus="error" help="Please select the correct date" style="display: inline-block; width: calc(50% - 18px)" labelCol="{{{}}}" wrapperCol="{{{}}}">
                <s-datepicker></s-datepicker>
            </s-formitem>
            <span style="display: inline-block; width: 24px; text-align: center;">-</span>
            <s-formitem style="display: inline-block; width: calc(50% - 18px)" wrapperCol="{{{}}}" labelCol="{{{}}}">
                <s-datepicker></s-datepicker>
            </s-formitem>
        </s-formitem>
        <s-formitem label="Success" validateStatus="success" hasFeedback>
            <s-inputnumber style="width: 100%;"></s-inputnumber>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import Form from 'santd/form';
import Input from 'santd/input';
import DatePicker from 'santd/date-picker';
import Select from 'santd/select';
import Cascader from 'santd/cascader';
import InputNumber from 'santd/input-number';

export default {
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-select': Select,
        's-selectoption': Select.Option,
        's-cascader': Cascader,
        's-datepicker': DatePicker,
        's-inputnumber': InputNumber
    },
    initData () {
        return {
            formItemLayout: {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 5}
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 12}
                },
            }
        }
    }
}
</script>
```
