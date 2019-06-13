<cn>
#### loading态
匹配内容列表为异步返回时。
</cn>

```html
<template>
  <div>
    <s-mention
    loading="{{loading}}"
    suggestions="{{suggestions}}"
    on-searchChange="onSearchChange"
    />
  </div>
</template>
<script>
import Mention from 'santd/mention';

const users= ['wangyongqing', 'mayihui', 'fuqiangqiang', 'zhangtingting', 'raowenjuan'];

export default {
    components: {
        's-mention': Mention
    },
    initData() {
        return {
            loading: false,
            suggestions: []
        }
    },
    fetchSuggestions(value, callback) {
        setTimeout(() => {
            callback(users.filter(item => item.indexOf(value) !== -1));
        },500);
    },
    onSearchChange(val) {
        this.fetchSuggestions(val.value, suggestions => {
            this.data.set('suggestions', suggestions);
            this.data.set('loading', false);
        });
        this.data.set('loading', true);
    }
}
</script>
```
