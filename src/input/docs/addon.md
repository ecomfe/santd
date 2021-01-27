<text lang="cn">
#### 前置/后置标签
用于配置一些固定组合。
</text>

```html
<template>
    <div>
        <div style="margin-bottom: 16px">
            <s-input addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
        </div>
        <div style="margin-bottom: 16px">
            <s-input defaultValue="mysite">
                <s-select defaultValue="http://" style="width:90px" slot="addonBefore">
                    <s-select-option value="http://">http://</s-select-option>
                    <s-select-option value="https://">https://</s-select-option>
                </s-select>
                <s-select defaultValue=".com" style="width:90px" slot="addonAfter">
                    <s-select-option value=".com">.com</s-select-option>
                    <s-select-option value=".jp">.jp</s-select-option>
                    <s-select-option value=".cn">.cn</s-select-option>
                    <s-select-option value=".org">.org</s-select-option>
                </s-select>
            </s-input>
        </div>
        <div>
            <s-input defaultValue="mysite">
                <s-icon slot="addonAfter" type="setting" />
            </s-input>
        </div>
    </div>
</template>
<script>
import {Input, Icon, Select} from 'santd';

export default {
    components: {
        's-input': Input,
        's-select': Select,
        's-select-option': Select.Option,
        's-icon': Icon
    }
}
</script>
```
