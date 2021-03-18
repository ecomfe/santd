<codebox>
#### 扩展菜单
使用 `dropdownRender` 对下拉菜单进行自由扩展。自定义内容点击时会关闭浮层，如果不喜欢关闭，可以添加 `on-mousedown={e => e.preventDefault()}` 进行阻止。

```html
<template>
    <div>
        <s-select
            style="width: 240px;"
            placeholder="custom dropdown render"
        >
            <s-select-option
                s-for="item in items"
                value="{{item}}"
            >{{item}}</s-select-option>
            <template slot="dropdownRender">
                <s-divider style="margin: 4px 0;"/>
                <div
                    style="padding: 4px 8px; cursor: pointer;"
                    on-mousedown="handleMouseDown"
                    on-click="addItem"
                >
                    <s-icon type="plus"/> Add item
                </div>
            </template>
        </s-select>
    </div>
</template>

<script>
import {Select, Icon, Divider} from 'santd';

let index = 0;

export default {
    components: {
        's-divider': Divider,
        's-icon': Icon,
        's-select': Select,
        's-select-option': Select.Option
    },
    initData() {
        return {
            items: ['jack', 'lucy']
        };
    },
    addItem() {
        console.log('addItem');
        const items = this.data.get('items');
        this.data.set('items', [...items, `New item ${index++}`]);
    },
    handleMouseDown(e) {
        e.preventDefault();
    }
}
</script>
```
</codebox>
