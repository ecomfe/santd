<codebox>
#### 基本
最简单的用法。

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
import {Popconfirm} from 'santd';
import message from 'santd/es/message';
import 'santd/es/message/style';

export default {
    components: {
        's-popconfirm': Popconfirm
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
</codebox>
