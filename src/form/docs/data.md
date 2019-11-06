<text lang="cn">
#### 表单数据存储于上层组件

通过使用 onFieldsChange 与 mapPropsToFields，可以把表单的数据存储到上层组件或者 Redux、san-store 中
注意：mapPropsToFields 里面返回的表单域数据必须使用 Form.createFormField 包装。
</text>

```html
<template>
    <div>
        <s-customizedform s-bind="{{fields}}" on-change="handleChange"></s-customizedform>
        <pre class="language-bash">
            {{code}}
        </pre>
  </div>
</template>
<script>
import san from 'san';
import Form from 'santd/form';
import Input from 'santd/input';

const CustomizedForm = Form.create({
    name: 'global_state',
    onFieldsChange(form, changedFields, allFields) {
        form.fire('change', changedFields);
    },
    mapPropsToFields(form) {
        const username = form.data.get('username');
        return {
            username: Form.createFormField({
                value: username.value
            })
        };
    },
    onValuesChange(form, values, allValues) {
        console.log(values);
    }
})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input
    },
    initData () {
        return {
            userNameDecorator: {
                name: 'username',
                rules: [{required: true, message: 'Please input your username!'}]
            }
        }
    },
    template: `<div>
        <s-form layout="inline">
            <s-formitem label="username">
                <s-input decorator="{{userNameDecorator}}"/>
            </s-formitem>
        </s-form>
    </div>`
});

export default {
    components: {
        's-customizedform': CustomizedForm
    },
    computed: {
        userNameError() {
            const form = this.data.get('form');
            return form && form.isFieldTouched('userName') && form.getFieldError('userName') || '';
        },
        code() {
            return JSON.stringify(this.data.get('fields'), null, 2);
        }
    },
    initData () {
        return {
            fields: {
                username: {
                    value: 'franklin'
                }
            }
        }
    },
    handleChange(value) {
        this.data.set('fields', value);
    }
};
</script>
```
