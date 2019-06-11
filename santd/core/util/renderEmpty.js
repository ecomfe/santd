/**
 * @file Santd render empty file
 **/

import san from 'san';
import Empty from '../../empty';
import {classCreator} from './index';
import inherits from './inherits';

const prefixCls = classCreator('empty');

export default function (componentName) {
    switch (componentName) {
        case 'Table':
        case 'List':
            return inherits(san.defineComponent({
                initData() {
                    return {
                        image: Empty.PRESENTED_IMAGE_SIMPLE
                    };
                }
            }), Empty);
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
            return inherits(san.defineComponent({
                initData() {
                    return {
                        image: Empty.PRESENTED_IMAGE_SIMPLE,
                        className: prefixCls + '-small'
                    };
                }
            }), Empty);
        default:
            return Empty;
    }
}
