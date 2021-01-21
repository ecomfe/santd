<text lang="cn">
#### with routes
设置routes，并定义item
</text>

```html
<template>
  <div>
    <s-breadcrumb routes="{{routes}}">
        <s-breadcrumb-item slot="item" href="{{routes.length - 1 > index ? route.breadcrumbName : ''}}">
            {{route.breadcrumbName}}
        </s-breadcrumb-item>
    </s-breadcrumb>
  </div>
</template>
<script>
import {Breadcrumb} from 'santd';

export default {
    initData() {
        return { 
            routes: [
                {
                    path: 'index',
                    breadcrumbName: 'home'
                }, 
                {
                    path: 'first',
                    breadcrumbName: 'first'
                }, 
                {
                    path: 'second',
                    breadcrumbName: 'second'
                }
            ]
        }
    },

    components: {
        's-breadcrumb': Breadcrumb,
        's-breadcrumb-item': Breadcrumb.Item
    }
}

</script>
```