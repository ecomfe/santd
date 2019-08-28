<text lang="cn">
#### 可选择
可通过 `CheckableTag` 实现类似 Checkbox 的效果，点击切换选中效果。
</text>

```html
<template>
    <div>
        <s-mytag>Tag1</s-mytag>
        <s-mytag>Tag2</s-mytag>
        <s-mytag>Tag3</s-mytag>
    </div>
</template>
<script>
import san from 'san';
import Tag from 'santd/tag';

const myTag = san.defineComponent({
    components: {
        's-checkabletag': Tag.CheckableTag
    },
    initData() {
        return {
            checked: true
        }
    },
    handleChange(checked) {
        this.data.set('checked', checked);
    },
    template: `<span>
        <s-checkabletag checked="{{checked}}" on-change="handleChange"><slot></slot></s-checkabletag>
    </span>`
});

export default {
    components: {
        's-mytag': myTag
    }
}
</script>
```
