<codebox>
#### 条件触发
可以判断是否需要弹出。

```html
<template>
    <div>
        <s-popconfirm
            title="Are you sure delete this task?"
            visible="{{visible}}"
            on-confirm="handleConfirm"
            on-cancel="handleCancel"
            okText="Yes"
            cancelText="No"
            on-visibleChange="handleVisibleChange"
        >
            <a href="javascript:void(0);">Delete</a>
        </s-popconfirm>
        <br />
        Whether directly execute: <s-switch defaultChecked="{{true}}" on-change="handleChangeCondition"></s-switch>
    </div>
</template>
<script>
import {Popconfirm, Button, Icon, Switch} from 'santd';
import message from 'santd/es/message';
import 'santd/es/message/style';

export default {
    initData() {
        return {
            visible: false,
            condition: true
        };
    },
    components: {
        's-popconfirm': Popconfirm,
        's-button': Button,
        's-icon': Icon,
        's-switch': Switch
    },
    handleConfirm(e) {
        this.data.set('visible', false);
        message.success('Next step.');
    },
    handleCancel(e) {
        this.data.set('visible', false);
        message.error('Click on cancel.');
    },
    handleChangeCondition(value) {
        this.data.set('condition', value);
    },
    handleVisibleChange(visible) {
        if (!visible) {
            this.data.set('visible', visible);
            return;
        }
        if (this.data.get('condition')) {
            this.handleConfirm();
        }
        else {
            this.data.set('visible', visible);
        }
    }
}
</script>
```
</codebox>
