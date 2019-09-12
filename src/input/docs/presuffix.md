<text lang="cn">
#### 前缀和后缀
在输入框上添加前缀或后缀图标。
</text>

```html
<template>
<div>
    <div style="margin-bottom: 16px">
        <s-input prefix="{{prefix}}" suffix="{{suffix}}" />
    </div>
    <div style="margin-bottom: 16px">
        <s-input
            suffix="RMB"
            prefix="￥"
        />
    </div>
</div>
</template>
<script>
import san from 'san';
import Input from 'santd/input';
import Icon from 'santd/icon';
import Tooltip from 'santd/tooltip';

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
                        <span>
                            <s-icon type="user" style="color: rgba(0, 0, 0, .25);"></s-icon>
                        </span>
                    `
                });
                return new Prefix();
            },
            suffix() {
                const suffix = san.defineComponent({
                    components: {
                        's-icon': Icon,
                        's-tooltip': Tooltip
                    },
                    template: `
                        <span>
                            <s-tooltip title="Extra information">
                                <s-icon type="info-circle" style="color: rgba(0, 0, 0, .45);"/>
                            </s-tooltip>
                        </span>
                    `
                });
                return new suffix();
            }
        }
    }
}
</script>
```
