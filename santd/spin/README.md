## API

| 参数             | 说明                                                                     | 类型          | 默认值    |
| ---              | ---                                                                      | ---           | ---       |
| delay            | (todo)延迟显示加载效果的时间（防止闪烁）                                 | number (毫秒) | -         |
| indicator        | 自定义加载指示符                                                         | slot          | -         |
| size             | 组件大小，可选值为 `small` `default` `large`                             | string        | 'default' |
| spinning         | 是否为加载中状态                                                         | boolean       | true      |
| tip              | 当作为包裹元素时，可以自定义描述文案                                     | string        | -         |
| wrapperClassName | 包装器的类属性                                                           | string        | -         |
| content          | 可以直接把`slot=content`的内容内嵌到 `Spin` 中，将现有容器变为加载状态。 | slot              | -           |

## 静态方法

- `spin.setDefaultIndicator(indicator: SanComponent)`
  同上 `indicator`，你可以自定义全局默认元素
