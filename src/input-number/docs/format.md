<codebox>
#### 格式化展示
通过 `formatter` 格式化数字，以展示具有具体含义的数据，往往需要配合 `parser` 一起使用。


```html
<template>
    <div>
        <s-input-number
            defaultValue="{{1000}}"
            formatter="{{formatterTwo}}"
            parser="{{parserTwo}}"
            on-change="onChange"
        />
        <s-input-number
            defaultValue="{{100}}"
            min="{{0}}"
            max="{{100}}"
            formatter="{{formatter}}"
            parser="{{parser}}"
            on-change="onChange"
        />
    </div>
</template>
<script>
import {InputNumber} from 'santd';

export default {
    components: {
        's-input-number': InputNumber
    },
    initData() {
        return {
            formatter(value) {
                return `${value}%`;
            },
            parser(value) {
                return value.replace('%', '');
            },
            formatterTwo(value) {
                return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            },
            parserTwo(value) {
                return value.replace(/\$\s?|(,*)/g, '');
            }
        }
    },
    onChange(value) {
        console.log('changed: ', value);
    }
}
</script>
```
</codebox>
