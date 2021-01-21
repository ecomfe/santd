<text lang="cn">
#### badge
badge
</text>

```html
<style>
.head-example {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    background: #eee;
    display: inline-block;
}
</style>
<template>
    <div>
        <s-badge
            count="{{count}}">
            <a href="#" class="head-example"></a>
        </s-badge>
        <s-button on-click="sub">-</s-button>
        <s-button on-click="add">+</s-button>
    </div>
</template>
<script>
import {Badge, Button} from 'santd';

export default {
    components: {
        's-badge': Badge,
        's-button': Button
    },
    initData() {
        return {
            count: 23
        }
    },
    sub() {
        let count = +this.data.get('count');
        this.data.set('count', --count);
    },
    add() {
        let count = +this.data.get('count');
        this.data.set('count', ++count);
    }
}
</script>
```
