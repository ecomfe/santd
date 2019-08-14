<text lang="cn">
#### 自定义 icon
自定义 icon。
</text>

```html
<template>
    <div>
        <s-result
            icon="{{icon}}"
            title="Great, we have done all the operations!"
            extra="{{extra}}"
        />
    </div>
</template>
<script>
import Result from 'santd/result';
import Button from 'santd/button';
import Icon from 'santd/icon';
import san from 'san';

export default {
    components: {
        's-result': Result
    },
    initData() {
        return {
            extra: san.defineComponent({
                components: {
                    's-button': Button
                },
                template: `<div>
                    <s-button type="primary">Next</s-button>
                </div>`
            }),
            icon: san.defineComponent({
                components: {
                    's-icon': Icon
                },
                template: `<div>
                    <s-icon type="smile" theme="twoTone" />
                </div>`
            })
        }
    }
}
</script>
```
