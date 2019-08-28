/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import Upload from './upload';
import inherits from '../core/util/inherits';

export default inherits(san.defineComponent({
    initData() {
        return {
            type: 'drag'
        };
    }
}), Upload);
