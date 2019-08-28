<text lang="cn">
#### 各种大小
小的用于文本加载，默认用于卡片容器级加载，大的用于**页面级**加载。
</text>

```html
<template>
    <div class="demo-size">
        <s-spin size="small"/>
        <s-spin/>
        <s-spin size="large"/>
    </div>
</template>

<script>
import spin from 'santd/spin';

export default {
    components: {
        's-spin': spin
    }
}
</script>

<style>
.demo-size .san-spin {
    margin-right: 16px;
}
</style>
```
