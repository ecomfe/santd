<text lang="cn">
#### 省略号
多行文本省略。
</text>

```html
<template>
    <div>
        <s-paragraph ellipsis>
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
        </s-paragraph>

        <s-paragraph ellipsis="{{{rows: 2}}}">
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
            Santd, a design language for background applications, is refined by Baidu App Team.
        </s-paragraph>
    </div>
</template>
<script>
import {Typography} from 'santd';

export default {
    components: {
        's-paragraph': Typography.Paragraph
    }
}
</script>
```
