<text lang="cn">
#### 手风琴
手风琴，每次只打开一个tab。默认打开第一个。
</text>

```html
<template>
    <div>
    <s-collapse accordion defaultActiveKey="{{['1']}}">
        <s-panel header="This is panel header 1" key="1">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 2" key="2">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 3" key="3">
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
import Collapse from 'santd/collapse';
export default {
    components: {
        's-collapse': Collapse,
        's-panel': Collapse.Panel
    }
}
</script>
```
