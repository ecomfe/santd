<codebox>
#### 自定义描述文案
自定义描述文案。

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
import {Spin, Alert} from 'santd';

export default {
    components: {
        's-alert': Alert,
        's-spin': Spin
    }
}
</script>
```
</codebox>
