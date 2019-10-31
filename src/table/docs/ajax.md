<text lang="cn">
#### 远程加载数据
这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 `onFilter` 和 `sorter` 函数，而是在把筛选和排序的参数发到服务端来处理。

注意，此示例使用 [模拟接口](https://randomuser.me/)，展示数据可能不准确，请打开网络面板查看请求。
</text>

```html
<template>
    <div>
        <s-table
            rowSelection="{{rowSelection}}"
            columns="{{columns}}"
            data="{{data}}"
            on-change="handleTableChange"
            loading="{{loading}}"
            pagination="{{pagination}}"
        >
            <a href="javascript:;" slot="name">{{text.first}} {{text.last}}</a>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
import axios from 'axios';
export default {
    components: {
        's-table': table
    },
    attached() {
        this.fetch();
    },
    handleTableChange(payload) {
        this.data.set('pagination', payload.pagination);
        this.fetch({
            page: payload.pagination.current,
            sortField: payload.sorter.field,
            sortOrder: payload.sorter.order,
            ...payload.filters
        });
    },
    fetch(params) {
        this.data.set('loading', true);
        axios({
            method: 'get',
            url: 'https://randomuser.me/api',
            params: {
                results: 10,
                ...params
            },
            type: 'json'
            }).then(res => {
                this.data.set('loading', false);
                this.data.set('data', res.data.results);
                this.data.set('pagination.total', 200, {force: true});
            });
    },
    initData() {
        return {
            pagination: {},
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
                scopedSlots: {render: 'name'},
                width: '20%'
            }, {
                title: 'Gender',
                dataIndex: 'gender',
                width: '20%'
            }, {
                title: 'Email',
                dataIndex: 'email',
            }]
        }
    }
}
</script>
```
