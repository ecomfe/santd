<text lang="cn">
#### 基本用法
相邻组件水平间距。
</text>

```html
<template>
  <s-space>
    <div>Space</div>
    <s-button type="primary">Button</s-button>
    <s-upload>
      <s-button>
        <s-icon type="upload" /> Click to Upload
      </s-button>
    </s-upload>
    <s-popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <s-button>Confirm</s-button>
    </s-popconfirm>
  </s-space>
</template>

<script>
import {Space, Upload, Button, Icon, Popconfirm} from 'santd';

export default {
    components: {
        's-space': Space,
        's-upload': Upload,
        's-button': Button,
        's-icon': Icon,
        's-popconfirm': Popconfirm
    }
}
</script>
```
