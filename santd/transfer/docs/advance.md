<cn>
#### 高级用法
穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。
</cn>

```html
<template>
  <div>
    <s-transfer
        disabled="{{disabled}}"
        dataSource="{{mockData}}"
        targetKeys="{{targetKeys}}"
        render="{{render}}"
        on-selectChange="handleSelectChange"
        on-change="handleChange"
        on-search="handleSearch"
        operations="{{['to Right', 'to Left']}}"
        listStyle="{{listStyle}}"
        filterOption="{{filterOption}}"
        showSearch>
        <div slot="footer">
            <s-button type="default" size="small" style="float: right;margin: 5px">Reload</s-button>
        </div>   
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
import button from 'santd/button';
import san from 'san';
export default {
    initData() {
        return {
            mockData: mockData,
            targetKeys: oriTargetKeys,
            render: san.defineComponent({
                template: `
                    <span>
                        {{title}} - {{description}}
                    </span>
                `
            }),
            listStyle: {
                width: '300px',
                height: '300px'
            },
            filterOption: (inputValue, option) => option.description.indexOf(inputValue) > -1
        };
    },
    components: {
        's-transfer': transfer,
        's-button': button
    },
    handleChange(param) {
        console.log('on-change', param);
    },
    handleSearch(param) {
        console.log('on-search', param);
    },
    handleSelectChange(param) {
        console.log('on-selectChange', param);
    }
}
</script>
```