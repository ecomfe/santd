## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| actions | 在评论内容下面呈现的操作项列表的容器 | Slot | - |
| author | 要显示为注释作者的元素 | Slot | - |
| avatar | 要显示为评论头像的元素 | Slot | - |
| nested | 嵌套注释应作为注释的子项提供 | Slot | - |
| content | 评论的主要内容 | Slot | - |
| datetime | 展示时间描述 | Slot | - |

## Comment.Action

评论内容下面呈现的操作项，例：

```js
<s-comment-action>Reply To</s-comment-action>
```
