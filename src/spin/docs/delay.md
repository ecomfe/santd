<text lang="cn">
#### 延迟
延迟显示 loading 效果。当 spinning 状态在 `delay` 时间内结束，则不显示 loading 状态。
</text>

```html
<template>
    <div>
        <s-spin spinning="{{loading}}" delay="{{500}}">
            <s-alert slot="content"
                type="info"
                message="Alert message title"
                description="Further details about the context of this alert."
            >
            </s-alert>
        </s-spin>
        <div style="margin-top: 16px;">
            Loading state：<s-switch checked={{loading}} on-change="toggleHandler"/>
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
    toggleHandler() {
        const loading = this.data.get('loading');
        this.data.set('loading', !loading);
    }
}
</script>
```
