<text lang="cn">
#### 前缀和后缀
在输入框上添加前缀或后缀图标。
</text>

```html
<template>
  <div>
    <div style="margin-bottom: 16px">
      <s-input on-change="onChange" prefix="{{prefix}}" value="{{value}}" />
    </div>
    <div style="margin-bottom: 16px">
      <s-input
        defaultValue="mysite"
        on-pressEnter="onPressEnter"
        suffix="{{suffix}}"
      />
    </div>
  </div>
</template>
<script>
import san from 'san';
import Input from 'santd/input';
import Icon from 'santd/icon';
export default {
    components: {
        's-input': Input,
        's-icon': Icon
    },
    initData() {
        return {
            prefix() {
                const Prefix = san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <div>
                            <s-icon type="user"></s-icon>
                        </div>
                    `
                });
                return new Prefix();
            },
            suffix() {
                const suffix = san.defineComponent({
                    components: {
                        's-icon': Icon
                    },
                    template: `
                        <div>
                            <s-icon type="user"></s-icon>
                        </div>
                    `
                });
                return new suffix();
            }
        }
    },
    attached() {
        setTimeout(() => {
            this.data.set('value', 1234);
        },1000)
    },
    onChange(value) {
        console.log('the value is: ', value);
    },
    onPressEnter(value) {
      console.log('pressEnter value : ', value);
    }
}
</script>
```
