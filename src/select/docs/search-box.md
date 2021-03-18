<codebox>
#### 搜索框
搜索和远程数据结合。

```html
<template>
    <div>
        <s-select
            showSearch="{{true}}"
            value="{{value}}"
            showArrow="{{false}}"
            filterOption="{{false}}"
            notFoundContent="{{null}}"
            defaultActiveFirstOption="{{false}}"
            style="width: 200px;"
            placeholder="input search text"
            on-search="handleSearch"
            on-change="handleChange"
        >
            <s-select-option
                s-for="d in data"
                value="{{d.value}}"
            >{{d.text}}</s-select-option>
        </s-select>
    </div>
</template>

<script>
import {Select} from 'santd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';

let timeout;
let currentValue;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        const str = querystring.encode({
            code: 'utf-8',
            q: value,
        });
        jsonp(`https://suggest.taobao.com/sug?${str}`)
            .then(response => response.json())
            .then(d => {
                if (currentValue === value) {
                    const data = [];
                    d.result.forEach(r => {
                        data.push({
                            value: r[0],
                            text: r[0],
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}

export default {
    components: {
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            data: [],
            value: undefined
        };
    },
    handleSearch(value) {
        if (value) {
            fetch(value, data => this.data.set('data', data));
        }
        else {
            this.data.set('data', []);
        }
    },
    handleChange(value) {
        this.data.set('value', value);
    }
}
</script>
```
</codebox>
