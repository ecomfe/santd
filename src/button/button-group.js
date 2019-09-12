/**
 * @file button group
 * @author fuqiangqiang@baidu.com
 */
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util/index';
const PREFIX_CLASS = classCreator('btn-group')();

export default san.defineComponent({
    dataTypes: {
        size: DataTypes.string
    },

    initData() {
        return {
            sizeMap: {
                large: 'lg',
                small: 'sm'
            }
        };
    },

    computed: {
        classes() {
            let arr = [PREFIX_CLASS];

            let size = this.data.get('sizeMap')[this.data.get('size')];
            size && arr.push(`${PREFIX_CLASS}-${size}`);

            return arr;
        }
    },

    template: `
        <div class="{{classes}}" style="font-size:0;"><slot/></div>
    `
});
