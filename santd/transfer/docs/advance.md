<cn>
#### 高级用法
穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。
</cn>

```html
<template>
    <div>
        <s-transfer
            dataSource="{{mockData}}"
            targetKeys="{{targetKeys}}"
            render="{{render}}"
            on-change="handleChange"
            operations="{{['to Right', 'to Left']}}"
            listStyle="{{listStyle}}"
            footer="{{footer}}"
            showSearch
        />
    </div>
</template>
<script>
import Transfer from 'santd/transfer';
import Button from 'santd/button';
import san from 'san';

export default {
    initData() {
        const that = this;
        return {
            mockData: [],
            targetKeys: [],
            render(item) {
                return item.title + '-' + item.description;
            },
            listStyle: 'width: 250px; height: 300px;',
            footer() {
                return san.defineComponent({
                    components: {
                        's-button': Button
                    },
                    handleClick: that.getMock.bind(that),
                    template: `<span>
                        <s-button size="small" style="float: right; margin: 5px;" on-click="handleClick">
                            reload
                        </s-button>
                    </span>`
                });
            }
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
