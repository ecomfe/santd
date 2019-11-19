<text lang="cn">
#### 控制关闭状态
通过 `visible` 属性控制关闭状态。
</text>

```html
<template>
    <div>
        <s-tag closable="{{true}}" visible="{{isVisible}}" on-close="onClose">Movies</s-tag>
        <br /><br />
        <s-button size="small" on-click="handleClick">Toggle</s-button>
    </div>
</template>
<script>
import Tag from 'santd/tag';
import Button from 'santd/button';
export default {
    components: {
        's-tag': Tag,
        's-button': Button
    },
    initData() {
        return {
            isVisible: true
        }
    },
    onClose(e) {
        this.data.set('isVisible', false);
    },
    handleClick() {
        this.data.set('isVisible', !this.data.get('isVisible'));
    }
}
</script>
```
