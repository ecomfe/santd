<cn>
#### 简洁风格
一套没有边框的简洁样式。
</cn>

```html
<template>
    <div>
    <s-collapse bordered="{{false}}" defaultActiveKey="{{['1']}}">
        <s-panel header="This is panel header 1" key="1">
            <p style="margin-left: 24px;">
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 2" key="2">
            <p style="margin-left: 24px;">
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 3" key="3">
            <p style="margin-left: 24px;">
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
    }
}
</script>
```
