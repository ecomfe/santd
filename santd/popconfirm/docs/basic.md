<cn>
#### 基本
最简单的用法。
</cn>

```html
<template>
    <div>
        <s-popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            on-confirm="handleConfirm"
            on-cancel="handleCancel"
        >
            <a href="javascript:void(0);">Delete</a>
        </s-popconfirm>
    </div>
</template>
<script>
import popconfirm from 'santd/popconfirm';
import message from 'santd/message';
export default {
    components: {
        's-popconfirm': popconfirm
    },
    handleConfirm(e) {
        console.log(e);
        message.success('Click on Yes');
    },
    handleCancel(e) {
        console.log(e);
        message.error('Click on No');
    }
}
</script>
```
