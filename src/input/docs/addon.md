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
            <s-input defaultValue="mysite" addonBefore="{{addonBefore}}" addonAfter="{{addonAfter}}" />
        </div>

        <div style="margin-bottom: 16px">
            <s-input addonAfter="{{addonIcon}}" defaultValue="mysite" />
        </div>
    </div>
</template>
<script>
import san from 'san';
import Input from 'santd/input';
import Icon from 'santd/icon';
import Select from 'santd/select';

export default {
    components: {
        's-input': Input
    },
    initData() {
        return {
            addonBefore() {
                const BeforeComponent = san.defineComponent({
                    components: {
                        's-select': Select,
                        's-select-option': Select.Option
                    },
                    template: `
                        <div>
                            <s-select defaultValue="http://" style="width:90px">
                              <s-select-option value="http://">http://</s-select-option>
                              <s-select-option value="https://">https://</s-select-option>
                            </s-select>
                        <div>
                    `
                });
                return new BeforeComponent();
            },
            addonAfter() {
                const AfterComponent = san.defineComponent({
                    components: {
                        's-select': Select,
                        's-select-option': Select.Option
                    },
                    template: `
                    <div>
                        <s-select defaultValue=".com" style="width:90px">
                            <s-select-option value=".com">.com</s-select-option>
                            <s-select-option value=".jp">.jp</s-select-option>
                            <s-select-option value=".cn">.cn</s-select-option>
                            <s-select-option value=".org">.org</s-select-option>
                        </s-select>
                    <div>
                    `
                });
                return new AfterComponent();
            },
            addonIcon() {
                const IconComponent = san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <span>
                            <s-icon slot="gAfter" type="setting"></s-icon>
                        </span>
                    `
                });
                return new IconComponent();
            }
        }
    }
}
</script>
```
