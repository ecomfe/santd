# LocaleProvider 国际化
为组件内建文案提供统一的国际化支持。

## 使用
LocaleProvider只需在应用外围包裹一次即可全局生效。

```js
import {LocaleProvider} from 'santd';
import zh_CN from 'santd/localeprovider/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

return san.defineComponent({
    initData() {
        return {
            locale: zh_CN
        };
    },
    components: {
        's-localprovider': LocaleProvider
    },
    template: '<div>
        <s-localeprovider locale=\"{{locale}}\"><app /></s-localeprovider>
    </div>'
})
```
我们提供了英语，中文，俄语，法语，德语等多种语言支持，所有语言包可以在 [这里](https://github.com/ecomfe/santd/tree/master/src/localeprovider) 找到。

## 增加语言包
如果你找不到你需要的语言包，欢迎你在 [英文语言包](https://github.com/ecomfe/santd/blob/master/src/localeprovider/default.js) 的基础上创建一个新的语言包，并给我们 Pull Request。


## 代码演示
