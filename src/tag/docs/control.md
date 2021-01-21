<text lang="cn">
#### 动态添加和删除
用数组生成一组标签，可以动态添加和删除.
</text>

```html
<template>
    <div>
        <s-tag
            s-for="tag, index in tags"
            closable="{{index !== 0}}"
            on-close="handleClose(index)"
        >
            {{tag}}
        </s-tag>
        <s-input
            s-if="inputVisible"
            s-ref="inputArea"
            type="text"
            size="small"
            style="width:78px; display: inline-block;"
            on-change="handleInputChange"
            on-pressEnter="handleInputConfirm"
            on-blur="handleInputConfirm"
        ></s-input>
        <s-tag s-else on-click="handleShowInput" style="{{{background: '#fff', 'border-style': 'dashed'}}}">
            <s-icon type="plus"></s-icon>
            New Tag
        </s-tag>
    </div>
</template>
<script>
import {Tag, Input, Icon} from 'santd';

export default {
    components: {
        's-tag': Tag,
        's-input': Input,
        's-icon': Icon
    },
    initData() {
        return {
            tags: ['Unremovable', 'Tag 2','Tag 3'],
            inputVisible: false,
            inputValue: ''
        }
    },
    handleClose(index) {
        this.data.removeAt('tags', index);
    },
    handleInputChange(e) {
        this.data.set('inputValue', e);
    },
    handleInputConfirm() {
        const inputValue = this.data.get('inputValue');
        let tags = this.data.get('tags');

        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        this.data.set('tags', tags);
        this.data.set('inputVisible', false);
        this.data.set('inputValue', '');
    },
    handleShowInput() {
        this.data.set('inputVisible', true);
        this.nextTick(() => {
            this.ref('inputArea').el.querySelector('input').focus();
        });
    }
}
</script>
```
