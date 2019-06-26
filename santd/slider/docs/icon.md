<cn>
#### 带 icon 的滑块
滑块左右可以设置图标来表达业务含义。
</cn>

```html
<template>
    <div class="icon-wrapper">
        <s-icon style="color: {{preColor}}" type="frown-o" />
        <s-slider disabled="{{disabled}}" on-change="handleChange" value="{{value}}" min="{{0}}" max="{{20}}"/>
        <s-icon style="color: {{nextColor}}" type="smile-o" />
    </div>
</template>
<script>
import Slider from 'santd/slider';
import Icon from 'santd/icon';
export default {
    components: {
        's-slider': Slider,
        's-icon': Icon
    },
    computed: {
        preColor() {
            const value = this.data.get('value');
            return value >= 10 ? '' : 'rgba(0, 0, 0, .45)';
        },
        nextColor() {
            const value = this.data.get('value');
            return value >= 10 ? 'rgba(0, 0, 0, .45)' : '';
        }
    },
    initData() {
        return {
            value: 0
        };
    },
    handleChange(value)  {
        this.data.set('value', value);
    }
}
</script>
<style>
.icon-wrapper {
    position: relative;
    padding: 0px 30px;
}

.icon-wrapper .san-icon {
    position: absolute;
    top: -2px;
    width: 16px;
    height: 16px;
    line-height: 1;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.25);
}

.icon-wrapper .san-icon:first-child {
    left: 0;
}

.icon-wrapper .san-icon:last-child {
    right: 0;
}
</style>
```
