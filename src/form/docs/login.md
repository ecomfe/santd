<text lang="cn">
#### 登录框
普通的登录框，可以容纳更多的元素。
</text>

```html
<template>
  <div style="width: 300px;">
      <s-form on-submit="handleSubmit" className="login-form">
        <s-formitem decorator="{{userNameDecorator}}">
            <s-input placeholder="username" decorator="{{userNameDecorator}}"></s-input>
        </s-formitem>
        <s-formitem decorator="{{passwordDecorator}}">
            <s-input placeholder="password" type="password" decorator="{{passwordDecorator}}"></s-input>
        </s-formitem>
        <s-formitem decorator="{{rememberDecorator}}">
            <s-checkbox decorator="{{rememberDecorator}}">Remember me</s-checkbox>
            <a class="login-form-forgot" href="">Forgot password</a>
            <s-button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </s-button>
            Or <a href="">register now!</a>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import san from 'san';
import Form from 'santd/form';
import Input from 'santd/input';
import Icon from 'santd/icon';
import Button from 'santd/button';
import Checkbox from 'santd/checkbox';

export default Form.create({name: 'normal_login'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-input': Input,
        's-icon': Icon,
        's-button': Button,
        's-checkbox': Checkbox
    },
    initData () {
        return {
            userPrefix() {
                const Prefix = san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <div>
                            <s-icon type="user"></s-icon>
                        </div>
                    `
                });
                return new Prefix();
            },
            passPrefix() {
                const Prefix = san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <div>
                            <s-icon type="lock"></s-icon>
                        </div>
                    `
                });
                return new Prefix();
            },
            userNameDecorator: {
                name: 'userName',
                rules: [{required: true, message: 'The name cannot be empty'}]
            },
            passwordDecorator: {
                name: 'password',
                rules: [{required: true, message: 'Please input your Password!'}]
            },
            rememberDecorator: {
                name: 'remember',
                valuePropName: 'checked',
                initialValue: true
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
