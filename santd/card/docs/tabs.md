<text lang="cn">
#### 带页签的卡片
可承载更多内容。
</text>

```html
<template>
    <div>
        <s-card
            hoverable
            tabList="{{tabList}}"
            on-tabChange="onTabChange">
            <p>{{contentList[selectedTab]}}</p>
        </s-card>
    </div>
</template>
<script>
import Card from 'santd/card';

export default {
    components: {
        's-card': Card
    },
    initData() {
        return {
            tabList: [{
                key: 'tab1',
                tab: 'tab1',
            }, {
                key: 'tab2',
                tab: 'tab2'
            }],
            contentList: {
                tab1: 'content1',
                tab2: 'content2',
            },
            selectedTab: 'tab1'
        }
    },
    onTabChange(key) {
        console.log('onTabChange', key);
        this.data.set('selectedTab', key);
    }
}
</script>
```
