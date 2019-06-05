<cn>
#### slider
A AntDesign-San Component
</cn>

```html
<template>
  <div>
    <div style="height: 300px;">
  	    <s-slider value="{{88}}" marks="{{marks}}" vertical step="{{novalue}}" style="float: left;height: 300px"/>
        <s-slider range value="{{[10,50]}}" tipFormatter="__value__%" step="{{10}}" vertical style="float: left;height:300px;margin-left: 100px"/>
    </div>
  </div>
</template>
<script>
import slider from 'santd/slider';
export default {
    components: {
        's-slider': slider
    },
    initData() {
        return {
            novalue: null,
            marks: {
                0: '0°C',
                26: '26°C',
                37: '37°C',
                100: {
                    style: 'color: #f50',
                    label: '100°C'
                }
            }
        };
    }
}
</script>
```