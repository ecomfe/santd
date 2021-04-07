<text lang="cn">
#### 输入框组合
输入框的组合展现。
注意：使用 `compact` 模式时，不需要通过 `Col` 来控制宽度。
</text>

```html
<template>
  <div>
      <s-input-group size="large">
          <s-row gutter="{{8}}">
            <s-col span="{{5}}">
              <s-input defaultValue="0571" />
          </s-col>
            <s-col span="{{8}}">
              <s-input defaultValue="26888888" />
            </s-col>
        </s-row>
      </s-input-group>
      <br/>
      <s-input-group compact="{{true}}">
          <s-input style="width: 20%" defaultValue="0571" />
          <s-input style="width: 30%" defaultValue="26888888" />
    </s-input-group>
    <br/>
    <s-input-group compact="{{true}}">
        <s-select defaultValue="zhejiang" style="width:120px">
          <s-select-option value="zhejiang">Zhejiang</s-select-option>
          <s-select-option value="jiangsu">Jiangsu</s-select-option>
        </s-select>
        <s-input style="width: 50%" defaultValue="Xihu District, Hangzhou"/>
    </s-input-group>
    <br/>
    <s-input-group compact="{{true}}">
        <s-select defaultValue="Option" style="width:120px">
          <s-select-option value="Option">Option</s-select-option>
          <s-select-option value="Option">Option</s-select-option>
        </s-select>
        <s-input style="width: 50%" defaultValue="input content"/>
        <s-inputnumber/>
    </s-input-group>
    <br/>
    <s-input-group compact="{{true}}">
        <s-input style="width: 50%" defaultValue="input content"/>
        <s-datepicker />
    </s-input-group>
    <br/>
    <s-input-group compact="{{true}}">
        <s-select defaultValue="Option1-1" style="width:120px">
          <s-select-option value="Option1-1">Option1-1</s-select-option>
          <s-select-option value="Option1-2">Option1-2</s-select-option>
        </s-select>
        <s-select defaultValue="Option2-1" style="width:120px">
          <s-select-option value="Option2-1">Option2-1</s-select-option>
          <s-select-option value="Option2-2">Option2-2</s-select-option>
        </s-select>
    </s-input-group>
  </div>
</template>
<script>
import {Input, Icon, Grid, Select, InputNumber, DatePicker} from 'santd';

export default {
    components: {
        's-input': Input,
        's-input-group': Input.Group,
        's-row': Grid.Row,
        's-col': Grid.Col,
        's-select': Select,
        's-select-option': Select.Option,
        's-inputnumber': InputNumber,
        's-datepicker': DatePicker
    }
}
</script>
```
