<cn>
#### 右侧时间轴点
时间轴点可以在内容的右边。
</cn>

```html
<template>
    <div>
        <s-timeline mode="right">
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item color="red" dot="{{dot}}">Technical testing 2015-09-01</s-timeline-item>
            <s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import san from 'san';
import icon from 'santd/icon';
import timeline from 'santd/timeline';

export default {
    components: {
        's-timeline': timeline,
        's-timeline-item': timeline.Item
    },
    initData() {
        return {
            dot: san.defineComponent({
                components: {
                    's-icon': icon
                },
                template: `<span><s-icon type="clock-circle-o" style="font-size: 16px;" /></span>`
            })
        }
    }
}
</script>
```
