<text lang="cn">
#### 可编辑单元格
带单元格编辑功能的表格。
</text>

```html
<template>
    <div>
        <s-button type="primary" on-click="handleAdd">Add</s-button>
        <s-table
            columns="{{columns}}"
            data="{{data}}"
        >
            <template slot="name">
                <s-editablecell text="{{text}}" />
            </template>
            <template slot="operation">
                <s-popconfirm
                    s-if="data.length"
                    title="Sure to delete?"
                    on-confirm="handleDelete(index)"
                >
                    <a href="javascript:;">Delete</a>
                </s-popconfirm>
            </template>
        </s-table>
    </div>
</template>
<script>
import san from 'san';
import {Table, Button, Input, Popconfirm, Icon} from 'santd';

const EditableCell = san.defineComponent({
    components: {
        's-input': Input,
        's-icon': Icon
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
    template: `<div class="editable-cell">
        <div class="editable-cell-input-wrapper" s-if="editable">
            <s-input value="{{text}}" on-blur="handleSave"/>
            <s-icon type="check" class="editable-cell-icon-check" />
        </div>
        <div class="editable-cell-text-wrapper" s-else>
            {{text}}
            <s-icon type="edit" class="editable-cell-icon" on-click="handleEdit"/>
        </div>
    </div>`
});

export default {
    components: {
        's-table': Table,
        's-button': Button,
        's-popconfirm': Popconfirm,
        's-editablecell': EditableCell
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
            count: 2,
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                width: '30%',
                scopedSlots: {
                    render: 'name'
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
                scopedSlots: {
                    render: 'operation'
                }
            }],
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
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
```
