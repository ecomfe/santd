/**
* @file select-option-group
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
const pagin = classCreator('select');
const prefixCls = pagin();
export default san.defineComponent({
    initData() {
        return {
            componentPropName: 's-select-option-group'
        };
    },
    updated() {
        this.dispatch('watchOptionGroup');

    },
    attached() {
        this.dispatch('watchOptionGroup');
    },
    detached() {
        this.dispatch('watchOptionGroup');
    },
    template: `
        <span style="display:none;"><slot/></span>
    `
});
