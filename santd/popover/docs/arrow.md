<text lang="cn">
#### 箭头指向
设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。
</text>

```html
<template>
    <div>
        <s-popover title="Title" content="{{content}}" placement="topLeft">
            <s-button>Align edge / 边缘对齐</s-button>
        </s-popover>
        <s-popover title="Title" content="{{content}}" placement="topLeft" arrowPointAtCenter>
            <s-button>Arrow points to center / 箭头指向中心</s-button>
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
