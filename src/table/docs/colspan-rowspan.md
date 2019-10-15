<text lang="cn">
#### 表格行/列合并
表头只支持列合并，使用 column 里的 colSpan 进行设置。

表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。
</text>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            bordered="{{true}}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import table from 'santd/table';
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {}
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};
const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'London No. 2 Lake Park',
}, {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002,
    address: 'Dublin No. 2 Lake Park',
}];
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text, row, index) => {
            const children = san.defineComponent({
                template: `<a href="javascript:;">{{text}}</a>`
            });
            if (index < 4) {
                return children;
            }
            return {
                children: children,
                props: {
                    colSpan: 5
                }
            }
        }
    },
    {
        title: 'Age',
        dataIndex: 'age',
        render: renderContent
    },
    {
        title: 'Home Phone',
        dataIndex: 'tel',
        colSpan: 2,
        render: (value, row, index) => {
            const obj = {
                children: value,
                props: {}
            };
            if (index === 2) {
                obj.props.rowSpan = 2;
            }
            if (index ===3) {
                obj.props.rowSpan = 0;
            }
            if (index === 4) {
                obj.props.colSpan = 0;
            }
            return obj;
        }
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        colSpan: 0,
        render: renderContent
    },
    {
        title: 'Address',
        dataIndex: 'address',
        render: renderContent
    }
]
export default {
    components: {
        's-table': table,
    },
    initData() {
        return {
            columns: columns,
            data: data
        }
    },
}
</script>
```
