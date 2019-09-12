/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import base from './base';

const prefixCls = classCreator('typography')();

export default san.defineComponent({
    template: `
        <div>
            <h2 s-if="level === 2" class="${prefixCls}">
                <s-base s-bind="props"><slot /></s-base>
            </h2>
            <h3 s-elif="level === 3" class="${prefixCls}">
                <s-base s-bind="props"><slot /></s-base>
            </h3>
            <h4 s-elif="level === 4" class="${prefixCls}">
                <s-base s-bind="props"><slot /></s-base>
            </h4>
            <h1 s-else class="${prefixCls}">
                <s-base s-bind="props"><slot /></s-base>
            </h1>
        </div>
    `,
    components: {
        's-base': base.create('title')
    },
    inited() {
        this.data.set('props', this.data.get());
    }
});
