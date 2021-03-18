<codebox>
#### 额外节点
添加 `name` 值为 extra 的插槽，为header添加自定义额外节点。

```html
<template>
    <div>
        <s-collapse on-change="handleChange" expandIconPosition="{{expandIconPosition}}">
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
        <div style="display: flex;align-items: center;margin-top: 10px;">
            <span style="margin-right: 5px;">Expand Icon Position:</span>
            <s-cascader options="{{options}}"  defaultValue="{{['left']}}" on-change="onChange"  />
       </div>
  </div>
</template>
<script>
import {Collapse, Icon, Cascader} from 'santd';

export default {
    components: {
        's-collapse': Collapse,
        's-panel': Collapse.Panel,
        's-icon': Icon,
        's-cascader': Cascader
    },
    initData() {
        return {
            options: [{
                value: 'left',
                label: 'left'
            }, {
                value: 'right',
                label: 'right'
            }],
            expandIconPosition: 'left'
        };
    },
    handleChange(args) {
        console.log('handleChange', args);
    },
    onChange(args) {
        this.data.set('expandIconPosition', args.selectedOptions[0].value);
    }
}
</script>
```
</codebox>
