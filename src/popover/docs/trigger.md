<text lang="cn">
#### 三种触发方式
鼠标移入、聚集、点击。
</text>

```html
<template>
    <div>
        <s-popover title="title" trigger="hover">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button>Hover Me</s-button>
        </s-popover>
        <s-popover title="title" trigger="focus">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button>Focus Me</s-button>
        </s-popover>
        <s-popover title="title" trigger="click">
            <template slot="content">
                <p>Content</p>
                <p>Content</p>
            </template>
            <s-button>Click Me</s-button>
        </s-popover>
    </div>
</template>
<script>
import Popover from 'santd/popover';
import Button from 'santd/button';

export default {
    components: {
        's-popover': Popover,
        's-button': Button
    }
}
</script>
```
