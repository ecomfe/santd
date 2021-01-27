<text lang="cn">
#### 折叠面板
可以同时展开多个面板，这个例子默认展开了第一个。
</text>

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
        <s-panel header="This is panel header 2" key="2">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 3" disabled="{{true}}" key="3">
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
import {Collapse} from 'santd';

export default {
    components: {
        's-collapse': Collapse,
        's-panel': Collapse.Panel
    },
    handleChange(args) {
        console.log('handleChange', args);
    }
}
</script>
```
