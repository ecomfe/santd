<text lang="cn">
#### 额外节点
添加 `name` 值为 extra 的插槽，为header添加自定义额外节点。
</text>

```html
<template>
    <div>
    <s-collapse on-change="handleChange">
        <s-panel header="This is panel header 1" key="1">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
            <template slot="extra">
                <s-icon type="setting"/>
            </template>
        </s-panel>
        <s-panel header="This is panel header 2" key="2">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
            <template slot="extra">
                <s-icon type="setting"/>
            </template>
        </s-panel>
        <s-panel header="This is panel header 3" key="3">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
            <template slot="extra">
                <s-icon type="setting"/>
            </template>
        </s-panel>
    </s-collapse>
  </div>
</template>
<script>
import Collapse from 'santd/collapse';
import Icon from 'santd/icon';
export default {
    components: {
        's-collapse': Collapse,
        's-panel': Collapse.Panel,
        's-icon': Icon
    },
    handleChange(args) {
        console.log('handleChange', args);
    }
}
</script>
```
