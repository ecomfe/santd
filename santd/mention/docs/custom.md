<text lang="cn">
#### 自定义建议
自定义建议 <br>
注意，自定义建议时，onSearchChange 必须不能为空。
</text>

```html
<template>
  <div>
    <s-mention
        suggestions="{{suggestions}}"
        placeholder="@someone"
        on-searchChange="onSearchChange"
        on-select="onSelect"
    />
  </div>
</template>
<script>
import san from 'san';
import Mention from 'santd/mention';

const webFrameworks = [
  { name: 'React', type: 'JavaScript' },
  { name: 'Angular', type: 'JavaScript' },
  { name: 'Laravel', type: 'PHP'},
  { name: 'Flask', type: 'Python' },
  { name: 'Django', type: 'Python' },
];

const navComponent = function(value = '') {
    return san.defineComponent({
        components:{
            's-mention': Mention,
            's-nav': Mention.Nav
        },
        computed: {
            filtered() {
                const searchValue = value.toLowerCase();
                const filtered = webFrameworks.filter(item => item.name.toLowerCase().indexOf(searchValue) !== -1);
                return filtered
            }
        },
        template: `
            <div>
                <s-nav s-for="suggestion in filtered" value="{{suggestion.name}}">
                    <span>{{suggestion.name}} - {{suggestion.type}}</span>
                </s-nav>
            </div>
        `
    });
};

export default {
    components: {
        's-mention': Mention
    },
    initData() {
        return {
            searchValue: '',
            suggestions: navComponent()
        };
    },
    onSearchChange(val) {
        this.data.set('suggestions', navComponent(val.value));
    },
    onSelect(val) {
        console.log('select: ', val);
    }
}
</script>
```
