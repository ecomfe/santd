<text lang="cn">
#### 栅格列表
可以通过设置 `List` 的 `grid` 属性来实现栅格列表，`column` 可设置期望显示的列数。
</text>

```html
<template>
    <div>
        <s-list
            grid="{{{gutter:16, column:4}}}"
            dataSource="{{data}}"
        >
            <s-list-item slot="renderItem">
                <s-card title="{{item.title}}">{{item.content}}</s-card>
           </s-list-item>
       </s-list>
    </div>
</template>
<script>
import List from 'santd/list';
import Card from 'santd/card';

export default {
    components: {
        's-list': List,
        's-list-item': List.Item,
        's-card': Card
    },
    initData() {
        return {
            data: [
                {
                    title: 'santd Title 1',
                    content: 'Santd, content1!'
                },
                {
                    title: 'santd Title 2',
                    content: 'Santd, content2!'
                },
                {
                    title: 'santd Title 3',
                    content: 'Santd, content3!'
                },
                {
                    title: 'santd Title 4',
                    content: 'Santd, content4!'
                },
            ]
        }
    }
}
</script>
<style>
.title {
    width: 100%;
    height:35px;
    line-height: 35px;
    color:#666;
    border-bottom: 1px solid #ccc;
}
.content {
    width: 100%;
    height: 70px;
    color: #333;
}
</style>
```
