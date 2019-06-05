<cn>
#### 自定义描述文案
自定义描述文案。
</cn>

```html
<template>
    <div>
        <s-spin tip="Loading...">
            <s-alert slot="content"
                type="info"
                message="Alert message title"
                description="Further details about the context of this alert."
            >
        </s-spin>
    </div>
</template>

<script>
import alert from 'santd/alert';
import spin from 'santd/spin';

export default {
    components: {
        's-alert': alert,
        's-spin': spin
    }
}
</script>
```
