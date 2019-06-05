<cn>
#### 带搜索框
带搜索框的穿梭框，可以自定义搜索函数。
</cn>

```html
<template>
  <div>
    <s-transfer
        dataSource="{{mockData}}"
        targetKeys="{{targetKeys}}"
        render="{{render}}"
        filterOption="{{filterOption}}"
        showSearch>
    </s-transfer>
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
export default {
    initData() {
        return {
            mockData: mockData,
            targetKeys: oriTargetKeys,
            render: item => item.title,
            filterOption: (inputValue, option) => option.description.indexOf(inputValue) > -1
        };
    },
    components: {
        's-transfer': transfer
    }
}
</script>
```