<cn>
#### 自定义图标
可口的图标让信息类型更加醒目。
</cn>

```html
<template>
    <div>
        <s-alert
            message="showIcon = false"
            type="success"
            showIcon="{{false}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Success Tips"
            type="success"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Informational Notes"
            type="info"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Warning"
            type="warning"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Error"
            type="error"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>

        <s-alert
            message="Success Tips"
            description="Detailed description and advices about successful copywriting."
            type="success"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Informational Notes"
            description="Additional description and informations about copywriting."
            type="info"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Warning"
            description="This is a warning notice about copywriting."
            type="warning"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
        <s-alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon="{{true}}"
        >
            <s-icon type="smile" slot="icon"/>
        </s-alert>
    </div>
</template>

<script>
import alert from 'santd/alert';
import icon from 'santd/icon';

export default {
    components: {
        's-alert': alert,
        's-icon': icon
    }
}
</script>
```
