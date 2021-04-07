<text lang="cn">
#### 可交互
提供额外的交互能力。
</text>

```html
<template>
  <div>
    <s-paragraph copyable>This is a copyable text.</s-paragraph>
    <s-paragraph copyable="{{copyable}}">
        Replace copy text.
    </s-paragraph>
  </div>
</template>
<script>
import {Typography} from 'santd';

export default {
    components: {
        's-paragraph': Typography.Paragraph,
    },
    initData() {
        return {
            copyable: {
                text: 'hello Santd',
                onCopy() {
                    console.log('onCopy');
                }
            }
        }
    }
}
</script>
```
