/**
 * @file santd Table 表格组件
 * @author mayihui@baidu.com
 **/

import san from 'san';
import Radio from 'santd/radio';
import Checkbox from 'santd/checkbox';

export default san.defineComponent({
    computed: {
        checked() {
            const defaultSelection = this.data.get('defaultSelection');
            const selectionDirty = this.data.get('selectionDirty');
            const selectedRowKeys = this.data.get('selectedRowKeys');
            const refresh = this.data.get('refresh');
            const rowIndex = this.data.get('rowIndex');
            let checked = false;
            if (selectionDirty && refresh) {
                checked = selectedRowKeys.indexOf(rowIndex) >= 0;
            }
            else {
                checked = selectedRowKeys.indexOf(rowIndex) >= 0
                    || defaultSelection.indexOf(rowIndex) >= 0;
            }
            return checked;
        }
    },
    components: {
        's-radio': Radio,
        's-checkbox': Checkbox
    },
    handleChange(e) {
        this.fire('change', e);
    },
    template: `
        <span>
            <s-radio
                s-if="type === 'radio'"
                checked="{{checked}}"
                on-change="handleChange($event)"
                disabled="{{disabled}}"
            ></s-radio>
            <s-checkbox
                s-else
                checked="{{checked}}"
                on-change="handleChange($event)"
                disabled="{{disabled}}"
            ></s-checkbox>
        </span>
    `
});
