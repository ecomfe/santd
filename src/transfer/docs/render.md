<text lang="cn">
#### 自定义渲染行数据
自定义渲染每一个 Transfer Item，可用于渲染复杂数据。
</text>

```html
<template>
    <div>
        <s-transfer
            dataSource="{{mockData}}"
            listStyle="{{listStyle}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            on-change="handleChange"
        />
    </div>
</template>
<script>
import Transfer from 'santd/transfer';
import san from 'san';

export default {
    initData() {
        return {
            mockData: [],
            targetKeys: [],
            render(item) {
                const customLabel = san.defineComponent({
                    template: `<span class="custom-item">{{item.title}} - {{item.description}}</span>`
                });

                return {
                    label: customLabel,
                    value: item.title
                };
            },
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
