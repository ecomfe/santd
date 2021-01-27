src/form/README.md <text lang="cn">
#### 分页器
选择不同配置组合查看效果
</text>

```html
<template>
    <div id="components-table-demo-size">
        <h4>Middle size table</h4>
        <div style="margin-bottom: 30px">
            <label>Pagination Top: </label>
            <s-group defaultValue="topLeft" on-change="handleChangeTop" name="button1">
                <s-button value="topLeft">topLeft</s-button>
                <s-button value="topCenter">topCenter</s-button>
                <s-button value="topRight">topRight</s-button>
            </s-group>
            <label>Pagination Bottom:</label>
            <s-group defaultValue="bottomLeft" on-change="handleChangeBottom"  name="button1">
                <s-button value="bottomLeft">bottomLeft</s-button>
                <s-button value="bottomCenter">bottomCenter</s-button>
                <s-button value="bottomRight">bottomRight</s-button>
            </s-group>
        </div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            size="middle"
            pagination="{{pagination]}}"
        ></s-table>
    </div>
</template>
<script>
import {Table, Radio} from 'santd';

export default {
    components: {
        's-table': Table,
        's-radio': Radio,
        's-group': Radio.Group,
        's-button': Radio.Button
    },
    handleChangeTop(e) {
        let topVal = e.target.value;
        this.data.set('pagination.position[0]', topVal);
    },
    handleChangeBottom(e) {
        let topVal = e.target.value;
        this.data.set('pagination.position[1]', topVal);
    },
    initData() {
        return {
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name'
                },
                {
                    title: 'Age',
                    dataIndex: 'age'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                }
            ],
            pagination: {
                pageSize: 5,
                current: 8,
                total: 30,
                position: ['topLeft', 'bottomLeft']
            },
            data: [
                {
                    key: '1',
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                }
            ]
        }
    },
}
</script>
```
