<text lang="cn">
#### 加载中状态
添加 `loading` 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。
</text>

```html
<template>
    <div>
        <s-button type="primary" loading>
          Loading
        </s-button>
        <s-button type="primary" size="small" loading>
          Loading
        </s-button>
        <br />
        <s-button type="primary" loading="{{loading}}" on-click="enterLoading">
          Click me!
        </s-button>
        <s-button type="primary" icon="poweroff" loading="{{iconLoading}}" on-click="enterIconLoading">
          Click me!
        </s-button>
        <br />
        <s-button shape="circle" loading />
        <s-button type="primary" shape="circle" loading />
    </div>
</template>
<script>
import Button from 'santd/button';
export default {
    components: {
        's-button': Button
    },
    initData() {
        return {
            loading: false,
            iconLoading: false
        }
    },
    enterLoading() {
        this.data.set('loading', {delay: 1000});
    },
    enterIconLoading() {
        this.data.set('iconLoading', true);
    }
}
</script>
```
