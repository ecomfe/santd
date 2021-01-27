<text lang="cn">
#### 热门标签
选择你感兴趣的话题。
</text>

```html
<template>
    <div>
        <strong style="margin-right: 8px;">Categories:</strong>
        <template s-for="tag in tags">
            <s-checkabletag on-change="handleChange(tag)">{{tag}}</s-checkabletag>
        </template>
    </div>
</template>
<script>
import {Tag} from 'santd';

export default {
    components: {
        's-checkabletag': Tag.CheckableTag
    },
    initData() {
        return {
            tags: ['Movies', 'Books', 'Music', 'Sports'],
            selectedTags: []
        };
    },
    handleChange(tag) {
        const selectedTags = this.data.get('selectedTags');
        const index = selectedTags.indexOf(tag);
        if (index > -1) {
            this.data.removeAt('selectedTags', index);
        }
        else {
            this.data.push('selectedTags', tag);
        }
        console.log('You are interested in: ', this.data.get('selectedTags'));
    }
}
</script>
```
