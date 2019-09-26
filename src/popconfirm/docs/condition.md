<text lang="cn">
#### 条件触发
可以判断是否需要弹出。
</text>

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
        Whether directly execute: <s-switch defaultChecked on-change="handleChangeCondition"></s-switch>
    </div>
</template>
<script>
import popconfirm from 'santd/popconfirm';
import button from 'santd/button';
import icon from 'santd/icon';
import message from 'santd/message';
import sanSwitch from 'santd/switch';

export default {
    initData() {
        return {
            visible: false,
            condition: true
        };
    },
    components: {
        's-popconfirm': popconfirm,
        's-button': button,
        's-icon': icon,
        's-switch': sanSwitch
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
