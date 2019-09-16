<text lang="cn">
#### 滑动
可以左右、上下滑动，容纳更多标签。
</text>

```html
<template>
    <div>
        <s-radiogroup on-change="handleModeChange" value="{{mode}}" style="margin-bottom: 8px;" name="mode">
            <s-radiobutton value="top">Horizontal</s-radiobutton>
            <s-radiobutton value="left">Vertical</s-radiobutton>
        </s-radiogroup>
        <s-tabs defaultActiveKey="1" tabPosition="{{mode}}" style="height: 220px;">
            <s-tabpane tab="Tab 1" key="1">Content of Tab Pane 1</s-tabpane>
            <s-tabpane tab="Tab 2" key="2">Content of Tab Pane 2</s-tabpane>
            <s-tabpane tab="Tab 3" key="3">Content of Tab Pane 3</s-tabpane>
            <s-tabpane tab="Tab 4" key="4">Content of Tab Pane 4</s-tabpane>
            <s-tabpane tab="Tab 5" key="5">Content of Tab Pane 5</s-tabpane>
            <s-tabpane tab="Tab 6" key="6">Content of Tab Pane 6</s-tabpane>
            <s-tabpane tab="Tab 7" key="7">Content of Tab Pane 7</s-tabpane>
            <s-tabpane tab="Tab 8" key="8">Content of Tab Pane 8</s-tabpane>
            <s-tabpane tab="Tab 9" key="9">Content of Tab Pane 9</s-tabpane>
            <s-tabpane tab="Tab 10" key="10">Content of Tab Pane 10</s-tabpane>
            <s-tabpane tab="Tab 11" key="11">Content of Tab Pane 11</s-tabpane>
            <s-tabpane tab="Tab 12" key="12">Content of Tab Pane 12</s-tabpane>
            <s-tabpane tab="Tab 13" key="13">Content of Tab Pane 13</s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import Tabs from 'santd/tabs';
import Radio from 'santd/radio';

export default {
    initData() {
        return {
            mode: 'top'
        };
    },
    components: {
        's-tabs': Tabs,
        's-tabpane': Tabs.TabPane,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button
    },
    handleModeChange(e) {
        this.data.set('mode', e.target.value);
    }
}
</script>
```
