<cn>
#### 可编辑行
带行编辑功能的表格。
</cn>

```html
<template>
    <div>
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import santable from 'santd/table';
import input from 'santd/input';
import popconfirm from 'santd/popconfirm';

const editableCell = san.defineComponent({
    components: {
        's-input': input
    },
    handleChange(value) {
        this.fire('change', value);
    },
    template: `<div>
        <s-input s-if="editable" value="{{text}}" on-change="handleChange"/>
        <div on-click="handleEdit" s-else>
            {{text}}
        </div>
    </div>`
});

export default {
    components: {
        's-table': santable
    },
    handleEdit(key) {
        const data = this.data.get('data');
        const editable = data[key].editable || false;
        this.data.apply('data', (items) => {
            return items.map(item => {
                item.editable = item.key == key;
                return item;
            });
        });
    },
    handleCancel(key) {
        const data = this.data.get('data');
        const editable = data[key].editable || false;
        this.data.apply('data', (items) => {
            return items.map(item => {
                item.editable = item.key == key && false;
                return item;
            });
        });
    },
    handleChange(payload) {
        const data = this.data.get('data');
        const newData = [...data];
        if (newData[payload.key]) {
            newData[payload.key][payload.name] = payload.value;
        }
        this.data.set('newData', newData);
    },
    handleSave(key) {
        const data = this.data.get('newData') || this.data.get('data');
        const newData = data.map(item => {
            item.editable = false;
            return item;
        });
        this.data.set('data', newData);
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
                        handleChange(value) {
                            const record = this.data.get('record');
                            that.handleChange({key: record.key, value: value, name: 'name'});
                        },
                        template: `<div><s-editablecell text="{{text}}" editable="{{record.editable}}" on-change="handleChange"></s-editablecell></div>`
                    });

                }
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                render(text, record) {
                    return san.defineComponent({
                        components: {
                            's-editablecell': editableCell
                        },
                        handleChange(value) {
                            const record = this.data.get('record');
                            that.handleChange({key: record.key, value: value, name: 'age'});
                        },
                        template: `<div><s-editablecell text="{{text}}" editable="{{record.editable}}" on-change="handleChange"></s-editablecell></div>`
                    });
                }
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                render(text, record) {
                    return san.defineComponent({
                        components: {
                            's-editablecell': editableCell
                        },
                        handleChange(value) {
                            const record = this.data.get('record');
                            that.handleChange({key: record.key, value: value, name: 'address'});
                        },
                        template: `<div><s-editablecell text="{{text}}" editable="{{record.editable}}" on-change="handleChange"></s-editablecell></div>`
                    });
                }
            }, {
                title: 'Action',
                key: 'action',
                render(text, record) {
                    return san.defineComponent({
                        handleEdit() {
                            const record = this.data.get('record');
                            that.handleEdit(record.key);
                        },
                        handleCancel() {
                            const record = this.data.get('record');
                            that.handleCancel(record.key);
                        },
                        handleSave() {
                            const record = this.data.get('record');
                            that.handleSave(record.key);
                        },
                        components: {
                            's-popconfirm': popconfirm
                        },
                        template: `
                            <div>
                                <span s-if="record.editable">
                                    <a href="javascript:;" on-click="handleSave">Save</a>
                                    <a href="javascript:;" on-click="handleCancel">Cancel</a>
                                </span>
                                <a href="javascript:;" s-else on-click="handleEdit">Edit</a>
                            </div>
                        `
                    });
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
                }, {
                    key: '2',
                    name: 'Edward King 2',
                    age: '32',
                    address: 'London, Park Lane no. 2'
                }
            ]
        }
    }
}
</script>
```
