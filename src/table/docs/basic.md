<text lang="cn">
#### 基本用法
简单的表格，最后一列是各种操作。
</text>

```html
<template>
    <div>
        <s-table data="{{data}}" columns="{{columns}}">
            <a slot="name" href="javascript:;">{{text}}</a>
            <span slot="customTitle"><s-icon type="smile-o" /> Name</span>
            <span slot="tags">
                <s-tag
                    s-for="tag in text"
                    color="{{tag ==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')}}"
                >
                    {{tag}}
                </s-tag>
            </span>
            <span slot="action">
                <a href="javascript:;">Invite 一 {{record.name}}</a>
                <s-divider type="vertical" />
                <a href="javascript:;">Delete</a>
                <s-divider type="vertical" />
                <a href="javascript:;" class="san-dropdown-link"> More actions <s-icon type="down" /> </a>
            </span>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import {Table, Tag, Divider, Icon} from 'santd';

export default {
    components: {
        's-table': Table,
        's-thead': Table.Thead,
        's-tbody': Table.Tbody,
        's-th': Table.Th,
        's-tr': Table.Tr,
        's-td': Table.Td,
        's-divider': Divider,
        's-tag': Tag,
        's-icon': Icon
    },
    initData() {
        return {
            columns: [{
                dataIndex: 'name',
                slots: {title: 'customTitle'},
                scopedSlots: {render: 'name'}
            }, {
                title: 'Age',
                dataIndex: 'age'
            }, {
                title: 'Address',
                dataIndex: 'address'
            }, {
                title: 'Tags',
                dataIndex: 'tags',
                scopedSlots: {render: 'tags'}
            }, {
                title: 'Action',
                key: 'action',
                scopedSlots: {render: 'action'}
            }],
            data: [
                {
                    key: '1',
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                    tags: ['nice', 'developer']
                },
                {
                    key: '2',
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                    tags: ['loser']
                },
                {
                    key: '3',
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04',
                    tags: ['cool', 'teacher']
                }
            ]
        }
    }
}
</script>
```
