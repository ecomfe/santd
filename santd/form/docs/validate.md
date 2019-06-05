<cn>
#### 校验其他组件
以上演示没有出现的表单控件对应的校验演示。
</cn>

```html
<template>
  <div>
      <s-form labelCol="{{formItemLayout.labelCol}}" wrapperCol="{{formItemLayout.wrapperCol}}" on-submit="handleSubmit">
        <s-formitem label="Plain Text">
            <span class="san-form-text">China</span>
        </s-formitem>
        <s-formitem label="Select" hasFeedback>
            <s-select placeholder="Please select a country" decorator="{{selectDecorator}}">
                <s-selectoption value="china">China</s-selectoption>
                <s-selectoption value="usa">U.S.A</s-selectoption>
            </s-select>
        </s-formitem>
        <s-formitem label="Select[multiple]">
            <s-select mode="multiple" placeholder="Please select favourite colors" decorator="{{selectMultipleDecorator}}">
                <s-selectoption value="red">Red</s-selectoption>
                <s-selectoption value="green">Green</s-selectoption>
                <s-selectoption value="blue">blue</s-selectoption>
            </s-select>
        </s-formitem>
        <s-formitem label="InputNumber">
            <s-inputnumber min="{{1}}" max="{{10}}" decorator="{{inputNumberDecorator}}"></s-inputnumber>
            <span class="san-form-text"> machines</span>
        </s-formitem>
        <s-formitem label="Switch" decorator="{{switchDecorator}}">
            <s-switch></s-switch>
        </s-formitem>
        <s-formitem label="Slider" decorator="{{sliderDecorator}}">
            <s-slider marks="{{{0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F'}}}"></s-slider>
        </s-formitem>
        <s-formitem label="Radio.Group">
            <s-radiogroup decorator="{{radioGroupDecorator}}">
                <s-radio value="a">item 1</s-radio>
                <s-radio value="b">item 2</s-radio>
                <s-radio value="c">item 3</s-radio>
            </s-radiogroup>
        </s-formitem>
        <s-formitem label="Radio.Button">
            <s-radiogroup decorator="{{radioButtonDecorator}}">
                <s-radiobutton value="a">item 1</s-radiobutton>
                <s-radiobutton value="b">item 2</s-radiobutton>
                <s-radiobutton value="c">item 3</s-radiobutton>
            </s-radiogroup>
        </s-formitem>
        <s-formitem label="Checkbox.Group">
            <s-checkboxgroup style="width: 100%;" decorator="{{checkboxGroupDecorator}}">
                <s-row>
                    <s-col span="{{8}}"><s-checkbox value="A">A</s-checkbox></s-col>
                    <s-col span="{{8}}"><s-checkbox value="B">B</s-checkbox></s-col>
                    <s-col span="{{8}}"><s-checkbox value="C">C</s-checkbox></s-col>
                    <s-col span="{{8}}"><s-checkbox value="D">D</s-checkbox></s-col>
                    <s-col span="{{8}}"><s-checkbox value="E">E</s-checkbox></s-col>
                    </s-col>
                </s-row>
            </s-checkboxgroup>
        </s-formitem>
        <s-formitem label="Rate">
            <s-rate decorator="{{rateDecorator}}"></s-rate>
        </s-formitem>
        <s-formitem label="Upload" extra="longgggggggggggggggggggggggggg">
            <s-upload decorator="{{uploadDecorator}}" name="logo" action="/upload" listType="picture">
                <s-button><s-icon type="upload">Click to upload</s-icon></s-button>
            </s-upload>
        </s-formitem>
        <s-formitem wrapperCol="{{{span: 12, offset: 6}}}">
            <s-button type="primary" htmlType="submit">Submit</s-button>
        </s-formitem>
      </s-form>
  </div>
</template>
<script>
import Form from 'santd/form';
import Select from 'santd/select';
import InputNumber from 'santd/input-number';
import Switch from 'santd/switch';
import Radio from 'santd/radio';
import Slider from 'santd/slider';
import Button from 'santd/button';
import Icon from 'santd/icon';
import Rate from 'santd/rate';
import Checkbox from 'santd/checkbox';
import Upload from 'santd/upload';
import Row from 'santd/row';
import Col from 'santd/col';

export default Form.create({name: 'validate_other'})({
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-select': Select,
        's-selectoption': Select.Option,
        's-inputnumber': InputNumber,
        's-switch': Switch,
        's-radio': Radio,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-slider': Slider,
        's-button': Button,
        's-icon': Icon,
        's-rate': Rate,
        's-checkbox': Checkbox,
        's-checkboxgroup': Checkbox.Group,
        's-upload': Upload,
        's-row': Row,
        's-col': Col
    },
    initData () {
        return {
            formItemLayout: {
                labelCol: {
                    span: 6
                },
                wrapperCol: {
                    span: 14
                },
            },
            selectDecorator: {
                name: 'select',
                rules: [{required: true, message: 'Please select your country!'}]
            },
            selectMultipleDecorator: {
                name: 'select_multiple',
                rules: [{required: true, message: 'Please select your favourite colors!'}]
            },
            inputNumberDecorator: {
                name: 'input_number',
                initialValue: 3
            },
            switchDecorator: {
                name: 'switch',
                valuePropName: 'checked'
            },
            sliderDecorator: {
                name: 'slider'
            },
            radioGroupDecorator: {
                name: 'radio_group'
            },
            radioButtonDecorator: {
                name: 'radio_button'
            },
            checkboxGroupDecorator: {
                name: 'checkbox_group',
                initialValue: ['A', 'B']
            },
            rateDecorator: {
                name: 'rate',
                initialValue: 3.5
            },
            uploadDecorator: {
                name: 'upload',
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
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
    normFile(e) {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
})
</script>
```
