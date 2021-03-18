<codebox>
#### 表格行/列合并
表头只支持列合并，使用 column 里的 colSpan 进行设置。

表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
            bordered="{{true}}"
        />
    </div>
</template>
<script>
import {Table} from 'santd';

const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        attrs: {}
    };
    if (index === 1) {
        obj.attrs.colSpan = 2;
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
            if (index < 4) {
                return text;
            }
            return {
                children: text,
                attrs: {
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
        render: (value, row, index) => {
            const obj = {
                children: value,
                attrs: {}
            };
            if (index === 2) {
                obj.attrs.rowSpan = 2;
            }
            if (index ===3) {
                obj.attrs.rowSpan = 0;
            }
            if (index === 4) {
                obj.attrs.colSpan = 0;
            }
            return obj;
        }
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Address',
        dataIndex: 'address'
    }
]
export default {
    components: {
        's-table': Table,
    },
    initData() {
        return {
            columns: columns,
            data: data
        }
    }
}
</script>
```
</codebox>
