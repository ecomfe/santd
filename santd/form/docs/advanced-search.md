<cn>
#### 高级搜索
三列栅格式的表单排列方式，常用于数据表格的高级搜索。
有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。
</cn>

```html
<template>
    <div>
        <searchform></searchform>
        <div className="search-result-list">Search Result List</div>
  </div>
</template>
<script>
import Form from 'santd/form';
import Input from 'santd/input';
import Button from 'santd/button';
import Row from 'santd/row';
import Col from 'santd/col';
import Icon from 'santd/icon';

const decorator = [];
for (let i = 0; i < 10; i++) {
    decorator.push({
        name: 'field_' + i,
        rules: [{
            required: true,
            message: 'Input something!'
        }]
    })
}

const AdvancedSearchForm = {
    components: {
        's-form': Form,
        's-formitem': Form.FormItem,
        's-row': Row,
        's-col': Col,
        's-input': Input,
        's-button': Button,
        's-icon': Icon
    },
    initData() {
        return {
            decorator: decorator,
            expand: false
        }
    },
    computed: {
        count() {
            return this.data.get('expand') ? 10 : 6;
        }
    },
    handleSearch(e) {
        e.preventDefault();
        const form = this.data.get('form');
        form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    },
    handleReset() {
        const form = this.data.get('form');
        form.resetFields();
    },
    handleToggle() {
        const expand = this.data.get('expand');
        this.data.set('expand', !expand);
    },
    template: `<div><s-form
        class="san-advanced-search-form"
        on-submit="handleSearch"
    >
        <s-row gutter="{{24}}">
            <s-col span="{{8}}" key="{{i}}" s-for="field, index in decorator" style="{{index < count ? 'display: block;' : 'display: none;'}}">
                <s-formitem label="{{'filed ' + index}}">
                    <s-input decorator="{{field}}" placeholder="placeholder"></s-input>
                </s-formitem>
            </s-col>
        </s-row>
        <s-row>
            <s-col span="{{24}}" style="text-align: right;">
                <s-button type="primary" htmlType="submit">Search</s-button>
                <s-button style="margin-left: 8px;" on-click="handleReset">Clear</s-button>
                <a style="margin-left: 8px; font-size: 12px;" on-click="handleToggle">Collapse</a>
            </s-col>
        </s-row>
    </s-form></div>`
};

const wrappedAdvancedSearchForm = Form.create({name: 'advanced_search'})(AdvancedSearchForm);

export default {
    components: {
        searchform: wrappedAdvancedSearchForm
    }
}
</script>
<style>
.san-form.san-advanced-search-form {
    padding: 24px;
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
}

.san-advanced-search-form .san-form-item .san-row {
    display: flex;
}

.search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}
</style>
```
