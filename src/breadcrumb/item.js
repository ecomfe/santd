/**
* @file 面包屑组件的每一项
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('breadcrumb')();

export default san.defineComponent({
    dataTypes: {
        href: DataTypes.string
    },

    initData() {
        return {
            separator: '/'
        };
    },

    inited() {
        this.dispatch('santd_breadcrumb_add', this);
    },

    template: `
        <span>
            <a s-if="href" href="{{href}}" class="${prefixCls}-link"><slot/></a>
            <span s-else class="${prefixCls}-link"><slot/></span>
            <span class="${prefixCls}-separator">{{separator}}</span>
        </span>
    `
});