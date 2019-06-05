<cn>
#### 手动更新和移除
手动更新和关闭 `Modal.method` 方式创建的对话框。
</cn>

```html
<template>
    <div class="demo-manual">
        <s-button on-click="countDown">Open modal to close in 5s</s-button>
    </div>
</template>

<script>
import button from 'santd/button';
import modal from 'santd/modal';

export default {
    components: {
        's-button': button
    },
    countDown() {
        let secondsToGo = 5;
        const instance = modal.success({
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
