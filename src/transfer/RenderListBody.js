/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import Checkbox from '../checkbox';
import {classCreator} from '../core/util';

const prefixCls = classCreator('transfer')('list');

export default san.defineComponent({
    handleItemSelect(item) {
        if (this.data.get('disabled') || item.disabled) {
            return;
        }
        const selectedKeys = this.data.get('selectedKeys');
        const checked = selectedKeys.indexOf(item.key) >= 0;
        this.fire('itemSelect', {selectedKey: item.key, checked: !checked});
    },
    handleScroll(e) {
        this.fire('scroll', e);
    },
    components: {
        's-checkbox': Checkbox
    },
    template: `
            <ul class="${prefixCls}-content" on-scroll="handleScroll">
                <li
                    s-for="item in filteredItems"
                    class="${prefixCls}-content-item {{disabled || item.disabled ? '${prefixCls}-content-item-disabled' : ''}}"
                    title="{{item.title}}"
                    on-click="handleItemSelect(item)"
                >
                    <s-checkbox checked="{{item.checked}}" disabled="{{disabled || item.disabled}}" />
                    <slot var-item="{{item}}" s-if="hasRender" />
                    <span class="${prefixCls}-content-item-text" s-else>{{item.title}}</span>
                </li>
            </ul>
        `
});
