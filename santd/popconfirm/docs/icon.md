<text lang="cn">
#### 自定义 Icon 图标
使用 `icon` 自定义提示 `icon`。
</text>

```html
<template>
    <div>
        <s-popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            icon="{{icon}}"
            placement="bottomLeft">
            <a href="javascript:void(0);">Delete</a>
        </s-popconfirm>
    </div>
</template>
<script>
import san from 'san';
import Popconfirm from 'santd/popconfirm';
import Icon from 'santd/icon';
export default {
    components: {
        's-popconfirm': Popconfirm,
        's-icon': Icon
    },
    initData() {
        return {
            icon: san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: `<span><s-icon type="question-circle" style="color: red" themes="filled"/></span>`
            })
        }
    }
}
</script>
```
