<cn>
#### 分组
用 `OptGroup` 进行选项分组。
</cn>

```html
<template>
    <div>
        <s-select defaultValue="{{['lucy']}}" style="width: 120px;" on-change="onChange">
            <template s-for="data in baseData">
                <s-select-opt-group label="{{data.groupName}}">
                    <s-select-option
                        s-for="item in data.list"
                        value="{{item.key}}"
                    >
                        {{item.label}}
                    </s-select-option>
                </s-select-opt-group>
            </template>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-select-opt-group': Select.Group
    },
    initData() {
        return {
            baseData: [
                {
                    groupName: 'Manager',
                    list: [
                        {
                            key: 'jake',
                            label: 'Jake'
                        },
                        {
                            key: 'lucy',
                            label: 'Lucy'
                        }
                    ]
                },
                {
                    groupName: 'Engineer',
                    list: [
                        {
                            key: 'lily',
                            label: 'Lily'
                        }
                    ]
                }
            ]
        }
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
