<codebox>
#### 表单布局
表单有三种布局

```html
<template>
    <div>
        <s-form layout="{{formLayout}}">
            <s-formitem label="Form Layout" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
                <s-radiogroup defaultValue="horizontal" value="{{formLayout}}" on-change="handleFormLayoutChange" name="layout">
                    <s-radiobutton value="horizontal">Horizontal</s-radiobutton>
                    <s-radiobutton value="vertical">Vertical</s-radiobutton>
                    <s-radiobutton value="inline">Inline</s-radiobutton>
                </s-radiogroup>
            </s-formitem>
            <s-formitem label="Field A" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
                <s-input placeholder="input placeholder"></s-input>
            </s-formitem>
            <s-formitem label="Field B" labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}">
                <s-input placeholder="input placeholder"></s-input>
            </s-formitem>
            <s-formitem labelCol="{{buttonItemLayout.labelCol}}" wrapperCol="{{buttonItemLayout.wrapperCol}}">
                <s-button type="primary">Submit</s-button>
            </s-formitem>
        </s-form>
  </div>
</template>
<script>
import {Form, Input, Radio, Button} from 'santd';

export default {
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-button': Button,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button
    },
    initData() {
        return {
            formLayout: 'horizontal'
        };
    },
    computed: {
        formItemLayout() {
            const formLayout = this.data.get('formLayout');
            return formLayout === 'horizontal'
                ? {labelCol: {span: 4}, wrapperCol: {span: 14}}
                : {}
        },
        buttonItemLayout() {
            const formLayout = this.data.get('formLayout');
            return formLayout === 'horizontal'
                ? {labelCol: {}, wrapperCol: {span: 14, offset: 4}}
                : {}
        }
    },
    handleFormLayoutChange(e) {
        this.data.set('formLayout', e.target.value);
    }
}
</script>
```
</codebox>
