<cn>
#### 步骤切换
通常配合内容及按钮使用，表示一个流程的处理进度。
</cn>

```html
<template>
    <div>
        <s-steps current="{{current}}">
            <s-step s-for="step in steps" title="{{step.title}}" />
        </s-steps>
        <div class="steps-content">{{steps[current].content}}</div>
        <div class="steps-action">
            <s-button
                s-if="{{current < steps.length - 1}}"
                type="primary"
                on-click="next"
            >next</s-button>
            <s-button
                s-if="{{current > 0}}"
                style="margin-left: 8px"
                on-click="prev"
            >Previous</s-button>
        </div>
    </div>
</template>
<script>
import Steps from 'santd/steps';
import Icon from 'santd/icon';
import Button from 'santd/button';
export default {
    components: {
        's-steps': Steps,
        's-step': Steps.Step,
        's-icon': Icon,
        's-button': Button
    },
    initData() {
        return {
            current: 0,
            steps: [{
                title: 'First',
                content: 'First-content',
            }, {
                title: 'Second',
                content: 'Second-content',
            }, {
                title: 'Last',
                content: 'Last-content',
            }]
        }
    },
    next() {
        const cur = +this.data.get('current');
        this.data.set('current', cur + 1);
    },
    prev() {
        const cur = +this.data.get('current');
        this.data.set('current', cur - 1);
    }
}
</script>
<style>
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>
```
