/**
 * @file 组件 upload
 * @author chenkai13 <chenkai13@baidu.com>
 */

import Upload from './Upload';

export default class Danger extends Upload {
    initData() {
        let data = Upload.prototype.initData();
        data.type = 'drag';

        return data;
    }
};
