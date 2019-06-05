<cn>
#### 受控的Checkbox
联动Checkbox。
</cn>

```html
<template>
    <div>
        <p style="margin-bottom: 20px;">
            <s-checkbox on-change="handleChange" checked="{{checked}}" disabled="{{disabled}}">{{label}}</s-checkbox>
        </p>
        <p>
            <s-button type="primary" size="small" on-click="handleChecked">{{checked ? 'Check' : 'Uncheck'}}</s-button>
            <s-button type="primary" size="small" on-click="handleDisable">{{disabled ? 'Disable' : 'Enable'}}</s-button>
        </p>
    </div>
</template>

<script>
import Checkbox from 'santd/checkbox';
import Button from 'santd/button';

export default {
    components:{
       's-checkbox': Checkbox,
       's-button': Button
    },
    computed: {
        label() {
            const checked = this.data.get('checked');
            const disabled = this.data.get('disabled');

            return (checked ? 'Checked' : 'Unchecked') + '-' + (disabled ? 'Disabled' : 'Enable');
        }
    },
    initData() {
        return {
            checked: true,
            disabled: false
        }
    },
    handleChecked() {
        this.data.set('checked', !this.data.get('checked'));
    },
    handleDisable() {
        this.data.set('disabled', !this.data.get('disabled'));
    },
    handleChange(e) {
        console.log('checked = ', e.target.checked);
        this.data.set('checked', e.target.checked);
    }
}
</script>
```
