<text lang="cn">
#### 基本评论
一个基本的评论组件，带有作者、头像、时间和操作。
</text>

```html
<template>
    <div>
        <s-comment>
            <s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>
            <a slot="author">Han Solo</a>
            <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
            <template slot="actions">
                <s-comment-action>
                    <span>
                        <s-tooltip title="Like">
                            <s-icon type="like" theme="{{action.type === 'liked' ? 'filled' : 'outlined'}}" on-click="handleLike" />
                        </s-tooltip>
                        <span style="padding-left: 5px; cursor: auto;">{{action.likes}}</span>
                    </span>
                </s-comment-action>
                <s-comment-action>
                    <span>
                        <s-tooltip title="DisLike">
                            <s-icon type="dislike" theme="{{action.type === 'disliked' ? 'filled' : 'outlined'}}" on-click="handleDislike" />
                        </s-tooltip>
                        <span style="padding-left: 5px; cursor: auto;">{{action.dislikes}}</span>
                    </span>
                </s-comment-action>
                <s-comment-action><span>Reply to</span></s-comment-action>
            </template>
            <span slot="datetime">{{datetime}}</span>
        </s-comment>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import {Comment, Icon, Avatar, Tooltip} from 'santd';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default {
    components: {
        's-comment': Comment,
        's-comment-action': Comment.Action,
        's-icon': Icon,
        's-avatar': Avatar,
        's-tooltip': Tooltip
    },
    initData() {
        return {
            action: {
                likes: 0,
                dislikes: 0,
                type: null
            },
            datetime: dayjs().fromNow()
        };
    },
    handleLike() {
        this.data.set('action', {
            likes: 1,
            dislikes: 0,
            type: 'liked'
        })
    },
    handleDislike() {
        this.data.set('action', {
            likes: 0,
            dislikes: 1,
            type: 'disliked'
        })
    }
}
</script>
```
