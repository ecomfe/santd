<text lang="cn">
#### 搜索用户
一个带有远程搜索，防抖控制，请求时序控制，加载状态的多选示例。
</text>

```html
<template>
    <div>
        <s-select
            mode="multiple"
            labelInValue="{{true}}"
            value="{{value}}"
            placeholder="Select users"
            filterOption="{{false}}"
            style="width: 100%;"
            on-search="fetchUser"
            on-change="handleChange"
        >
            <s-select-option
                s-for="d in data"
                value="{{d.value}}"
            >{{d.text}}</s-select-option>
            <s-spin s-if="fetching" slot="notFoundContent" size="small"/>
        </s-select>
    </div>
</template>

<script>
import san from 'san';
import {Select, Spin} from 'santd';
import debounce from 'lodash/debounce';
import jsonp from 'fetch-jsonp';

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option,
        's-spin': Spin
    },
    inited() {
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);
    },
    initData() {
        return {
            data: [],
            value: [],
            fetching: false
        };
    },
    setState(object) {
        Object.keys(object).forEach(key => {
            this.data.set(key, object[key]);
        });
    },
    handleChange(value) {
        this.setState({
            value,
            data: [],
            fetching: false
        });
    },
    fetchUser(value) {
        console.log('fetching user', value);
        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;
        this.setState({data: [], fetching: true});
        jsonp('https://randomuser.me/api/?results=5').then(response => response.json()).then(body => {
            if (fetchId !== this.lastFetchId) {
                // for fetch callback order
                return;
            }
            const data = body.results.map(user => ({
                text: `${user.name.first} ${user.name.last}`,
                value: user.login.username
            }));
            this.setState({data, fetching: false});
        });
    }
}
</script>
```
