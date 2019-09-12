<text lang="cn">
#### 联动
省市联动是典型的例子。
推荐使用 `Cascader` 组件。
</text>

```html
<template>
    <div>
        <s-select defaultValue="{{province}}" style="width: 120px;display:inline-block;" on-change="provinceChange">
            <s-select-option s-for="province in provinceData" value="{{province}}">{{province}}</s-select-option>
        </s-select>
        <s-select value="{{secondCity}}" style="width: 120px;display:inline-block;">
            <s-select-option s-for="city in cities trackBy city" value="{{city}}">{{city}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            provinceData: ['Zhejiang', 'Jiangsu'],
            cityData: {
                Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
                Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
            },
        }
    },
    inited() {
        const provinceData = this.data.get('provinceData');
        const cityData = this.data.get('cityData');
        this.data.set('province',provinceData[0]);
        this.data.set('cities',cityData[provinceData[0]]);
        this.data.set('secondCity', cityData[provinceData[0]][0]);
    },
    provinceChange(value) {
        const provinceData = this.data.get('provinceData');
        const cityData = this.data.get('cityData');
        this.data.set('cities', cityData[value]);
        this.data.set('secondCity', cityData[value][0]);
    }
}
</script>
```
