<text lang="cn">
#### 新增和关闭页签
只有卡片样式的页签支持新增和关闭选项。
使用 `closable="{{false}}"` 禁止关闭。
</text>

```html
<template>
    <div class="" >
        <s-tabs
            activeKey="{{activeKey}}"
            type="editable-card"
            on-edit="handleEdit"
        >
            <s-tabpane
                s-for="pane in panes"
                tab="{{pane.title}}"
                key="{{pane.key}}"
                closable="{{pane.closable}}"
            >
                <div>{{pane.content}}</div>
            </s-tabpane>
        </s-tabs>
    </div>
</template>
<script>
import tabs from 'santd/tabs';
export default {
    initData() {
        return {
            panes: [{
                title: 'Tab 1',
                content: 'Content of Tab 1',
                key: '1',
                closable: true
            }, {
                title: 'Tab 2',
                content: 'Content of Tab 2',
                key: '2',
                closable: true
            }, {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                closable: false
            }],
            activeKey: '1',
            newTabIndex: 0
        };
    },
    components: {
        's-tabs': tabs,
        's-tabpane': tabs.TabPane
    },
    handleEdit({key, action}) {
        this[action](key);
    },
    add() {
        const panes = this.data.get('panes');
        let newTabIndex = this.data.get('newTabIndex');
        const activeKey = 'newTab' + newTabIndex++;

        panes.push({ title: 'New Tab' + newTabIndex, content: 'Content of new Tab' + newTabIndex, key: activeKey })
        this.data.set('panes',  Object.assign([],panes));
        this.data.set('activeKey', activeKey);
        this.data.set('newTabIndex', newTabIndex);
    },
    remove (targetKey) {
        let activeKey = this.data.get('activeKey');
        let lastIndex;
        this.data.get('panes').forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.data.get('panes').filter(pane => pane.key !== targetKey)
        if (panes.length > 0 && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            }
            else {
                activeKey = panes[0].key
            }
        }
        this.data.set('panes', panes);
        this.data.set('activeKey', activeKey);
    },
}
</script>
```
