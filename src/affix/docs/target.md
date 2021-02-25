<text lang="cn">
#### 滚动容器
用 `target` 设置 `Affix` 需要监听其滚动事件的元素，默认为 `window`。
</text>

```html
<template>
    <div class="scrollable-container">
      <div class="background">
        <s-affix target="{{target}}">
          <s-button type="primary">Fixed at the top of container</s-button>
        </s-affix>
      </div>
    </div>
</template>

<script>
import {Affix, Button} from 'santd';

export default {
    components: {
        's-affix': Affix,
        's-button': Button
    },
    initData() {
        return {
            // this.el用于获取组件根元素，这个例子里即class为scrollable-container的元素
            // 如果要获取根元素以外的元素，使用ref，详见：https://baidu.github.io/san/doc/api/#ref
            target: () => this.el
        }
    },
}
</script>

<style>
.scrollable-container {
  height: 100px;
  overflow-y: scroll;
}
.background {
  padding-top: 60px;
  height: 300px;
  background-image: url('https://zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg');
}
</style>
```
