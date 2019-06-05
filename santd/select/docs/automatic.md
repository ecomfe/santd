<cn>
#### 自动分词
试下复制 `露西,杰克` 到输入框里,然后回车。只在 tags 和 multiple 模式下可用。
</cn>

```html
<template>
    <div>
        <s-select mode="tags" style="width: 100%;" placeholder="Please select" on-change="onChange" tokenSeparators="{{[',']}}">
            <s-select-option s-for="i in baseData" value="{{i}}">{{i}}</s-select-option>
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
            baseData: ['test1','test2','test3','test4','test5','test6','test7','test8','test9','test10']
        }
    },
    onChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
