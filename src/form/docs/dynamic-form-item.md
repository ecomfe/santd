<text lang="cn">
#### 动态增减表单项
动态增加、减少表单项。
</text>

```html
<template>
  <div>
      <s-form on-submit="handleSubmit">
        <s-formitem
            s-for="item, index in keys trackBy item"
            label="{{index === 0 ? 'Passengers' : ''}}"
            wrapperCol="{{index === 0 ? formItemLayout.wrapperCol : formItemLayoutWithOutLabel.wrapperCol}}"
            labelCol="{{index === 0 ? formItemLayout.labelCol : {}}}"
            required="{{false}}"
            key="{{item}}"
        >
            <s-input decorator="{{decorators[index]}}" placeholder="passenger name" style="width: 60%; margin-right: 8px; display: inline-block;"></s-input>
            <s-icon s-if="keys.length > 1" class="dynamic-delete-button" type="delete" on-click="handleRemove(item)"></s-icon>
        </s-formitem>
        <s-formitem wrapperCol="{{formItemLayoutWithOutLabel.wrapperCol}}">
            <s-button type="dashed" on-click="handleAdd" style="width: 60%;">
                <s-icon type="plus"></s-icon>
                Add field
            </s-button>
        </s-formitem>
        <s-formitem wrapperCol="{{formItemLayoutWithOutLabel.wrapperCol}}">
            <s-button type="primary" htmlType="submit">Submit</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import {Form, Input, Icon, Button} from 'santd';

let id = 0;

export default Form.create({name: 'dynamic_form_item'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-icon': Icon,
        's-button': Button
    },
    initData () {
        return {
            formItemLayout: {
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 20}
                },
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 4}
                }
            },
            formItemLayoutWithOutLabel: {
                wrapperCol: {
                    xs: {span: 24, offset: 0},
                    sm: {span: 20, offset: 4}
                }
            }
        }
    },
    inited() {
        this.getFieldProps('keys', {initialValue: []});
    },
    computed: {
        keys() {
            const form = this.data.get('form');
            if (form) {
                return form.getFieldValue('keys');
            }
            return [];
        },
        decorators() {
            const keys = this.data.get('keys') || [];
            return keys.map((key, index) => {
                return {
                    name: 'names['+ key + ']',
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Please input passenger's name or delete this field."
                    }]
                }
            });
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        this.validateFields((err, values) => {
            if (!err) {
                const { keys, names } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => names[key]));
            }
        });
    },
    handleAdd() {
        const keys = this.getFieldValue('keys');
        const nextKeys = keys.concat(id++);

        this.setFieldsValue({
            keys: nextKeys
        });
    },
    handleRemove(k) {
        const keys = this.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }

        this.setFieldsValue({
            keys: keys.filter(key => key !== k)
        })
    }
})
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all .3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
```
