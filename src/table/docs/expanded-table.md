<text lang="cn">
#### 嵌套子表格
展示每行数据更详细的信息。
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
        >
            <a slot="operation" href="javascript:;">Publish</a>
            <s-table
                slot="expandedRowRender"
                columns="{{innerColumns}}"
                data="{{innerData}}"
                pagination="{{false}}"
            >
                <span slot="status"><s-badge status="success" />Finished</span>
                <span slot="operation" class="table-operation">
                    <a href="javascript:;">Pause</a>
                    <a href="javascript:;">Stop</a>
                    <s-dropdown>
                        <s-menu slot="overlay" prefixCls="{{prefixCls}}">
                            <s-menu-item>Action 1</s-menu-item>
                            <s-menu-item>Action 2</s-menu-item>
                        </s-menu>
                        <a href="javascript:;"> More <s-icon type="down" /> </a>
                    </s-dropdown>
                </span>
            </s-table>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import Table from 'santd/table';
import Badge from 'santd/badge';
import Dropdown from 'santd/dropdown';
import Menu from 'santd/menu';

const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Platform', dataIndex: 'platform', key: 'platform'},
    {title: 'Version', dataIndex: 'version', key: 'version'},
    {title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum'},
    {title: 'Creator', dataIndex: 'creator', key: 'creator'},
    {title: 'Date', dataIndex: 'createdAt', key: 'createdAt'},
    {title: 'Action', key: 'operation', scopedSlots: {render: 'operation'}}
];

const data = [];
for (let i = 0; i < 3; ++i) {
    data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00'
    });
}

const innerColumns = [
    {title: 'Date', dataIndex: 'date', key: 'date'},
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Status', key: 'state', scopedSlots: {render: 'status'}},
    {title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'},
    {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        scopedSlots: {render: 'operation'}
    }
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
    innerData.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
    });
}

export default {
    components: {
        's-table': Table,
        's-badge': Badge,
        's-dropdown': Dropdown,
        's-menu': Menu,
        's-menu-item': Menu.Item
    },
    initData() {
        return {
            data,
            columns,
            innerColumns,
            innerData
        }
    }
}
</script>
```
