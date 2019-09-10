<text lang="cn">
#### 基本用法
最基本的用法，展示了 `dataSource`、`targetKeys`、每行的渲染函数 `render` 以及回调函数 `on-change` `on-selectChange` `on-scroll`的用法
</text>

```html
<template>
    <div>
        <s-transfer
            disabled="{{disabled}}"
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            titles="{{['Source', 'Target']}}"
            on-selectChange="handleSelectChange"
            on-change="handleChange"
            on-scroll="handleScroll"
            selectedKeys="{{selectedKeys}}"
        >
            <span slot="render">{{item.title}}</span>
        </s-transfer>
        <s-switch
            checkedChildren="disabled"
            unCheckedChildren="disabled"
            checked="{{disabled}}"
            on-change="handleDisable"
            style="margin-top: 16px"
        />
    </div>
</template>
<script>

const mockData = [];
for (let i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: i % 3 < 1
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
            disabled: false,
            mockData: mockData,
            targetKeys: oriTargetKeys,
            render(item) {
                return item.title;
            },
            selectedKeys: []
        };
    },
    components: {
        's-transfer': transfer,
        's-switch': Switch
    },
    handleChange({targetKeys, direction, moveKeys}) {
        this.data.set('targetKeys', targetKeys);

        console.log('targetKeys: ', targetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);
    },
    handleSearch(param) {
        console.log('on-search', param);
    },
    handleSelectChange({sourceSelectedKeys, targetSelectedKeys}) {
        this.data.set('selectedKeys', [...sourceSelectedKeys, ...targetSelectedKeys]);

        console.log('sourceSelectedKeys: ', sourceSelectedKeys);
        console.log('targetSelectedKeys: ', targetSelectedKeys);
    },
    handleScroll({direction, e}) {
        console.log('direction: ', direction);
        console.log('target: ', e.target);
    },
    handleDisable(disable) {
        this.data.set('disabled', disable);
    }
}
</script>
```
