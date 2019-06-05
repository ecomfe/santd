<cn>
#### 表单联动
使用 `setFieldsValue` 来动态设置其他控件的值。
</cn>

```html
<template>
  <div>
      <s-form labelCol="{{{span: 5}}}" wrapperCol="{{{span: 12}}}" on-submit="handleSubmit">
        <s-formitem label="Note">
            <s-input decorator="{{noteDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Gender">
            <s-select placeholder="select a option and change input test above" on-change="handleSelectChange" decorator="{{genderDecorator}}">
                <s-selectoption value="male">male</s-selectoption>
                <s-selectoption value="female">female</s-selectoption>
            </s-select>
        </s-formitem>
        <s-formitem>
            <s-button type="primary" htmlType="submit">Submit</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import Form from 'santd/form';
import Input from 'santd/input';
import Button from 'santd/button';
import Select from 'santd/select';

export default Form.create({name: 'coordinated'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-button': Button,
        's-select': Select,
        's-selectoption': Select.Option
    },
    initData () {
        return {
            noteDecorator: {
                name: 'note',
                rules: [{required: true, message: 'Please input your note!'}]
            },
            genderDecorator: {
                name: 'gender',
                rules: [{required: true, message: 'Please select your gender!'}]
            }
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        const form = this.data.get('form');
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    },
    handleSelectChange(value) {
        console.log(value);
        const form = this.data.get('form');
        form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
        });
    }
})
</script>
```
