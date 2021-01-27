<text lang="cn">
#### 手动更新和移除
手动更新和关闭 `Modal.method` 方式创建的对话框。
</text>

```html
<template>
    <div class="demo-manual">
        <s-button on-click="countDown">Open modal to close in 5s</s-button>
    </div>
</template>

<script>
import {Modal, Button} from 'santd';

export default {
    components: {
        's-button': Button
    },
    countDown() {
        let secondsToGo = 5;
        const instance = Modal.success({
            title: 'This is a notification message',
            content: `This modal will be destroyed after ${secondsToGo} second.`
        });
        setInterval(() => {
            secondsToGo -= 1;
            instance.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
            });
        }, 1000);
        setTimeout(() => instance.destroy(), secondsToGo * 1000);
    }
}
</script>

<style>
.demo-manual {}
</style>
```
