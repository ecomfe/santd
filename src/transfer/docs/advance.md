<text lang="cn">
#### 高级用法
穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。
</text>

```html
<template>
    <div>
        <s-transfer
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            on-change="handleChange"
            operations="{{['to Right', 'to Left']}}"
            listStyle="width: 250px; height: 300px;"
            showSearch
        >
            <span slot="footer">
                <s-button size="small" style="float: right; margin: 5px;" on-click="getMock">
                    reload
                </s-button>
            </span>
        </s-transfer>
    </div>
</template>
<script>
import Transfer from 'santd/transfer';
import Button from 'santd/button';
import san from 'san';

export default {
    initData() {
        return {
            mockData: [],
            targetKeys: []
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
        's-transfer': Transfer,
        's-button': Button
    },
    handleChange({targetKeys}) {
        this.data.set('targetKeys', targetKeys);
    }
}
</script>
```
