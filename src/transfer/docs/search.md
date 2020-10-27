<text lang="cn">
#### 带搜索框
带搜索框的穿梭框，可以自定义搜索函数。
</text>

```html
<template>
    <div>
        <s-transfer
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            filterOption="{{filterOption}}"
            showSearch="{{true}}"
            locale="{{locale}}"
            on-change="handleChange"
            on-search="handleSearch"
        />
    </div>
</template>
<script>

import transfer from 'santd/transfer';
export default {
    initData() {
        return {
            mockData: [],
            targetKeys: [],
            filterOption: (inputValue, option) => option.description.indexOf(inputValue) > -1,
            locale: {itemUnit: '项', itemsUnit: '项', searchPlaceholder: '请输入搜索内容'}
        };
    },
    attached() {
        this.getMock();
    },
    getMock() {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `content${i + 1}`,
                description: `description of content${i + 1}`,
                chosen: Math.random() * 2 > 1
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.data.set('mockData', mockData);
        this.data.set('targetKeys', targetKeys);
    },
    components: {
        's-transfer': transfer
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
    },
    handleSearch({direction, value}) {
        console.log('search: ', direction, value);
    }
}
</script>
```
