<cn>
#### 包含子组件
加载占位图包含子组件。
</cn>

```html
<template>
    <div class="demo-children">
        <div class="article">
            <s-skeleton loading="{=loading=}">
                <div>
                    <h4>Ant Design, a design language</h4>
                    <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
                </div>
            </s-skeleton>
            <s-button on-click="showSkeleton" disabled="{{loading}}">
                Show Skeleton
            </s-button>
        </div>
    </div>
</template>

<script>
import button from 'santd/button';
import skeleton from 'santd/skeleton';

export default {
    components: {
        's-button': button,
        's-skeleton': skeleton
    },
    initData() {
        return {
            loading: false
        };
    },
    showSkeleton() {
        this.data.set('loading', true);
        setTimeout(() => {
            this.data.set('loading', false);
        }, 3000);
    }
}
</script>

<style>
.demo-children .article h4 {
    margin-bottom: 16px;
}
.demo-children .article button {
    margin-top: 16px;
}
</style>
```
