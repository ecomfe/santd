<text lang="cn">
#### 标签
使用 label 标签单独展示时间
</text>

```html
<template>
    <div>
        <s-group name="radiogroup" value="{{value}}" on-change="handleChange" style="margin-bottom: 20px">
            <s-radio value="{{left}}">Left</s-radio>
            <s-radio value="{{right}}">Right</s-radio>
            <s-radio value="{{alternate}}">Alternate</s-radio>
        </s-group>
        <s-timeline mode="{{value}}">
            <s-timeline-item label="2020-01-01">Create a services site</s-timeline-item>
            <s-timeline-item label="2020-06-01" color="green">Solve initial network problems</s-timeline-item>
            <s-timeline-item>
                <s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />
                Technical testing</s-timeline-item>
            <s-timeline-item label="2020-09-01" color="red">Network problems being solved</s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import san from 'san';
import {Timeline, Icon, Radio} from 'santd';

export default {
    initData() {
        return {
            value: 'left',
            left: 'left',
            right: 'right',
            alternate: 'alternate'
        }
    },
    components: {
        's-timeline': Timeline,
        's-timeline-item': Timeline.Item,
        's-icon': Icon,
        's-radio': Radio,
        's-group': Radio.Group
    },
    handleChange(e) {
        this.data.set('value', e.target.value);
    }
}
</script>
```
