<cn>
#### 竖排列表样式
通过设置 `itemLayout` 属性为 `vertical` 可实现竖排列表样式。
</cn>

```html
<template>
    <div>
        <s-list
            itemLayout="vertical"
            size="large"
            pagination="{{pagination}}"
            dataSource="{{listData}}"
        >
            <s-list-item slot="renderItem" key="{{item.title}}">
                <ul slot="actions" class="{{prefixCls}}-item-action">
                    <li><s-icon type="star-o" style="margin-right: 8px;" />156</li>
                    <li><s-icon type="like-o" style="margin-right: 8px;" />156</li>
                    <li><s-icon type="message" style="margin-right: 8px;" />2</li>
                </ul>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" alt="logo" width="272" slot="extra">
                <s-list-item-meta description="{{item.description}}">
                    <s-avatar src="{{item.avatar}}" slot="avatar"></s-avatar>
                    <a href="{{item.href}}" slot="title">{{item.title}}</a>
                </s-list-item-meta>
                {{item.content}}
            </s-list-item>
            <div slot="footer"><b>footer part</b></div>
        </s-list>
    </div>
</template>
<script>
import List from 'santd/list';
import Icon from 'santd/icon';
import Avatar from 'santd/avatar';

const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: '#',
        title: `San design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'San Design, a design language for background applications, is refined by Baidu App Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
}

export default {
    components: {
        's-icon': Icon,
        's-list': List,
        's-list-item': List.Item,
        's-list-item-meta': List.Item.Meta,
        's-avatar': Avatar
    },
    initData() {
        return {
            listData: listData,
            pagination: {
                onChange(page) {
                    console.log(page);
                },
                pageSize: 3
            }
        }
    }
}
</script>
```
