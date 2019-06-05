/**
* @file footer.js
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
const pagin = classCreator('layout-footer');
const prefixCls = pagin();

export default san.defineComponent({
    components: {

    },
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}`]: true
            });
        }
    },
    initData() {

    },
    inited() {

    },
    template: `
        <div class="{{classes}}">
            <slot></slot>
        </div>
    `
});