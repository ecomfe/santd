<text lang="cn">
#### 自定义触发字符
通过 `prefix` 属性自定义触发字符。默认为 `@`, 可以定义为数组。
</text>

```html
<template>
  <div>
    <s-mention
        placeholder="input @ to mention people, # to mention tag"
        prefix="{{ ['@', '#'] }}"
        on-searchChange="onSearchChange"
        suggestions="{{suggestions}}"
    />
  </div>
</template>
<script>
import mention from 'santd/mention';
const users = ['liudehua', 'zhoujielun', 'zhouxingchi', 'zhaowei', 'linxinru', 'fanbingbing', 'liuxiang'];
const tags = ['1.0', '2.0', '3.0'];
export default {
    components: {
        's-mention': mention
    },
    onSearchChange(e) {
        let value = e.value;
        let trigger = e.trigger;
        const dataSource = trigger === '@' ? users : tags;
        let filtered = dataSource.filter(item => (
            item.indexOf(value) !== -1
        ));
        console.log('filtered:', filtered);
        this.data.set('suggestions', filtered);
    }
}
</script>
```