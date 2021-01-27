<text lang="cn">
#### 嵌套评论
评论可以嵌套。
</text>

```html
<template>
    <div>
        <s-pcomment>
            <s-pcomment>
                <s-pcomment></s-pcomment>
                <s-pcomment></s-pcomment>
            </s-pcomment>
        </s-pcomment>
    </div>
</template>
<script>
import san from 'san';
import moment from 'moment';
import {Comment, Icon, Avatar} from 'santd';

const pComment = san.defineComponent({
    template: `
        <template>
            <s-comment>
                <s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>
                <a slot="author">Han Solo</a>
                <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
                <template slot="actions">
                    <s-comment-action><span>Reply to</span></s-comment-action>
                </template>
                <span slot="datetime">{{datetime}}</span>
                <slot slot="nested"/>
            </s-comment>
        </template>
    `,
    components: {
        's-comment': Comment,
        's-comment-action': Comment.Action,
        's-icon': Icon,
        's-avatar': Avatar
    },
    initData() {
        return {
            datetime: moment().fromNow()
        };
    }
});
export default {
    components: {
        's-pcomment': pComment
    }
}
</script>
```
