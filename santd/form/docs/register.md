<cn>
#### 注册新用户
用户填写必须的信息以注册新用户。
</cn>

```html
<template>
  <div>
      <s-form labelCol="{{labelCol}}" wrapperCol="{{wrapperCol}}" on-submit="handleSubmit">
        <s-formitem label="E-mail">
            <s-input decorator="{{emailDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Password">
            <s-input type="password" decorator="{{passwordDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Confirm Password">
            <s-input type="password" decorator="{{confirmPasswordDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Nickname">
            <s-input decorator="{{nicknameDecorator}}"></s-input>
        </s-formitem>
        <s-formitem label="Habitual Residence">
            <s-cascader options={{residences}} decorator="{{residenceDecorator}}"></s-cascader>
        </s-formitem>
        <s-formitem label="Phone Number">
            <s-input decorator="{{phoneNumberDecorator}}" addonBefore="{{addonBefore}}"></s-input>
        </s-formitem>
        <s-formitem label="Captcha" extra="We must make sure that you are a human.">
            <s-row gutter={{8}}>
            <s-col span={{12}}>
                <s-input decorator="{{captchaDecorator}}"></s-input>
            </s-col>
            <s-col span={{12}}>
              <s-button>Get captcha</s-button>
            </s-col>
          </s-row>
        </s-formitem>
        <s-formitem wrapperCol="{{tailWrapperCol}}">
            <s-checkbox decorator="{{agreementDecorator}}">I have read the <a href="javascript:;">agreement</a></s-checkbox>
        </s-formitem>
        <s-formitem wrapperCol="{{tailWrapperCol}}">
            <s-button class="login-form-button" type="primary" htmlType="submit">Register</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import san from 'san';
import form from 'santd/form';
import Input from 'santd/input';
import Icon from 'santd/icon';
import Button from 'santd/button';
import Checkbox from 'santd/checkbox';
import Cascader from 'santd/cascader';
import Select from 'santd/select';
import Row from 'santd/row';
import Col from 'santd/col';

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake'
        }]
    }]
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
        }]
    }]
}];

export default form.create({name: 'register'})({
    components: {
        's-form': form,
        's-formitem': form.FormItem,
        's-input': Input,
        's-icon': Icon,
        's-button': Button,
        's-checkbox': Checkbox,
        's-cascader': Cascader,
        's-select': Select,
        's-select-option': Select.Option,
        's-row': Row,
        's-col': Col
    },
    initData () {
        return {
            residences: residences,
            emailDecorator: {
                name: 'email',
                rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                }, {
                    required: true, message: 'Please input your E-mail!',
                }]
            },
            passwordDecorator: {
                name: 'password',
                rules: [{
                    required: true, message: 'Please input your password!',
                }, {
                    validator: this.validateToNextPassword.bind(this)
                }]
            },
            confirmPasswordDecorator: {
                name: 'confirm',
                rules: [{
                    required: true, message: 'Please confirm your password!',
                }, {
                    validator: this.compareToFirstPassword.bind(this),
                }]
            },
            nicknameDecorator: {
                name: 'nickname',
                rules: [{required: true, message: 'Please input your nickname!', whitespace: true}]
            },
            residenceDecorator: {
                name: 'residence',
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{type: 'array', required: true, message: 'Please select your habitual residence!'}]
            },
            phoneNumberDecorator: {
                name: 'phone',
                rules: [{required: true, message: 'Please input your phone number!'}]
            },
            addonBefore() {
                const BeforeComponent = san.defineComponent({
                    components: {
                        's-select': Select,
                        's-select-option': Select.Option
                    },
                    template: `
                        <div>
                            <s-select defaultValue="+86">
                              <s-select-option value="+86">+86</s-select-option>
                              <s-select-option value="+87">+87</s-select-option>
                            </s-select>
                        <div>
                    `
                });
                return new BeforeComponent();
            },
            captchaDecorator: {
                name: 'captcha',
                rules: [{required: true, message: 'Please input the captcha you got!'}]
            },
            agreementDecorator: {
                name: 'agreement',
                valuePropName: 'checked'
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            },
            tailWrapperCol: {
                xs: { span: 24, offset: 0},
                sm: { span: 16, offset: 8}
            }
        }
    },
    validateToNextPassword(rule, value, callback) {
        const form = this.data.get('form');
        if (value && this.data.get('confirmDirty')) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    },
    compareToFirstPassword(rule, value, callback) {
        const form = this.data.get('form');
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    },
    handleSubmit(e) {
        e.preventDefault();
        const form = this.data.get('form');
        form.validateFieldsAndScroll((err, values) => {
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
    width: 160px;
}
</style>
```
