<text lang="cn">
#### 卡片式页签
另一种样式的页签，不提供对应的垂直样式。
</text>

```html
<template>
    <div >
        <s-tab type="card" defaultActiveKey="1">
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

export default {
    components: {
        's-tab': Tabs,
        's-tabpane': Tabs.TabPane
    }
}
</script>
```
