<text lang="cn">
#### 自定义点状步骤条
为点状步骤条增加自定义展示。
</text>

```html
<template>
    <div>
        <s-steps current="{{1}}">
            <s-step title="Finished" description="You can hover on the dot." />
            <s-step title="In Progress" description="You can hover on the dot." />
            <s-step title="Waiting" description="You can hover on the dot." />
            <s-step title="Waiting" description="You can hover on the dot." />
            <s-popover content="step {{index}} status: {{status}}" slot="progressDot" style="float:left;width:100%;height:100%;">
                <span class="{{prefixCls}}-icon-dot" />
            </s-popover>
      </s-steps>
    </div>
</template>
<script>
import san from 'san';
import Steps from 'santd/steps';
import Popover from 'santd/popover';

export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step,
        's-popover': Popover
    }
}
</script>
```
