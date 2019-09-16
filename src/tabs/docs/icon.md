<text lang="cn">
#### 图标
有图标的标签。
</text>

```html
<template>
    <div>
        <s-tabs defaultActiveKey="2">
            <s-tabpane key="1">
                <template slot="tab">
                    <s-icon type="apple" />Tab 1
                </template>
                Tab 1
            </s-tabpane>
            <s-tabpane key="2">
                <template slot="tab">
                    <s-icon type="android" />Tab 2
                </template>
                Tab 2
            </s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import san from 'san';
import tabs from 'santd/tabs';
import icon from 'santd/icon';

export default {
    components: {
        's-tabs': tabs,
        's-tabpane': tabs.TabPane,
        's-icon': icon
    }
}
</script>
```
