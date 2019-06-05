<cn>
#### 基本
最简单的用法，浮层的大小由内容区域决定。
</cn>

```html
<template>
    <div>
        <s-popover title="Title" content="{{content}}">
            <s-button type="primary">Hover Me</s-button>
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
