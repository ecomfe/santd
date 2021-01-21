<text lang="cn">
#### 响应式的栅格列表
响应式的栅格列表。尺寸与 Layout Grid 保持一致。
</text>

```html
<template>
    <div>
        <s-list
            grid="{{
                {gutter:16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}
            }}"
            dataSource="{{data}}"
        >
            <s-list-item slot="renderItem">
                <s-card title="{{item.title}}">{{item.content}}</s-card>
           </s-list-item>
       </s-list>
    </div>
</template>
<script>
import {List, Card} from 'santd';

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
                {
                    title: 'santd Title 5',
                    content: 'Santd, content4!'
                },
                {
                    title: 'santd Title 6',
                    content: 'Santd, content4!'
                }
            ]
        }
    }
}
</script>
```
