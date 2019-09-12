<text lang="cn">
#### 查询模式 - 不确定类目
查询模式 - 不确定类目
</text>

```html
<template>
  <div className="global-search-wrapper">
  	<s-auto-complete
        className="global-search"
        dropdownClassName="certain-category-search-dropdown"
        style="width: 300px;"
        placeholder="input here"
        on-select="onSelect"
        on-search="handleSearch"
    >
        <s-option s-for="item in dataSource" key="{{item.category}}" value="{{item.category}}">
            <div className="global-search-item">
                <span className="global-search-item-desc">
                    {{item.query}} 在
                    <a href="https://baidu.github.io/san/" target="_blank">{{item.category}}</a>
                    区块中
                </span>
                <span className="global-search-item-count">约 {{item.count}} 个结果</span>
            </div>
        </s-option>
    </s-auto-complete>
  </div>
</template>
<script>
import san from 'san';
import autoComplete from 'santd/auto-complete';
import input from 'santd/input';

const getRandomInt = function (max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const searchResult = function(query) {
    return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((item, idx) => ({
      query,
      category: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }));
};

export default {
    components: {
        's-auto-complete': autoComplete,
        's-input': input,
        's-option-group': autoComplete.Group,
        's-option': autoComplete.Option
    },
    initData() {
        return {
            dataSource: []
        };
    },
    onSelect(val) {
        console.log('select value is: ', val);
    },
    handleSearch(val) {
        val ? this.data.set('dataSource', searchResult(val)) : this.data.set('dataSource', []);
    }
}
</script>
<style>
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete .san-select-selection--single {
  margin-right: -46px;
}

.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {
  right: 0;
}

.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-item {
  display: flex;
}

.global-search-item-desc {
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.global-search-item-count {
  flex: none;
}

</style>
```
