<cn>
#### 文本域
用于多行输入。
</cn>

```html
<template>
<div>
    <div style="margin-bottom: 10px;">
        <s-textarea placeholder="please input something" rows="5" on-pressEnter="onPressEnter" defaultValue="defaultValue" value="{{textArea}}" on-textareaBlur="onBlur"></s-textarea>
    </div>
</div>
</template>
<script>
import Input from 'santd/input';
export default {
    components: {
        's-input': Input,
        's-textarea': Input.TextArea
    },
    initData() {
        return {
            textArea: 'textarea'
        }
    },
    attached() {
        setTimeout(() => {
            this.data.set('textArea', '这是textarea的value');
        },1000);
    },
    onChange(value) {
        console.log('the value is: ', value);
    },
    onPressEnter(value) {
        console.log('pressEnter string is :', value);
    },
    onBlur(value) {
        console.log('blur value is : ', value);
    }
}
</script>

```
