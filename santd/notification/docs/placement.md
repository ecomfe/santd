<cn>
#### 位置
可以设置通知从右上角、右下角、左下角、左上角弹出。
</cn>

```html
<template>
    <div>
        <s-select value="{=placement=}" on-change="changeHandler" style="width: 150px;">
            <s-option s-for="option in options" value="{{option}}">{{option}}</s-option>
        </s-select>
        <s-button type="primary" on-click="clickHandler">Open the notification box</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import select from 'santd/select';
import notification from 'santd/notification';

const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

export default {
    components: {
        's-button': button,
        's-select': select,
        's-option': select.Option
    },
    clickHandler() {
        notification.open({
            message: 'Notification Title',
            description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        });
    },
    changeHandler(placement) {
        notification.config({placement});
    },
    initData() {
        return {
            options,
            placement: 'topRight'
        };
    }
}
</script>
```
