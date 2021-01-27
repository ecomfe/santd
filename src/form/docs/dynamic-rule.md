<text lang="cn">
#### 动态校验规则
根据不同情况执行不同的校验规则。
</text>

```html
<template>
  <div>
      <s-form>
        <s-formitem label="Name" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
            <s-input placeholder="please input your name" decorator="{{usernameDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Nickname" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
            <s-input placeholder="please input your nickname" decorator="{{nicknameDecorator}}"></s-input>
        </s-formitem>
        <s-formitem labelCol="{{formTailLayout.labelCol}}" wrapperCol="{{formTailLayout.wrapperCol}}">
            <s-checkbox checked="{{checkNick}}" on-change="handleChange">Nickame is required</s-checkbox>
        </s-formitem>
        <s-formitem labelCol="{{formTailLayout.labelCol}}" wrapperCol="{{formTailLayout.wrapperCol}}">
            <s-button type="primary" on-click="handleCheck">Check</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import {Form, Input, Checkbox, Button} from 'santd';

export default Form.create({name: 'dynamic_rule'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-button': Button,
        's-checkbox': Checkbox
    },
    initData () {
        return {
            checkNick: false,
            formItemLayout: {
                labelCol: {span: 4},
                wrapperCol: {span: 8}
            },
            formTailLayout: {
                labelCol: {span: 4},
                wrapperCol: {span: 8, offset: 4}
            },
            usernameDecorator: {
                name: 'username',
                rules: [{required: true, message: 'Please input your name'}]
            }
        }
    },
    computed: {
        nicknameDecorator() {
            const checkNick = this.data.get('checkNick');
            return {
                name: 'nickname',
                rules: [{required: checkNick, message: 'Please input your nickname'}]
            };
        }
    },
    handleChange(e) {
        this.data.set('checkNick', e.target.checked);
        this.nextTick(() => {
            this.validateFields(['nickname'], {force: true});
        })
    },
    handleCheck() {
        const form = this.data.get('form');
        form.validateFields((err) => {
            if (!err) {
                console.info('success');
            }
        });
    }
})
</script>
<style>
.login-form-forgot {
    float: right;
}
.login-form-button {
    width: 100%;
}
</style>
```
