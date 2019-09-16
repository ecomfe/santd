<text lang="cn">
#### 大小
大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。(其实随意怎么用)
</text>

```html
<template>
    <div>
        <s-radiogroup value="{{size}}" on-change="handleChange" style="margin-bottom: 16px;" name="size">
            <s-radiobutton value="small">Small</s-radiobutton>
            <s-radiobutton value="default">Default</s-radiobutton>
            <s-radiobutton value="large">Large</s-radiobutton>
        </s-radiogroup>
        <s-tab size="{{size}}" defaultActiveKey="1">
            <s-tabpane tab="Tab 1" key="1">
                Content of Tab Pane 1
            </s-tabpane>
            <s-tabpane tab="Tab 2" key="2">
                Content of Tab Pane 2
            </s-tabpane>
            <s-tabpane tab="Tab 3" key="3">
                Content of Tab Pane 3
            </s-tabpane>
        </s-tab>
    </div>
</template>
<script>
import Tabs from 'santd/tabs';
import Radio from 'santd/radio';

export default {
    initData() {
        return {
            size: 'small'
        };
    },
    components: {
        's-tab': Tabs,
        's-tabpane': Tabs.TabPane,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button
    },
    handleChange(e) {
        this.data.set('size', e.target.value);
    },
}
</script>
```
