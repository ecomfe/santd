<cn>
#### 面板嵌套
嵌套折叠面板。
</cn>

```html
<template>
    <div>
    <s-collapse on-change="handleChange">
        <s-panel header="This is panel header 1" key="1">
            <s-collapse on-change="handleChange" defaultActiveKey="1">
                <s-panel header="This is panel header 1" key="1">
                    <p>
                        A dog is a type of domesticated animal.
                        Known for its loyalty and faithfulness,
                        it can be found as a welcome guest in many households across the world.
                    </p>
                </s-panel>
            </s-collapse>
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
