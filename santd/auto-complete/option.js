/**
 * @file 组件 auto-complete
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';


export default san.defineComponent({
    template: `
    	<li
            class="{{class}}"
            style="user-select: none;"
            role="option"
            on-click="handleSelect($event, text)"
        >
            {{text}}
        </li>
    `,
    handleSelect(e, value) {
        this.dispatch('itemHandleClick', value);
    }
});