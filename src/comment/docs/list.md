<text lang="cn">
#### 配合 List 组件
配合 List 组件展现评论列表。
</text>

```html
<template>
    <div>
        <s-list header="{{data.length}} replies" itemLayout="horizontal" dataSource="{{data}}">
            <li slot="renderItem">
                <s-comment>
                    <s-avatar slot="avatar" src="{{item.avatar}}" />
                    <a slot="author">{{item.author}}</a>
                    <p slot="content">{{item.content}}</p>
                    <span slot="datetime">{{item.datetime}}</span>
                    <template slot="actions">
                        <s-comment-action><span>Reply to</span></s-comment-action>
                    </template>
                </s-comment>
            </li>
        </s-lst>
    </div>
</template>
<script>
import Comment from 'santd/comment';
import Avatar from 'santd/avatar';
import List from 'santd/list';
import moment from 'moment';

const data = [{
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: `We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.`,
    datetime: moment().subtract(1, 'days').fromNow()
}, {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: `We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.`,
    datetime: moment().subtract(2, 'days').fromNow()
}];

export default {
    components: {
        's-comment': Comment,
        's-comment-action': Comment.Action,
        's-avatar': Avatar,
        's-list': List
    },
    initData() {
        return {
            data
        };
    }
}
</script>
```
