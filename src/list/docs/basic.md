<text lang="cn">
#### 基础列表
基础列表
</text>

```html
<template>
    <div>
        <s-list itemLayout="horizontal" dataSource="{{data}}">
            <s-list-item slot="renderItem">
                <s-list-item-meta
                    description="{{item.description}}"
                >
                    <s-avatar slot="avatar" src="{{item.src}}"></s-avatar>
                    <a slot="title" href="#">{{item.title}}</a>
                </s-list-item-meta>
            </s-list-item>
        </s-list>
    </div>
</template>
<script>
import {List, Avatar} from 'santd';

export default {
    components: {
        's-list': List,
        's-list-item': List.Item,
        's-list-item-meta': List.Item.Meta,
        's-avatar': Avatar
    },
    initData() {
        return {
            data: [
                {
                    title: 'santd Title 1',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Santd, a design language for background applications, is refined by Baidu Team'
                },
                {
                    title: 'santd Title 2',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Santd, a design language for background applications, is refined by Baidu Team'
                },
                {
                    title: 'santd Title 3',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Santd, a design language for background applications, is refined by Baidu Team'
                },
                {
                    title: 'santd Title 4',
                    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    description: 'Santd, a design language for background applications, is refined by Baidu Team'
                },
            ]
        }
    }
}
</script>
```
