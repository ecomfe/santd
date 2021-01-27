<text lang="cn">
#### 联动
省市联动是典型的例子。
推荐使用 `Cascader` 组件。
</text>

```html
<template>
    <div>
        <s-select
            defaultValue="{{provinceData[0]}}"
            style="width: 120px;"
            on-change="handleProvinceChange"
        >
            <s-select-option
                s-for="province in provinceData trackBy province"
                value="{{province}}"
            >{{province}}</s-select-option>
        </s-select>
        <s-select
            value="{{secondCity}}"
            style="width: 120px;"
            on-change="handleSecondCityChange"
        >
            <s-select-option
                s-for="city in cities trackBy city"
                value="{{city}}"
            >{{city}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import {Select} from 'santd';

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
};

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            provinceData
        };
    },
    handleProvinceChange(value) {
        this.data.set('cities', cityData[value]);
        this.data.set('secondCity', cityData[value][0]);
    },
    handleSecondCityChange(value) {
        this.data.set('secondCity', value);
    }
}
</script>
```
