## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| on-afterChange | 切换面板的回调 | function(current) | 无 |
| autoplay | 是否自动切换 | boolean | false |
| on-beforeChange | 切换面板的回调 | function(param) | 无 |
| dots | 是否显示面板指示点 | boolean | `true` |
| easing | 动画效果 | string | linear |
| dotPosition | 位置 可选 `top` `bottom` `left` `right` | string | `bottom` |

## 方法

| 名称 | 描述 |
| --- | --- |
| goTo(slideNumber) | 切换到指定面板|
| next() | 切换到下一面板 |
| prev() | 切换到上一面板 |
