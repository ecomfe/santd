<text lang="cn">
#### 国际化
用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。
</text>

```html
<template>
    <div>
        <s-locale-provider locale="{{locale}}">
            <s-pagination defaultCurrent="{{1}}" total="{{50}}" showSizeChanger="{{true}}" />
        </s-locale-provider>
    </div>
</template>
<script>
import {Pagination, LocaleProvider} from 'santd';
import zhCN from 'santd/locale-provider/zh_CN';

export default {
    initData() {
        return {
            locale: zhCN
        }
    },
    components: {
        's-locale-provider': LocaleProvider,
        's-pagination': Pagination
    }
}
</script>
```
