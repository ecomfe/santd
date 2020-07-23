<text lang="cn">
#### 基本用法
默认选中第一项。
</text>

```html
<template>
    <div>
        <s-tabs
            defaultActiveKey="1"
            on-change="handleChange"
        >
            <s-tabpane key="0">
                <span slot="tab">{{tabTitle}}</span>
                <span>{{content1}}</span>
            </s-tabpane>
            <s-tabpane key="1">
                <span slot="tab">Tab 1</span>
                <span>{{content2}}</span>
            </s-tabpane>
            <s-tabpane tab="Tab 2" key="2">Content of Tab Pane 2</s-tabpane>
            <s-tabpane tab="Tab 3" key="3">Content of Tab Pane 3</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import Tabs from 'santd/tabs';

export default {
    components: {
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane,
    },
    initData() {
        return {
            tabTitle: 'Tab-0',
            content1: 'I am content 1',
            content2: 'I am content 2'
        };
    },
    handleChange(key) {
        console.log('change', key);
    }
}
</script>
```
