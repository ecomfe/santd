<text lang="cn">
#### 预加载的卡片
数据读入前会有文本块样式。
</text>

```html
<template>
    <div>
        <s-switch on-change='onChange' />
        <s-card
            title="Card title"
            hoverable="{{true}}"
            style="width: 300px;margin-top: 16px;"
            loading="{{loading}}"
        >
            <template slot="extra">
                <a href="#">More</a>
            </template>
            <s-meta title="Europe Street beat" description="www.instagram.com">
                <template slot="avatar">
                    <s-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </template>
            </s-meta>
        </s-card>
    </div>
</template>
<script>
import Card from 'santd/card';
import Avatar from 'santd/avatar';
import Switch from 'santd/switch';

export default {
    components: {
        's-card': Card,
        's-meta': Card.Meta,
        's-avatar': Avatar,
        's-switch': Switch
    },
    initData() {
        return {
            loading: true
        }
    },
    onChange(checked) {
        this.data.set('loading', !checked);
        console.log(checked);
    }
}
</script>
```
