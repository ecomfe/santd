/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';

const cc = classCreator('typography');
const prefix = cc();

export default san.defineComponent({
    template: `
    	<article class="${prefix}">
            <slot/>
        </article>
    `
});