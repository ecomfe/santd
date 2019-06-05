/**
* @file button group
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
const prefixCls = 'san-btn-group';

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
            const data = this.data;
            const size = data.get('sizeMap')[data.get('size')];
            const res = {
                [`${prefixCls}`]: true,
                [`${prefixCls}-${size}`]: !!size
            };
            let arr = [];
            for (let item in res) {
                if (!!res[item]) {
                    arr.push(item);
                }
            }
            arr.push(this.data.get('className'));
            return arr;
        }
    },
    template: `
        <div class="{{classes}}" style="font-size:0;">
            <slot></slot>
        </div>
    `
});
