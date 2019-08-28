<text lang="cn">
#### 查询模式 - 确定类目
查询模式 - 确定类目
</text>

```html
<template>
  <div className="certain-category-search-wrapper">
  	<s-auto-complete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        style="width: 300px;"
        placeholder="input here"
        on-select="onSelect"
    >
        <template s-for="item in dataSource">
            <s-option-group key="{{item}}" label="{{renderTitle}}">
                <s-option s-for="child in item.children" key="{{child.title}}" value="{{child.title}}">
                    {{child.title}}
                    <span class="certain-search-item-count">{{child.count}} 人 关注</span>
                </s-option>
            </s-option-group>
        </template>
    </s-auto-complete>
  </div>
</template>
<script>
import san from 'san';
import autoComplete from 'santd/auto-complete';
import input from 'santd/input';

const componentTitle = function() {
    return san.defineComponent({
        computed: {
            titles() {
                // key 就是option-group的key
                const key = this.data.get('key');
                return key.title;
            }
        },
        template: `
            <span>
                {{titles}}
                <a href="https://baidu.github.io/san/" target="_blank" style="float: right">更多</a>
            </span>
        `
    });
}

const dataSource = [
  {
    title: '话题',
    children: [
      {
        title: 'Santd',
        count: 10000,
      },
      {
        title: 'Santd UI',
        count: 10600,
      },
    ],
  },
  {
    title: '问题',
    children: [
      {
        title: 'Santd UI 有多好',
        count: 60100,
      },
      {
        title: 'Santd 是啥',
        count: 30010,
      },
    ],
  },
  {
    title: '文章',
    children: [
      {
        title: 'Santd 是一个设计语言',
        count: 100000,
      },
    ],
  },
];

export default {
    components: {
        's-auto-complete': autoComplete,
        's-input': input,
        's-option-group': autoComplete.Group,
        's-option': autoComplete.Option
    },
    initData() {
        return {
            dataSource: dataSource,
            renderTitle: componentTitle
        };
    },
    onSelect(val) {
        console.log('select value is: ', val);
    }
}
</script>
<style>
.certain-category-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {
  right: 12px;
}

.certain-category-search-dropdown .san-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .san-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .san-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .san-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .san-select-dropdown-menu {
  max-height: 300px;
}

.certain-search-item-count {
  position: absolute;
  color: #999;
  right: 16px;
}

.certain-category-search.san-select-focused .certain-category-icon {
  color: #108ee9;
}

.certain-category-icon {
  color: #6e6e6e;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 16px;
}

</style>
```
