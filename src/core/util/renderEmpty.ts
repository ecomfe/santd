/**
 * @file Santd render empty file
 */
import san from 'san';
import Empty from '../../empty';

type ComponentName =
    | 'Table'
    | 'List'
    | 'Select'
    | 'TreeSelect'
    | 'Cascader'
    | 'Transfer'
    | 'Mentions';
export default function (componentName: ComponentName) {
    switch (componentName) {
        case 'Table':
        case 'List':
            return san.defineComponent({
                initData() {
                    const data = Empty.prototype.initData();
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
                    const data = Empty.prototype.initData();
                    data.image = Empty.PRESENTED_IMAGE_SIMPLE;
                    data.small = true;
                    return data;
                }
            }, Empty);

        default:
            return Empty;
    }
}
