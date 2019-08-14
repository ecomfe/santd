<text lang="cn">
#### 卡片加载中
可以直接把`slot=content`的内容内嵌到 `Spin` 中，将现有容器变为加载状态。
</text>

```html
<template>
    <div>
        <s-spin spinning="{{loading}}">
            <s-alert slot="content"
                type="info"
                message="Alert message title"
                description="Further details about the context of this alert."
            >
        </s-spin>
        <div style="margin-top: 16px;">
            Loading state： <s-switch checked="{=loading=}" on-change="toggle"/>
        <div>
    </div>
</template>

<script>
import alert from 'santd/alert';
import spin from 'santd/spin';
import switcher from 'santd/switch';

export default {
    components: {
        's-alert': alert,
        's-spin': spin,
        's-switch': switcher
    },
    initData() {
        return {
            loading: false
        }
    },
    toggle() {
        const loading = this.data.get('loading');
        this.data.set('loading', !loading);
    }
}
</script>
```
