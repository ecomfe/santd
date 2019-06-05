<cn>
#### 隐藏箭头
你可以通过 `showArrow` 值为 `false` , 隐藏 CollapsePanel 组件的箭头图标。
</cn>

```html
<template>
    <div>
    <s-collapse on-change="handleChange" defaultActiveKey="{{['1']}}">
        <s-panel header="This is panel header 1" key="1">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 3" showArrow="{{false}}" key="2">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
    </s-collapse>
  </div>
</template>
<script>
import collapse from 'santd/collapse';
export default {
    components: {
        's-collapse': collapse,
        's-panel': collapse.Panel
    },
    handleChange(args) {
        console.log('handleChange', args);
    }
}
</script>
```
