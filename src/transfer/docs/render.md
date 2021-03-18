<codebox>
#### 自定义渲染行数据
自定义渲染每一个 Transfer Item，可用于渲染复杂数据。

```html
<template>
    <div>
        <s-transfer
            dataSource="{{mockData}}"
            listStyle="{{listStyle}}"
            targetKeys="{{targetKeys}}"
            on-change="handleChange"
        >
            <span class="custom-item" slot="render">{{item.title}} - {{item.description}}</span>
        </s-transfer>
    </div>
</template>
<script>
import san from 'san';
import {Transfer} from 'santd';

export default {
    initData() {
        return {
            mockData: [],
            targetKeys: [],
            listStyle: 'width: 250px; height: 300px;',
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
        's-transfer': Transfer
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
    }
}
</script>
```
</codebox>
