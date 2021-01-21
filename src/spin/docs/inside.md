<text lang="cn">
#### 容器
放入一个容器中。
</text>

```html
<template>
    <div class="demo-inside">
        <s-spin/>
    </div>
</template>

<script>
import {Spin} from 'santd';

export default {
    components: {
        's-spin': Spin
    }
}
</script>

<style scoped>
.demo-inside {
    text-align: center;
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
}
</style>
```
