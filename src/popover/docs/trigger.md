<text lang="cn">
#### 三种触发方式
鼠标移入、聚集、点击。
</text>

```html
<template>
    <div>
        <s-popover title="title" trigger="hover" content="{{content}}">
            <s-button>Hover Me</s-button>
        </s-popover>
        <s-popover title="title" trigger="focus" content="{{content}}">
            <s-button>Focus Me</s-button>
        </s-popover>
        <s-popover title="title" trigger="click" content="{{content}}">
            <s-button>Click Me</s-button>
        </s-popover>
    </div>
</template>
<script>
import san from 'san';
import Popover from 'santd/popover';
import Button from 'santd/button';

export default {
    components: {
        's-popover': Popover,
        's-button': Button
    },
    initData() {
        return {
            content: san.defineComponent({
                template: `<div>
                    <p>Content</p>
                    <p>Content</p>
                </div>`
            })
        }
    }
}
</script>
```
