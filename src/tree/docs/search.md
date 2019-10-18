<text lang="cn">
#### 可搜索
可搜索的树。
</text>

```html
<template>
  <div>
    <s-input-search
        on-change="onInputChange"
        placeholder="input search"
        style="margin-bottom: 8px;"
    ></s-input-search>
    <s-tree
        autoExpandParent="{{autoExpand}}"
        treeData="{{treeData}}"
        expandedKeys="{{expandedKeys}}"
        searchValue="{{searchValue}}"
    >
        <template slot="title">
            <span s-if="isTitles(title, searchValue)">
                {{beforeStr(title, searchValue)}}
                <span style="color: #f50">{{searchValue}}</span>
                {{afterStr(title, searchValue)}}
            </span>
            <span s-else>{{title}}</span>
        </template>
    </s-tree>
  </div>
</template>
<script>
import san from 'san';
import Tree from 'santd/tree';
import Input from 'santd/input';

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey;
}

export default {
    components: {
        's-tree': Tree,
        's-tree-node': Tree.TreeNode,
        's-input-search': Input.Search
    },
    initData() {
        return {
            autoExpand: true,
            expandedKeys: [],
            searchValue: '',
            treeData: gData
        }
    },
    isTitles(title, searchValue) {
        return searchValue ? title.indexOf(searchValue) > -1 : false;
    },
    beforeStr(title, searchValue) {
        return searchValue ? title.substr(0, title.indexOf(searchValue)) : '';
    },
    afterStr(title, searchValue) {
        return searchValue ? title.substr(title.indexOf(searchValue) + searchValue.length) : '';
    },
    onInputChange (value) {
        const expandedKeys = dataList.map((item) => {
            if (item.key.indexOf(value) > -1) {
                return getParentKey(item.key, gData)
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.data.set('expandedKeys', expandedKeys);
        this.data.set('searchValue', value);
    }
}
</script>
```
