<cn>
#### 搜索用户
一个带有远程搜索，节流控制，请求时序控制，加载状态的多选示例。
</cn>

```html
<template>
    <div>
        <s-select
            mode="multiple"
            labelInValue
            value="{{value}}"
            placeholder="Select users"
            notFoundContent="{{fetching ? notContent : 'null'}}"
            filterOption="{{false}}"
            style="width: 100%;"
            on-change="onChange"
            on-search="handleSearch"
        >
            <s-select-option s-for="d in data" value="{{d.value}}">{{d.text}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import san from 'san';
import Select from 'santd/select';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import Spin from 'santd/spin';
let timeout;
let currentValue;

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    inited() {
    },
    initData() {
        return {
            fetching: false,
            notContent() {
                return san.defineComponent({
                    components: {
                        's-spin': Spin
                    },
                    template: `
                        <span>
                            <s-spin size="small"></s-spin>
                        </span>
                    `
                });
            }
        }
    },
    handleSearch(value) {
        this.fetch(value, data => {
            this.data.set('data', data);
        });
    },
    onChange(value) {
        this.data.set('data', []);
    },
    fetch(value, callback) {
        const self = this;
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        function fake() {
          self.data.set('data', []);
          self.data.set('fetching', true);
          jsonp(`https://randomuser.me/api/?results=5`)
            .then(response => response.json())
            .then((d) => {
                const result = d.results;
                console.log('result', result);
                const data = [];
                result.forEach((user) => {
                  data.push({
                      text: `${user.name.first} ${user.name.last}`,
                      value: user.login.username
                  });
                });
                self.data.set('fetching', false);
                callback(data);
            });
        }

        timeout = setTimeout(() => {
            fake()
        }, 800);
    }
}
</script>
```
