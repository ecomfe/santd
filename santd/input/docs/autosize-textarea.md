<text lang="cn">
#### 适应文本高度的文本域
`autosize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。此外 `autosize` 可以设定为一个对象，指定最小行数和最大行数。
</text>

```html
<template>
<div>
    <div style="margin-bottom: 10px;">
        <s-textarea placeholder="please input something" autosize on-pressEnter="onPressEnter" defaultValue="defaultValue"></s-textarea>
    </div>
    <div style="margin-bottom: 10px;">
        <s-textarea placeholder="please input something" autosize="{minRows: 2, maxRows: 6}"></s-textarea>
    </div>
</div>
</template>
<script>
import Input from 'santd/input';
import Icon from 'santd/icon';
export default {
    components: {
        's-input': Input,
        's-icon': Icon,
        's-textarea': Input.TextArea
    },
    onChange(value) {
        console.log('the value is: ', value);
    },
    onPressEnter(value) {
        console.log('pressEnter string is :', value);
    }
}
</script>

```