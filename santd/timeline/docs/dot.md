<cn>
#### 自定义时间轴点
可以设置为图标或其他自定义元素。
</cn>

```html
<template>
    <div>
        <s-timeline>
            <s-timeline-item>Create a services site 2015-09-01</s-timeline-item>
            <s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item>
            <s-timeline-item dot="{{dot}}" color="red">Technical testing 2015-09-01</s-timeline-item>
            <s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item>
        </s-timeline>
    </div>
</template>
<script>
import timeline from 'santd/timeline';
import icon from 'santd/icon';
import san from 'san';

export default {
    components: {
        's-timeline': timeline,
        's-timeline-item': timeline.Item
    },
    initData() {
        return {
            dot: san.defineComponent({
                template: `
                    <span>
                        <s-icon type="clock-circle-o" style="font-size: 16px;"/>
                    </span>
                `,
                components: {
                    's-icon': icon
                }
            })
        };
    }
}
</script>
```
