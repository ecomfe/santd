<text lang="cn">
#### 交替展现
内容在时间轴两侧轮流出现。
</text>

```html
<template>
    <div>
        <s-timeline mode="alternate">
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item color="green">Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item>
                <s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</s-timeline-item>
            <s-timeline-item color="red">Network problems being solved 2015-09-01</s-timeline-item>
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item>
                <s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />
                Technical testing 2015-09-01
            </s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import san from 'san';
import {Timeline, Icon} from 'santd';

export default {
    components: {
        's-timeline': Timeline,
        's-timeline-item': Timeline.Item,
        's-icon': Icon
    }
}
</script>
```
