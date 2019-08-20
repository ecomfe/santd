/**
 * @file 组件 collapse
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import {classCreator} from '../core/util';
import Collapse from './src/index';

const prefixCls = classCreator('collapse')();

const CollapsePanel = san.defineComponent({
    inited() {
        const showArrow = this.data.get('showArrow');
        const className = this.data.get('className');
        let classArr = [];

        className && classArr.push(className);
        !showArrow && classArr.push(`${prefixCls}-no-arrow`);
        this.data.set('className', classArr.join(' '));
    }
});

san.inherits(CollapsePanel, Collapse.Panel);
export default CollapsePanel;
