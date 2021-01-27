<text lang="cn">
#### 图标
可口的图标让信息类型更加醒目。
</text>

```html
<template>
    <div>
        <s-alert
            message="Success Tips"
            type="success"
            showIcon="{{true}}"
        />
        <s-alert
            message="Informational Notes"
            type="info"
            showIcon="{{true}}"
        />
        <s-alert
            message="Warning"
            type="warning"
            showIcon="{{true}}"
        />
        <s-alert
            message="Error"
            type="error"
            showIcon="{{true}}"
        />

        <s-alert
            message="Success Tips"
            description="Detailed description and advices about successful copywriting."
            type="success"
            showIcon="{{true}}"
        />
        <s-alert
            message="Informational Notes"
            description="Additional description and informations about copywriting."
            type="info"
            showIcon="{{true}}"
        />
        <s-alert
            message="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            showIcon="{{true}}"
        />
        <s-alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon="{{true}}"
        />
    </div>
</template>

<script>
import {Alert, Icon} from 'santd';

export default {
    components: {
        's-alert': Alert
    }
}
</script>
```
