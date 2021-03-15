/**
 * @file Santd transfer render list body file
 * @author mayihui@baidu.com
 **/
import san from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';

const prefixCls = classCreator('transfer')('list');
const inputPrefixCls = classCreator('input')();

export default san.defineComponent({
    handleChange(e) {
        this.fire('change', e.target.value);
    },
    handleClear(e) {
        e.preventDefault();
        const disabled = this.data.get('disabled');
        if (!disabled) {
            this.fire('clear', e);
        }
    },
    components: {
        's-icon': Icon
    },
    template: `
        <div>
            <input
                placeholder="{{placeholder}}"
                class="${inputPrefixCls} ${prefixCls}-search"
                type="text"
                on-keyup="handleChange"
                value="{{value}}"
            />
            <a
                href="#"
                class="${prefixCls}-search-action"
                on-click="handleClear"
                s-if="value && value.length > 0"
            >
                <s-icon type="close-circle" theme="filled" />
            </a>
            <span class="${prefixCls}-search-action" s-else>
                <s-icon type="search" />
            </span>
        </div>
    `
});
