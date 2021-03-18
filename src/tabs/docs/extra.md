<codebox>
#### 附加内容
可以在页签右边添加附加操作。

```html
<template>
    <div>
        <s-tabs defaultActiveKey="1">
            <span slot="tabBarExtraContent"><s-button>Extra Action</s-button></span>
            <s-tabpane tab="Tab 1" key="1">Content of Tab Pane 1</s-tabpane>
            <s-tabpane tab="Tab 2" key="2">Content of Tab Pane 2</s-tabpane>
            <s-tabpane tab="Tab 3" key="3">Content of Tab Pane 3</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import {Tabs, Button} from 'santd';

export default {
    components: {
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane,
        's-button': Button
    }
}
</script>
```
</codebox>
