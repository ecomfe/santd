/**
 * @file 组件 collapse
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import Collapse from './src/index';

const prefixCls = classCreator('collapse')();

const CollapsePanel = san.defineComponent({
    inited() {
        const showArrow = this.data.get('showArrow');
        const className = this.data.get('className');
        const collapsePanelClassName = classNames({
            [`${prefixCls}-no-arrow`]: !showArrow
        }, className);
        this.data.set('className', collapsePanelClassName);
    }
});

san.inherits(CollapsePanel, Collapse.Panel);
export default CollapsePanel;
