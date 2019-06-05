<cn>
#### 交替展现
内容在时间轴两侧轮流出现。
</cn>

```html
<template>
    <div>
        <s-timeline mode="alternate">
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item color="green">Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item dot="{{dot}}">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.</s-timeline-item>
            <s-timeline-item color="red">Network problems being solved 2015-09-01</s-timeline-item>
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item dot="{{dot}}">Technical testing 2015-09-01</s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import san from 'san';
import timeline from 'santd/timeline';
import icon from 'santd/icon';

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
