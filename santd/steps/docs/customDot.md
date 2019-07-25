<cn>
#### 自定义点状步骤条
为点状步骤条增加自定义展示。
</cn>

```html
<template>
    <div>
        <s-steps progressDot="{{customDot}}" current="1">
            <s-step title="Finished" description="You can hover on the dot." />
            <s-step title="In Progress" description="You can hover on the dot." />
            <s-step title="Waiting" description="You can hover on the dot." />
            <s-step title="Waiting" description="You can hover on the dot." />
      </s-steps>
    </div>
</template>
<script>
import san from 'san';
import Steps from 'santd/steps';
import Popover from 'santd/popover';

const customDot = function (dot) {
    return san.defineComponent({
        components: {
            's-popover': Popover,
            's-dot': dot
        },
        template: `<span>
            <s-popover content="step {{index}} status: {{status}}" style="float:left;width:100%;height:100%;">
                <s-dot/>
            </s-popover>
        </span>`
    });
}
export default {
    initData() {
        return {
            customDot
        };
    },
    components: {
        's-steps': Steps,
        's-step': Steps.Step
    }
}
</script>
```
