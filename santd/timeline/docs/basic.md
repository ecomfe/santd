<cn>
#### 基本用法
基本的时间轴。
</cn>

```html
<template>
    <div>
        <s-timeline>
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item>Technical testing 2015-09-01</s-timeline-item>
            <s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import timeline from 'santd/timeline';
export default {
    components: {
        's-timeline': timeline,
        's-timeline-item': timeline.Item
    }
}
</script>
```
