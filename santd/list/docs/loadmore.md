<text lang="cn">
#### 加载更多
可通过 loadMore 属性实现加载更多功能。
</text>

```html
<template>
    <div>
        <s-list
            className="demo-loadmore-list"
            loading="{{initLoading}}"
            itemLayout="horizontal"
            dataSource="{{list}}"
            on-loadmore="onLoadMore"
        >
            <s-list-item slot="renderItem">
                <s-skeleton avatar loading="{{item.loading}}" active>
                    <s-list-item-meta description="San Design, a design language for background applications, is refined by Baidu App Team">
                        <s-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" slot="avatar"></s-avatar>
                        <a href="#" slot="title">{{item.title}}</a>
                    </s-list-item-meta>
                </s-skeleton>
            </s-list-item>
            <div
                s-if="!initLoading && !loading" slot="loadMore"
                style="text-align: center; margin-top: 12px; height: 32px; line-height: 32px;"
            ><s-button on-click="handleLoadMore">loading more</s-button></div>
        </s-list>
    </div>
</template>
<script>
import List from 'santd/list';
import Avatar from 'santd/avatar';
import Button from 'santd/button';
import Skeleton from 'santd/skeleton';

export default {
    components: {
        's-list': List,
        's-list-item': List.Item,
        's-list-item-meta': List.Item.Meta,
        's-avatar': Avatar,
        's-button': Button,
        's-skeleton': Skeleton
    },
    initData() {
        return {
            initLoading: true,
            loading: false,
            list: [],
            data: [],
            defaultData: [
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
    },
    getData(callback) {
        window.setTimeout(() => {
            const defaultData = this.data.get('defaultData');
            callback(defaultData);
        }, 2000);
    },
    attached() {
        this.getData((res) => {
            this.data.set('initLoading', false);
            res = res.map(item => {
                item.loading = false;
                return item;
            });
            this.data.set('list', res);
            this.data.set('data', res);
        });
    },
    handleLoadMore() {
        this.data.set('loading', true);
        this.data.push('list', {loading: true, title: true});

        this.getData((res) => {
            res = res.map(item => {
                item.loading = false;
                return item;
            });

            this.data.pop('list');
            res.forEach(item => {
                this.data.push('list', item);
            });
            this.data.set('loading', false);
        });
    }
}
</script>
```
