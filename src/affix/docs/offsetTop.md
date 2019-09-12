<text lang="cn">
#### 固定状态改变的回调
可以获得是否固定的状态。
</text>

```html
<template>
    <div>
        <s-affix offsetTop="{{120}}" on-change="handleChange">
            <s-button>120px to affix top</s-button>
        </s-affix>
    </div>
</template>
<script>
import Affix from 'santd/affix';
import Button from 'santd/button';

export default {
    components: {
        's-affix': Affix,
        's-button': Button
    },
    handleChange(affix) {
        console.log('affix: ', affix);
    }
}
</script>
```
