<text lang="cn">
#### 图标
有图标的标签。
</text>

```html
<template>
    <div>
        <s-tabs defaultActiveKey="2">
            <s-tabpane key="1" tab="{{tab1}}">Tab 1</s-tabpane>
            <s-tabpane key="2" tab="{{tab2}}">Tab 2</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import tabs from 'santd/tabs';
import icon from 'santd/icon';

const tab1 = san.defineComponent({
    components: {
        's-icon': icon
    },
    template: `<span><s-icon type="apple"/>Tab 1</span>`
});

const tab2 = san.defineComponent({
    components: {
        's-icon': icon
    },
    template: `<span><s-icon type="android"/>Tab 2</span>`
});

export default {
    components: {
        's-tabs': tabs,
        's-tabpane': tabs.TabPane
    },
    initData() {
        return {
            tab1: tab1,
            tab2: tab2
        }
    }
}
</script>
```
