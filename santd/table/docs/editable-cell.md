<cn>
#### 可编辑单元格
带单元格编辑功能的表格。
</cn>

```html
<template>
    <div>
        <s-button type="primary" on-click="handleAdd">Add</s-button>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import santable from 'santd/table';
import button from 'santd/button';
import input from 'santd/input';
import popconfirm from 'santd/popconfirm';

const editableCell = san.defineComponent({
    components: {
        's-input': input
    },
    initData() {
        return {
            editable: false
        }
    },
    handleEdit() {
        const editable = this.data.get('editable');
        this.data.set('editable', !editable);
    },
    handleSave(value) {
        if (value) {
            this.data.set('text', value);
            this.handleEdit();
        }
    },
    template: `<div>
        <s-input s-if="editable" value="{{text}}" on-blur="handleSave"/>
        <div on-click="handleEdit" s-else>
            {{text}}
        </div>
    </div>`
});

export default {
    components: {
        's-table': santable,
        's-button': button
    },
    handleAdd() {
        const count = this.data.get('count');
        const data = this.data.get('data');
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        }
        this.data.push('data', newData);
        this.data.set('count', count + 1);
    },
    handleDelete(key) {
        const count = this.data.get('count');
        this.data.removeAt('data', key);
        this.data.set('count', count - 1);
    },
    initData() {
        const that = this;
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render(text, record) {
                    return san.defineComponent({
                        components: {
                            's-editablecell': editableCell
                        },
                        template: `<div><s-editablecell text="{{text}}"></s-editablecell></div>`
                    });

                }
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }, {
                title: 'Action',
                key: 'action',
                render(text, record) {
                    return san.defineComponent({
                        handleDelete() {
                            const record = this.data.get('record');
                            that.handleDelete(record.key);
                        },
                        components: {
                            's-popconfirm': popconfirm
                        },
                        template: `
                            <span>
                                <s-popconfirm title="Sure to delete?" on-confirm="handleDelete">
                                    <a href="javascript:;">Delete</a>
                                </s-popconfirm>
                            </span>
                        `
                    });
                }
            }],
            count: 2,
            data: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0'
                }, {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1'
                }
            ]
        }
    }
}
</script>
```
