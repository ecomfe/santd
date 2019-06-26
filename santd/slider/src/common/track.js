/**
 * @file Santd slider track file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        included: DataTypes.bool,
        length: DataTypes.number,
        offset: DataTypes.number,
        vertical: DataTypes.bool
    },
    computed: {
        bodyStyle() {
            const style = this.data.get('style');
            const vertical = this.data.get('vertical');
            const offset = this.data.get('offset');
            const length = this.data.get('length');

            const positionStyle = vertical ? {
                bottom: `${offset}%`,
                height: `${length}%`
            } : {
                left: `${offset}%`,
                width: `${length}%`
            };

            return {
                ...style,
                ...positionStyle
            };
        }
    },
    template: `<div class="{{prefixCls}}" style="{{bodyStyle}}">
    </div>`
});
