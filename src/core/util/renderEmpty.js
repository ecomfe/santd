/**
 * @file Santd render empty file
 **/

import san from 'san';
import Empty from '../../empty';


export default function (componentName) {
    switch (componentName) {
        case 'Table':
        case 'List':
            return san.defineComponent({
                initData() {
                    let data = Empty.prototype.initData();
                    data.image = Empty.PRESENTED_IMAGE_SIMPLE;
                    return data;
                }
            }, Empty);

        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
            return san.defineComponent({
                initData() {
                    let data = Empty.prototype.initData();
                    data.image = Empty.PRESENTED_IMAGE_SIMPLE;
                    data.small = true;
                    return data;
                }
            }, Empty);

        default:
            return Empty;
    }
}
