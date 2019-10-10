/**
 * @file Santd render empty file
 **/

import san from 'san';
import Empty from '../../empty';
import {classCreator} from './index';

const prefixCls = classCreator('empty');

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
                    data.className = prefixCls + '-small';
                    return data;
                }
            }, Empty);

        default:
            return Empty;
    }
}