<text lang="cn">
#### 带面包屑页头
带面包屑页头，适合层级比较深的页面，让用户可以快速导航。
</text>

```html
<template>
  <div>
  	<s-pageheader
        onBack="{{onBack}}"
        title="Title"
        subTitle="This is a subtitle"
        breadcrumb="{{breadcrumb}}"></s-pageheader>
  </div>
</template>
<script>
import pageheader from 'santd/pageheader';

export default {
    components: {
        's-pageheader': pageheader
    },
    initData() {
        return {
            onBack: () => {
                console.log('onBack');
            },
            breadcrumb: {
                routes: [
                    {
                        path: 'index',
                        breadcrumbName: 'First-level Menu',
                    },
                    {
                        path: 'first',
                        breadcrumbName: 'Second-level Menu',
                    },
                    {
                        path: 'second',
                        breadcrumbName: 'Third-level Menu',
                    },
                ]
            }
        }
    }
}
</script>
```
