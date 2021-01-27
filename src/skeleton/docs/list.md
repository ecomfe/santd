<text lang="cn">
#### 列表
在列表组件中使用加载占位符。
</text>

```html
<template>
    <div class="demo-list">
        <s-switcher checked="{{!loading}}" on-change="onChange"/>
        <s-list itemLayout="vertical" size="large" dataSource="{{listData}}">
            <s-list-item slot="renderItem" key="{{item.title}}">
                <s-skeleton loading="{{loading}}" active="{{true}}" avatar="{{true}}"/>
                <ul slot="actions" class="{{prefixCls}}-item-action" s-if="!loading">
                    <li><s-icon type="star-o" style="margin-right: 8px;" />156</li>
                    <li><s-icon type="like-o" style="margin-right: 8px;" />156</li>
                    <li><s-icon type="message" style="margin-right: 8px;" />2</li>
                </ul>
                <s-list-item-meta s-if="!loading" description="{{item.description}}">
                    <s-avatar slot="avatar" src="{{item.avatar}}"/>
                    <a slot="title" href="{{item.href}}">{{item.title}}</a>
                </s-list-item-meta>
                {{!loading ? item.content : ''}}
                <img s-if="!loading" slot="extra" width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>
            </s-list-item>
        </s-list>
    </div>
</template>

<script>
import san from 'san';
import {Skeleton, Avatar, Icon, List, Switch} from 'santd';

const listData = [];
for (let i = 0; i < 3; i++) {
    listData.push({
        href: 'javascript:;',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    });
}

export default {
    components: {
        's-icon': Icon,
        's-avatar': Avatar,
        's-list': List,
        's-list-item': List.Item,
        's-list-item-meta': List.Item.Meta,
        's-skeleton': Skeleton,
        's-switcher': Switch
    },
    initData() {
        return {
            loading: true,
            listData
        };
    },
    onChange(checked) {
        this.data.set('loading', !checked);
    }
}
</script>
```
