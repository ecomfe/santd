<text lang="cn">
#### 自定义筛选菜单
通过 `filterDropdown` 定义自定义的列筛选功能，并实现一个搜索列的示例
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            on-change="handleChange"
            s-ref="table"
        >
            <div slot="filterDropdown" style="padding: 8px;">
                <s-input
                    style="width: 188px; margin-bottom: 8px; display: block;"
                    placeholder="Search {{column.dataIndex}}"
                    value="{{selectedKeys[0]}}"
                    on-change="setSelectedKeys($event, column)"
                />
                <s-button
                    type="primary"
                    on-click="handleSearch(selectedKeys)"
                    icon="search"
                    size="small"
                    style="width: 90px; margin-right: 8px;"
                >Search</s-button>
                <s-button
                    on-click="handleReset(column)"
                    size="small"
                    style="width: 90px;"
                >Reset</s-button>
            </div>
            <s-icon
                slot="filterIcon"
                type="search"
                style="{{ color: filtered ? '#108ee9' : undefined }}"
            />
            <template slot="render">
                <span s-if="searchText">
                    <template s-for="fragment in getText(text)">
                        <mark
                            s-if="isSameText(fragment, searchText)"
                            class="highlight"
                        >{{fragment}}</mark>
                        <template s-else>{{fragment}}</template>
                    </template>
                </span>
                <template s-else>{{text}}</template>
            </template>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import Table from 'santd/table';
import Icon from 'santd/icon';
import Input from 'santd/input';
import Button from 'santd/button';

export default {
    components: {
        's-table': Table,
        's-icon': Icon,
        's-input': Input,
        's-button': Button
    },
    handleChange(pagination, filters, sorter) {
        console.log('params', pagination, filters, sorter);
    },
    setSelectedKeys(value, column) {
        this.ref('table').setSelectedKeys(value ? [value] : [], column);
    },
    handleSearch(selectedKeys) {
        this.ref('table').confirm();
        this.data.set('searchText', selectedKeys[0]);
    },
    handleReset(column) {
        this.data.set('searchText', '');
        this.ref('table').clearFilter(column);
    },
    isSameText(fragment, searchText) {
        return fragment.toLowerCase() === searchText.toLowerCase()
    },
    getText(text) {
        const searchText = this.data.get('searchText');
        return text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'));
    },
    initData() {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                scopedSlots: {
                    filterIcon: 'filterIcon',
                    filterDropdown: 'filterDropdown',
                    render: 'render'
                },
                onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase())
            }, {
                title: 'Age',
                dataIndex: 'age',
                scopedSlots: {
                    filterIcon: 'filterIcon',
                    filterDropdown: 'filterDropdown',
                    render: 'render'
                },
                onFilter: (value, record) => record.age.toString().toLowerCase().includes(value.toLowerCase())
            }, {
                title: 'Address',
                dataIndex: 'address',
                scopedSlots: {
                    filterIcon: 'filterIcon',
                    filterDropdown: 'filterDropdown',
                    render: 'render'
                },
                onFilter: (value, record) => record.address.toString().toLowerCase().includes(value.toLowerCase())
            }],
            data: [{
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }, {
                key: '4',
                name: 'Jim Red',
                age: 32,
                address: 'London No. 2 Lake Park',
            }]
        }
    }
}
</script>
```
