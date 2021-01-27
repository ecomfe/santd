<text lang="cn">
#### 标准样式
标准页头，适合使用在需要简单描述的场景。
</text>

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
import {PageHeader} from 'santd';


export default {
    components: {
        's-pageheader': PageHeader
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
