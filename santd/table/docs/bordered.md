<cn>
#### 带边框
添加表格边框线，页头和页脚。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            title={{title}}
            footer={{footer}}
            bordered
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
export default {
    components: {
        's-table': table,
    },
    initData() {
        return {
            title() {
                return 'Header'
            },
            footer() {
                return 'Footer'
            },
            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    render() {
                        return san.defineComponent({
                            template: `<a href="javascript:;">{{text}}</a>`
                        });
                    }
                },
                {
                    title: 'Cash Assets',
                    dataIndex: 'money',
                    className: 'column-money'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                }
            ],
            data: [{
                key: '1',
                name: 'John Brown',
                money: '￥300,000.00',
                address: 'New York No. 1 Lake Park',
            }, {
                key: '2',
                name: 'Jim Green',
                money: '￥1,256,000.00',
                address: 'London No. 1 Lake Park',
            }, {
                key: '3',
                name: 'Joe Black',
                money: '￥120,000.00',
                address: 'Sidney No. 1 Lake Park',
            }]
        }
    },
}
</script>
```
