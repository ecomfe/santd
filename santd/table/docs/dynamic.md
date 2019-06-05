<cn>
#### 动态控制表格属性
选择不同配置组合查看效果
</cn>

```html
<template>
    <div>
        <div>
            Bordered：<s-switch checked="{{bordered}}" on-change="handleBordered"></s-switch>
            Loading：<s-switch checked="{{loading}}" on-change="handleLoading"></s-switch>
            Title：<s-switch checked="{{hasTitle}}" on-change="handleTitle"></s-switch>
            Column Header：<s-switch checked="{{showHeader}}" on-change="handleShowHeader"></s-switch>
            Footer：<s-switch checked="{{hasFooter}}" on-change="handleFooter"></s-switch>
            FixedHeader：<s-switch checked="{{fixed}}" on-change="handleFixed"></s-switch>
            HasData：<s-switch checked="{{!!data.length}}" on-change="handleHasData"></s-switch>
        </div>
        <!--<div>
            Size：
            <s-group on-change="handleSizeChange($event)" button-style="outline">
                <s-button value="default">Default</s-button>
                <s-button value="middle">Middle</s-button>
                <s-button value="small">Small</s-button>
            </s-group>
        </div>-->
        <s-table
            columns="{{columns}}"
            dataSource="{{data}}"
            bordered="{{bordered}}"
            loading="{{loading}}"
            title="{{hasTitle ? title : ''}}"
            footer="{{hasFooter ? footer : ''}}"
            showHeader="{{showHeader}}"
            expandedRowRender="{{expandedRowRender}}"
            scroll="{{scroll}}"
            size="{{size}}"
        ></s-table>
    </div>
</template>
<script>
import san from 'san';
import santable from 'santd/table';
import form from 'santd/form';
import sanSwitch from 'santd/switch';
import radio from 'santd/radio';
import button from 'santd/button';

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
}

export default {
    components: {
        's-table': santable,
        's-switch': sanSwitch,
        's-radio': radio,
        's-group': radio.Group,
        's-button': button
    },
     handleBordered() {
        const bordered = this.data.get('bordered');
        this.data.set('bordered', !bordered);
    },
     handleLoading() {
        const loading = this.data.get('loading');
        this.data.set('loading', !loading);
    },
     handleTitle() {
        const hasTitle = this.data.get('hasTitle');
        this.data.set('hasTitle', !hasTitle);
    },
     handleShowHeader() {
        const showHeader = this.data.get('showHeader');
        this.data.set('showHeader', !showHeader);
    },
     handleFooter() {
        const hasFooter = this.data.get('hasFooter');
        this.data.set('hasFooter', !hasFooter);
    },
    handleFixed() {
        const fixed = this.data.get('fixed');
        this.data.set('scroll', !fixed ? {y: 240} : {});
        this.data.set('fixed', !fixed);
    },
    handleHasData() {
        const len = this.data.get('data').length;
        this.data.set('data', len ? [] : data);
    },
    initData() {
        return {
            bordered: false,
            loading: false,
            hasTitle: false,
            hasFooter: false,
            hasFooter: false,
            showHeader: true,
            title() {
                return 'Here is title';
            },
            footer() {
                return 'Here is footer';
            },
            expandable: true,
            expandedRowRender() {
                return san.defineComponent({
                    template: `
                        <p>{{record.description}}</p>
                    `
                })
            },
            scroll: {},
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
                title: 'Action',
                key: 'action',
                render() {
                    return san.defineComponent({
                        template: `
                            <span>
                                <a href="javascript:;">Invite {{record.name}}</a>
                                <a href="javascript:;">Delete</a>
                            </span>
                        `
                    });
                }
            }],
            data: data
        }
    }
}
</script>
```
