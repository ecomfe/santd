<cn>
#### 头像
自定义建议（含头像） <br>
注意，自定义建议时，onSearchChange 必须不能为空。
</cn>

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
import Avatar from 'santd/avatar';

const webFrameworks = [
    {
      name: 'React',
      type: 'JavaScript',
      icon: 'https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg',
    },
    {
      name: 'Angular',
      type: 'JavaScript',
      icon: 'https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png',
    },
    {
      name: 'Dva',
      type: 'Javascript',
      icon: 'https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png',
    },
    {
      name: 'Flask',
      type: 'Python',
      icon: 'https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png',
    }
];

const navComponent = function(value = '') {
    return san.defineComponent({
        components:{
            's-mention': Mention,
            's-nav': Mention.Nav,
            's-avatar': Avatar
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
                    <s-avatar
                         src="{{suggestion.icon}}"
                         size="small"
                         style="width:14px;height:14px;margin-right:8px;top:-1;position:relative"
                    ></s-avatar>
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
