<cn>
#### 基本用法
最基本的用法，展示了 `dataSource`、`targetKeys`、每行的渲染函数 `render` 以及回调函数 `on-change` `on-selectChange` `on-scroll`的用法
</cn>

```html
<template>
  <div>
    <s-transfer
        disabled="{{disabled}}"
        dataSource="{{mockData}}"
        targetKeys="{{targetKeys}}"
        render="{{render}}"
        titles="{{['Source', 'Target']}}"
        on-selectChange="handleSelectChange"
        on-change="handleChange"
        on-search="handleSearch"
        on-scroll="handleScroll"
        selectedKeys="{{selectedKeys}}">
    </s-transfer>
    <s-switch
        on-change="onSwitch"
        checkedChildren="disabled"
        unCheckedChildren="disabled"
        style="margin-top: 16px"/>
  </div>
</template>
<script>

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
  });
}

const oriTargetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

import transfer from 'santd/transfer';
import Switch from 'santd/switch';
export default {
    initData() {
        return {
            mockData: mockData,
            targetKeys: oriTargetKeys,
            render: item => item.title,
            filterOption: (inputValue, option) => option.description.indexOf(inputValue) > -1,
            selectedKeys: ['1', '2', '3', '4']
        };
    },
    components: {
        's-transfer': transfer,
        's-switch': Switch
    },
    handleChange(param) {
        console.log('on-change', param);
    },
    handleSearch(param) {
        console.log('on-search', param);
    },
    handleSelectChange(param) {
        console.log('on-selectChange', param);
    },
    handleScroll(param) {
        console.log('on-scroll', param);
    },
    onSwitch(checked) {
        this.data.set('disabled', checked);
    }
}
</script>
```