<text lang="cn">
#### 搜索框
搜索和远程数据结合。
</text>

```html
<template>
    <div>
        <s-select
            showSearch="{{true}}"
            value="{{value}}"
            showArrow="{{false}}"
            filterOption="{{false}}"
            notFoundContent="null"
            style="width: 200px;"
            placeholder="input search text"
            on-search="handleSearch"
            on-change="handleChange"
        >
            <s-select-option s-for="d in data trackBy d.value" value="{{d.value}}">{{d.text}}</s-select-option>
        </s-select>
    </div>
</template>
<script>
import Select from 'santd/select';
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
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 500);
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
        }
    },
    handleSearch(value) {
        fetch(value, data => {
            console.log('data is::', data);
            this.data.set('data', data);
        });
    },
    handleChange(value) {
        console.log('value is: ', value);
    }
}
</script>
```
