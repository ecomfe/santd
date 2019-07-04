<cn>
#### 国际化
用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。
</cn>

```html
<template>
    <div>
        <s-localeprovider locale="{{locale}}">
            <s-pagination defaultCurrent="{{1}}" total="{{50}}" showSizeChanger />
        </s-localeprovider>
    </div>
</template>
<script>
import Pagination from 'santd/pagination';
import LocaleProvider from 'santd/localeprovider';
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
