<text lang="cn">
#### 位置
有四个位置，`tabPosition="left|right|top|bottom"`。
</text>

```html
<template>
    <div>
        <div style="margin-bottom: 16px;">
            Tab position：
            <s-select value="{{tabPosition}}" on-change="handleChange" style="width: 100px;display: inline-block;vertical-align: middle;">
                <s-option value="top">top</s-option>
                <s-option value="bottom">bottom</s-option>
                <s-option value="left">left</s-option>
                <s-option value="right">right</s-option>
            </s-select>
        </div>
        <s-tab tabPosition="{{tabPosition}}" defaultActiveKey="1">
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
import Select from 'santd/select';
import Tabs from 'santd/tabs';

export default {
    initData() {
        return {
            tabPosition: 'bottom',
        };
    },
    components: {
        's-tab': Tabs,
        's-tabpane': Tabs.TabPane,
        's-select': Select,
        's-option': Select.Option
    },
    handleChange(value) {
        this.data.set('tabPosition', value[0]);
    }
}
</script>
```
