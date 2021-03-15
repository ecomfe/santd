/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import san from 'san';
import Upload from './upload';

export default san.defineComponent({
    initData() {
        let data = Upload.prototype.initData();
        data.type = 'drag';

        return data;
    }
}, Upload);
