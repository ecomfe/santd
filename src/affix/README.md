## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | - |
| on-change   | 固定状态改变时触发的回调函数 | Function(affixed) | - |

> 注意：Affix 内的元素不要使用绝对定位.如需要绝对定位的效果，可以直接设置 Affix 为绝对定位：

```html
<s-affix style="position: 'absolute'; top: y; left: x">
  ...
</s-affix>
```
