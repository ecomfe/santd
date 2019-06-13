<cn>
#### 配合form使用
配合 Form 使用
</cn>

```html
<template>
  <div>
    <s-form>
        <s-form-item label="Name" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
            <s-mention
                defaultSuggestions="{{suggestions}}"
                decorator="{{usernameDecorator}}"
            />
        </s-form-item>
        <s-form-item labelCol="{{formTailLayout.labelCol}}" wrapperCol="{{formTailLayout.wrapperCol}}">
            <s-button type="primary" on-click="onCheck">Check</s-button>
            <s-button type="primary" on-click="onReset($event)">Reset</s-button>
        </s-form-item>
    </s-form>

  </div>
</template>
<script>
import Mention from 'santd/mention';
import Form from 'santd/form';
import Button from 'santd/button';
import Input from 'santd/input';
export default Form.create({name: 'dynamic_rule'})({
    components: {
        's-mention': Mention,
        's-form': Form,
        's-form-item': Form.FormItem,
        's-button': Button,
        's-input': Input
    },
    initData() {
        return {
            suggestions: ['wangyongqing', 'mayihui', 'fuqiangqiang', 'zhangtingting', 'raowenjuan'],
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
        };
    },
    onCheck() {
        const form = this.data.get('form');
        form.validateFields((err) => {
            if (!err) {
                console.info('success');
            }
        });
    },
    onReset(e) {
        e.preventDefault();
        const form = this.data.get('form');
        form.resetFields();
    }
})
</script>
```
