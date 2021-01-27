<text lang="cn">
#### 自定义时间轴点
可以设置为图标或其他自定义元素。
</text>

```html
<template>
    <div>
        <s-timeline>
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item color="red">
                <s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />
                Technical testing 2015-09-01
            </s-timeline-item>
            <s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item>
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
