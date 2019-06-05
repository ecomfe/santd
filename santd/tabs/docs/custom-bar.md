<cn>
#### 自定义页签头
给页签头增加额外的内容。
</cn>

```html
<template>
    <div>
        <s-tabs
            defaultActiveKey="1"
            renderTabBar="{{renderTabBar}}"
        >
            <s-tabpane tab="Tab 1" key="1">Content of Tab Pane 1</s-tabpane>
            <s-tabpane tab="Tab 2" key="2">Content of Tab Pane 2</s-tabpane>
            <s-tabpane tab="Tab 3" key="3">Content of Tab Pane 3</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import Tabs from 'santd/tabs';

export default {
    components: {
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane,
    },
    initData() {
        return {
            renderTabBar(bar) {
                return san.defineComponent({
                    components: {
                        's-bar': bar
                    },
                    template: `<div>
                        <h2>I am a new bar.</h2>
                        <s-bar s-bind="{{props}}"></s-bar>
                    </div>`
                });
            }
        }
    }
}
</script>
```
