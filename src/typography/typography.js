/**
 * @file 组件 typography
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';

const prefix = classCreator('typography')();

export default san.defineComponent({
    template: `
    	<article class="${prefix}">
            <slot/>
        </article>
    `
});
