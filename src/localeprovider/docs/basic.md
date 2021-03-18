<codebox>
#### 国际化
用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。

```html
<template>
    <div>
        <s-localeprovider locale="{{locale}}">
            <s-pagination defaultCurrent="{{1}}" total="{{50}}" showSizeChanger="{{true}}" />
        </s-localeprovider>
    </div>
</template>
<script>
import {Pagination, LocaleProvider} from 'santd';
import zhCN from 'santd/localeprovider/zh_CN';

export default {
    initData() {
        return {
            locale: zhCN
        }
    },
    components: {
        's-localeprovider': LocaleProvider,
        's-pagination': Pagination
    }
}
</script>
```
</codebox>
