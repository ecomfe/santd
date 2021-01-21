<text lang="cn">
#### 支持更多内容配置
一种支持封面、头像、标题和描述信息的卡片。
</text>

```html
<template>
    <div>
        <s-card style="width: 300px" actions="{{['setting', 'edit', 'ellipsis']}}">
            <template slot="cover">
                <img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096030542&di=76297da1f83761c2bdd3741c767f73d8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc789ae0679f08202399f997c23929198%2F5bafa40f4bfbfbedc1a67c5a72f0f736afc31f13.jpg" />
            </template>
            <s-meta
                title="Card title"
                description="This is the description">
                <template slot="avatar">
                    <s-avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg" />
                </template>
            </s-meta>
            <template slot="setting">
                <s-icon type="setting" />
            </template>
            <template slot="edit">
                <s-icon type="edit" />
            </template>
            <template slot="ellipsis">
                <s-icon type="ellipsis"/>
            </template>
        </s-card>
    </div>
</template>
<script>
import {Card, Avatar, Icon} from 'santd';

export default {
    components: {
        's-card': Card,
        's-meta': Card.Meta,
        's-avatar': Avatar,
        's-icon': Icon
    }
}
</script>
```
