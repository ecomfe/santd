<text lang="cn">
#### 水平登录栏
水平登录栏，常用在顶部导航栏中。
</text>

```html
<template>
  <div>
      <s-form layout="inline" on-submit="handleSubmit">
        <s-formitem validateStatus="{{userNameError ? 'error' : ''}}" help="{{userNameError}}">
            <s-input placeholder="username" decorator="{{userNameDecorator}}">
                <s-icon type="user" style="color: rgba(0, 0, 0, .25);" slot="prefix" />
            </s-input>
        </s-formitem>
        <s-formitem validateStatus="{{passwordError ? 'error': ''}}" help="{{passwordError}}">
            <s-input placeholder="password" type="password" decorator="{{passwordDecorator}}">
                <s-icon type="lock" style="color: rgba(0, 0, 0, .25);" slot="prefix" />
            </s-input>
        </s-formitem>
        <s-formitem>
            <s-button type="primary" htmlType="submit" disabled="{{submitDisabled}}">Log in</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import Form from 'santd/form';
import Input from 'santd/input';
import Icon from 'santd/icon';
import Button from 'santd/button';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default Form.create({})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-icon': Icon,
        's-button': Button
    },
    computed: {
        userNameError() {
            const form = this.data.get('form');
            return form && form.isFieldTouched('userName') && form.getFieldError('userName') || '';
        },
        passwordError() {
            const form = this.data.get('form');
            return form && form.isFieldTouched('password') && form.getFieldError('password') || '';
        },
        submitDisabled() {
            const form = this.data.get('form');
            return form && hasErrors(form.getFieldsError());
        }
    },
    attached() {
        this.validateFields();
    },
    initData () {
        return {
            userNameDecorator: {
                name: 'userName',
                rules: [{required: true, message: 'Please input your username!'}]
            },
            passwordDecorator: {
                name: 'password',
                rules: [{required: true, message: 'Please input your password!'}]
            }
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        this.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
});
</script>
```
