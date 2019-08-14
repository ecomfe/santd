<text lang="cn">
#### 圆圈颜色
圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。
</text>

```html
<template>
    <div>
        <s-timeline>
            <s-timeline-item color="green">Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item color="green">Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item color="red">
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
            </s-timeline-item>
            <s-timeline-item>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
            </s-timeline-item>
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
