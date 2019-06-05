<cn>
#### 异步返回
数据异步返回后，展示菜单。
</cn>

```html
<template>
  <div style="width:256px;">
    <s-menu
        mode="inline"
        theme="dark"
        defaultOpenKeys="{{defOpenkey}}"
        defaultSelectedKeys="title1"
        on-click="itemClick"
    >
    <s-sub-menu s-for="item in itemsData" key="{{item.key}}">
        <span slot="title"><s-icon type="{{item.type}}"/><span>{{item.suTitle}}</span></span>
        <s-menu-item s-if="item.children" s-for="child in item.children" key="{{child.key}}">
            <s-icon type="{{child.type}}"></s-icon>
            <span>{{child.title}}</span>
        </s-menu-item>
    </s-sub-menu>
    </s-menu>
  </div>
</template>
<script>
import Menu from 'santd/menu';
import Icon from 'santd/icon';
import Button from 'santd/button';

const subData = [
    {
        key: 'sub1',
        type: 'search',
        suTitle: 'Navigation One',
        children: [
            {
                key: 'title1',
                type: 'copy',
                title: '标题一'
            },
            {
                key: 'title2',
                type: 'copy',
                title: '标题2'
            },
            {
                key: 'title3',
                type: 'copy',
                title: '标题3'
            }
        ]
    },
    {
        key: 'sub2',
        type: 'search',
        suTitle: 'Navigation Two',
        children: [
            {
                key: 'title4',
                type: 'copy',
                title: '标题4'
            },
            {
                key: 'title5',
                type: 'copy',
                title: '标题5'
            },
            {
                key: 'title6',
                type: 'copy',
                title: '标题6'
            }
        ]
    }
]
export default {
    components: {
        's-menu': Menu,
        's-sub-menu': Menu.Sub,
        's-menu-item': Menu.Item,
        's-icon': Icon,
        's-button': Button
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    initData () {
      return {
        collapsed: false,
        itemsData: '',
        defOpenkey: ''
      }
    },
    itemClick(val) {
        console.log('选中的值是: ', val);
    },
    attached() {
        setTimeout(() => {
            this.data.set('defOpenkey', ['sub1'])
            this.data.set('itemsData', subData);
        }, 1000);
    }

}
</script>
<style type="text/css">
  ul {
    list-style: none;
}
.markdown ul li {
  margin: 0;
  padding: 0;
  list-style-type: inherit !important;
}
</style>
```
