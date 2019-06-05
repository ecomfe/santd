<cn>
#### 标准样式
标准页头，适合使用在需要简单描述的场景。
</cn>

```html
<template>
    <div>
        <s-pageheader
            onBack="{{onBack}}"
            title="Title"
            subTitle="This is a subtitle">
        </s-pageheader>
    </div>
</template>
<script>
import pageheader from 'santd/pageheader';
import tag from 'santd/tag';
import button from 'santd/button'

export default {
    components: {
        's-pageheader': pageheader
    },
    initData() {
        return {
            onBack: () => {
                console.log('onBack');
            }
        }
    }
}
</script>
```
