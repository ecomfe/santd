<cn>
#### 基本用法
最后一列是各种操作
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
import tag from 'santd/tag';
import divider from 'santd/divider';

export default {
    components: {
        's-table': santable,
        's-divider': divider,
        's-tag': tag
    },
    initData() {
        return {
            columns: [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render() {
                    return san.defineComponent({
                        template: `<a href="javascript:;">{{text}}</a>`
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
                title: 'Tags',
                key: 'tags',
                dataIndex: 'tags',
                render() {
                    return san.defineComponent({
                        components: {
                            's-tag': tag
                        },
                        computed: {
                            tags() {
                                const text = this.data.get('text');
                                return text.map(tag => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                    if (tag === 'loser') {
                                        color = 'volcano';
                                    }
                                    return {
                                        text: tag,
                                        color: color
                                    };
                                });
                            }
                        },
                        template: `
                            <span>
                                <s-tag s-for="tag in tags" color="{{tag.color}}" key="{{tag.text}}">{{tag.text}}</s-tag>
                            </span>
                        `
                    });
                }
            }, {
                title: 'Action',
                key: 'action',
                render(text, record) {
                    return san.defineComponent({
                        components: {
                            's-divider': divider
                        },
                        template: `
                            <span>
                                <a href="javascript:;">Invite {{record.name}}</a>
                                <s-divider type="vertical"></s-divider>
                                <a href="javascript:;">Delete</a>
                            </span>
                        `
                    });
                }
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
