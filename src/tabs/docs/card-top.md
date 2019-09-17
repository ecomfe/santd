<text lang="cn">
#### 卡片式页签容器
用于容器顶部，需要一点额外的样式覆盖。
</text>

```html
<template>
    <div class="card-container" >
        <s-tab type="card" defaultActiveKey="1">
            <s-tabpane tab="Tab Title 1" key="1">
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
                <p>Content of Tab Pane 1</p>
            </s-tabpane>
            <s-tabpane tab="Tab Title 2" key="2">
                <p>Content of Tab Pane 2</p>
                <p>Content of Tab Pane 2</p>
                <p>Content of Tab Pane 2</p>
            </s-tabpane>
            <s-tabpane tab="Tab Title 3" key="3">
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
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

<style lang="less">
.card-container {
  background: #F5F5F5;
  overflow: hidden;
  padding: 24px;
}
.card-container .san-tabs-card .san-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container .san-tabs-card .san-tabs-content .san-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container .san-tabs-card san-tabs-bar {
  border-color: #fff;
}

.card-container .san-tabs-card .san-tabs-bar .san-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container .san-tabs-card .san-tabs-bar .san-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>
```
