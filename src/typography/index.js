/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import Base from './base';
import Title from './title';
import {classCreator} from '../core/util';

const prefixCls = classCreator('typography')();

let Typography = san.defineComponent({
    template: `
        <article class="${prefixCls}"><slot /></article>
    `
});

Typography.Text = Base.create('text');
Typography.Title = Title;
Typography.Paragraph = Base.create('paragraph');

export default Typography;