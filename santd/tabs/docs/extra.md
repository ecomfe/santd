<cn>
#### 附加内容
可以在页签右边添加附加操作。
</cn>

```html
<template>
    <div class="" >
        <s-tabs tabBarExtraContent="{{operations}}">
            <s-tabpane tab="Tab 1" key="1">Content of Tab Pane 1</s-tabpane>
            <s-tabpane tab="Tab 2" key="2">Content of Tab Pane 2</s-tabpane>
            <s-tabpane tab="Tab 3" key="3">Content of Tab Pane 3</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import Tabs from 'santd/tabs';
import Button from 'santd/button';

const operations = san.defineComponent({
    components: {
        's-button': Button
    },
    template: `<span><s-button>Extra Action</s-button></span>`
});

export default {
    components: {
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane
    },
    initData() {
        return {
            operations: operations
        }
    }
}
</script>
```
