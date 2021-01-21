<text lang="cn">
#### 自定义
自定义图片链接、图片大小、描述、附属内容。
</text>

```html
<template>
    <div>
        <s-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle="height: 60px;"
        >
            <span slot="description">
                Customize <a href="#API">Description</a>
            </span>
            <s-button type="primary">Create Now</s-button>
        </s-empty>
    </div>
</template>
<script>
import san from 'san';
import {Empty, Button} from 'santd';

export default {
    components: {
        's-empty': Empty,
        's-button': Button
    }
}
</script>
```
