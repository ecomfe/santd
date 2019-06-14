<cn>
#### 自定义
自定义图片链接、图片大小、描述、附属内容。
</cn>

```html
<template>
    <div>
        <s-empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle="height: 60px;"
            description="{{description}}"
        >
            <s-button type="primary">Create Now</s-button>
        </s-empty>
    </div>
</template>
<script>
import san from 'san';
import Empty from 'santd/empty';
import Button from 'santd/button';
export default {
    initData() {
        return {
            description: san.defineComponent({
                template: `<span>
                    Customize <a href="#API">Description</a>
                </span>`
            })
        };
    },
    components: {
        's-empty': Empty,
        's-button': Button
    }
}
</script>
```
