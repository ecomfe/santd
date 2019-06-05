<cn>
#### 最后一个及排序
当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 为真值时展示幽灵节点，如果 pending 是 San Component 可用于定制该节点内容，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。
</cn>

```html
<template>
    <div>
        <s-timeline pending="Recording..." reverse="{{reverse}}">
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item color="red">Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item color="green">Solve initial network problems 3 2015-09-01</s-timeline-item>
            <s-timeline-item color="blue">Network problems being solved 2015-09-01</s-timeline-item>
        </s-timeline>
        <s-button type="primary" on-click="handleToggle">Toggle Reverse</s-button>
    </div>
</template>
<script>
import timeline from 'santd/timeline';
import button from 'santd/button';

export default {
    components: {
        's-timeline': timeline,
        's-timeline-item': timeline.Item,
        's-button': button
    },
    handleToggle() {
        this.data.apply('reverse', reverse => !reverse);
    }
}
</script>
```
