<codebox>
#### 基本
最简单的用法

```html
<template>
    <div>
        <s-affix offsetTop="{{top}}">
            <s-button type="primary" on-click="handleTopClick">Affix Top</s-button>
        </s-affix>
        <br /><br />
        <s-affix offsetBottom="{{bottom}}">
            <s-button type="primary" on-click="handleBottomClick">Affix Bottom</s-button>
        </s-affix>
    </div>
</template>
<script>
import {Affix, Button} from 'santd';

export default {
    components: {
        's-affix': Affix,
        's-button': Button
    },
    initData() {
        return {
            top: 10,
            bottom: 10
        }
    },
    handleTopClick() {
        this.data.set('top', this.data.get('top') + 10);
    },
    handleBottomClick() {
        this.data.set('bottom', this.data.get('bottom') + 10);
    }
}
</script>
```
</codebox>
