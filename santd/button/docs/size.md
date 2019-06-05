<cn>
#### 按钮尺寸
按钮有大、中、小三种尺寸。
通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。
</cn>

```html
<template>
    <div>
        <s-radiogroup value="{{size}}" on-change="handleSizeChange">
            <s-radiobutton value="large">Large</s-radiobutton>
            <s-radiobutton value="default">Default</s-radiobutton>
            <s-radiobutton value="small">Small</s-radiobutton>
        </s-radiogroup>
        <br /><br/ >
        <s-button type="primary" size="{{size}}">Primary</s-button>
        <s-button size="{{size}}">Normal</s-button>
        <s-button type="dashed" size="{{size}}">Dashed</s-button>
        <s-button type="danger" size="{{size}}">Danger</s-button>
        <br />
        <s-button type="primary" shape="circle" icon="download" size="{{size}}" />
        <s-button type="primary" shape="round" icon="download" size="{{size}}">Download</s-button>
        <s-button type="primary" icon="download" size="{{size}}">Download</s-button>
        <br />
        <s-buttongroup size="{{size}}">
          <s-button type="primary">
            <s-icon type="left" />Backward
          </s-button>
          <s-button type="primary">
            Forward<s-icon type="right" />
          </s-button>
        </s-buttongroup>
    </div>
</template>
<script>
import Button from 'santd/button';
import Radio from 'santd/radio';
import Icon from 'santd/icon';
export default {
    components: {
        's-button': Button,
        's-buttongroup': Button.Group,
        's-radiogroup': Radio.Group,
        's-radiobutton': Radio.Button,
        's-icon': Icon
    },
    initData() {
        return {
            size: 'large'
        };
    },
    handleSizeChange(e) {
        this.data.set('size', e.target.value);
    }
}
</script>
```
