<codebox>
#### 图标按钮
当需要在 Tag 内嵌入 Icon 时，可以设置 icon 属性,具体取值地址查看：https://ecomfe.github.io/santd/#/components/icon。


```html
<template>
    <div>
        <s-tag icon="camera">camera</s-tag>
        <s-tag icon="bell" color="green">bell</s-tag>
        <s-tag icon="book" color="red">book</s-tag>
        <s-tag icon="control" color="orange">control</s-tag>
        <s-tag closable="{{true}}">
            close1
        </s-tag>
        <s-tag color="pink" closable="{{true}}">
            <s-icon type="close-circle" slot="closeIcon"/>
            close
        </s-tag>
        
    </div>
</template>
<script>
import {Tag, Icon} from 'santd';

export default {
    components: {
        's-tag': Tag,
        's-icon': Icon
    }
}
</script>
```
</codebox>
