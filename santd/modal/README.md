## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| bodyStyle | modal body 样式 | string\|object | {} |
| maskStyle | 遮罩样式 | string\|object | {} |
| modalStyle | 可用于设置浮层的样式，调整浮层位置等 | string\|object | - |
| cancelText | 取消按钮文字 | string | 取消 |
| centered | 垂直居中展示 modal | boolean | `false` |
| closable | 是否显示右上角的关闭按钮 | boolean | true |
| confirmLoading | 确定按钮 loading | boolean | 无 |
| getContainer | 指定 modal 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |
| hasFooter | 是否显示底部内容 | boolean | true |
| keyboard | 是否支持键盘esc关闭 | boolean | true |
| mask | 是否展示遮罩 | boolean | true |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | string | primary |
| okButtonProps | ok 按钮 props | [ButtonProps](/button) | - |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/button) | - |
| title | 标题 | string | 无 |
| visible | 对话框是否可见 | boolean | 无 |
| width | 宽度 | string\|number | 520 |
| wrapClassName | 对话框外层容器的类名 | string | - |
| wrapStyle | 对话框外层容器的样式 | string\|object | - |
| zIndex | 设置 modal 的 `z-index` | number | 1000 |
| on-afterClose | modal 完全关闭后的回调 | function | 无 |
| on-cancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |
| on-ok | 点击确定回调 | function(e) | 无 |

## 插槽
| 名称 | 说明 |
| --- | --- |
| (default) 默认插槽 | 主体内容 |
| title | 头部标题内容 |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `hasFooter=false` |

### modal.method()

包括：

- `modal.info`
- `modal.success`
- `modal.error`
- `modal.warning`
- `modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocusButton | 指定自动获得焦点的按钮 | null\|string: `ok` `cancel` | `ok` |
| cancelText | 取消按钮文字 | string | 取消 |
| centered | 垂直居中展示 modal | boolean | `false` |
| className | 容器类名 | string | - |
| content | 内容 | string\|SanComponent | 无 |
| iconType | 图标 Icon 类型 | string | question-circle |
| maskClosable | 点击蒙层是否允许关闭 | boolean | `false` |
| okText | 确认按钮文字 | string | 确定 |
| okType | 确认按钮类型 | string | primary |
| okButtonProps | ok 按钮 props | [ButtonProps](/button) | - |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/button) | - |
| title | 标题 | string\|SanComponent | 无 |
| width | 宽度 | string\|number | 416 |
| zIndex | 设置 modal 的 `z-index` | number | 1000 |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | 无 |

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。

```js
const modal = modal.info();

modal.update({
    title: '修改的标题',
    content: '修改的内容',
});

modal.destroy();
```
