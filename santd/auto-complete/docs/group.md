<text lang="cn">
#### 分组选项
分组显示选项
</text>

```html
<template>
  <div>
  	<s-auto-complete
        on-search="handleSearch"
        on-select="handleSelect"
        style="width: 200px;">
        <template s-for="data in baseData">
            <s-select-opt-group>
                <span slot="group-title">{{data.groupName}}</span>
                <s-select-option
                    s-for="item in data.list"
                    value="{{item.key}}"
                >
                    {{item.label}}
                </s-select-option>
            </s-select-opt-group>
        </template>
    </s-auto-complete>
  </div>
</template>
<script>
import autoComplete from 'santd/auto-complete';

export default {
    components: {
        's-auto-complete': autoComplete,
        's-select-option': autoComplete.Option,
        's-select-opt-group': autoComplete.Group
    },
    initData() {
        return {
            dataSource: ['a','b','c','d'],
            baseData: [
                {
                    groupName: 'Manager',
                    list: [
                        {
                            key: 'jake',
                            label: 'Jake(001)'
                        },
                        {
                            key: 'lucy',
                            label: 'Lucy(002)'
                        }
                    ]
                },
                {
                    groupName: 'Engineer',
                    list: [
                        {
                            key: 'group',
                            label: 'Group(003)'
                        },
                        {
                            key: 'lily',
                            label: 'Lily(004)'
                        }
                    ]
                }
            ]
        };
    },
    handleSearch(value) {
        console.log('handle search', value);
        this.data.set('dataSource', [
            value,
            value + value,
            value + value + value
        ]);
    },
    handleSelect(value) {
        console.log('handle select', value);
    }
}
</script>
```