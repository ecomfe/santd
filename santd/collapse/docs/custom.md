<cn>
#### 自定义面板
自定义各个面板的样式。
</cn>

```html
<template>
    <div>
    <s-collapse bordered="{{false}}" defaultActiveKey="{{['1']}}" expandIcon="{{expandIcon}}">
        <s-panel header="This is panel header 1" key="1" style="{{panelStyle}}">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
            <template slot="extra">
                <s-icon type="setting"/>
            </template>
        </s-panel>
        <s-panel header="This is panel header 2" active key="2" style="{{panelStyle}}">
            <p>
                A dog is a type of domesticated animal.
                Known for its loyalty and faithfulness,
                it can be found as a welcome guest in many households across the world.
            </p>
        </s-panel>
        <s-panel header="This is panel header 3" key="3" style="{{panelStyle}}">
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
import san from 'san';
import icon from 'santd/icon';
import collapse from 'santd/collapse';

const customPanelStyle = {
    'background': '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    'border': 0,
    'overflow': 'hidden'
};

const expandIcon = san.defineComponent({
    components: {
        's-icon': icon
    },
    template: `<span><s-icon type="caret-right" rotate="{{isActive ? 90 : 0}}" /></span>`
});

export default {
    components: {
        's-collapse': collapse,
        's-panel': collapse.Panel
    },
    initData() {
        return {
            expandIcon: expandIcon,
            panelStyle: customPanelStyle
        };
    }
}
</script>
```
