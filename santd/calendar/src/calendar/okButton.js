/**
 * @file Santd calendar ok button file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';


export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        disabled: DataTypes.bool,
        locale: DataTypes.object
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const disabled = this.data.get('okDisabled');

            return classNames(`${prefixCls}-ok-btn`, {
                [`${prefixCls}-ok-btn-disabled`]: disabled
            });
        }
    },
    handleClick() {
        const disabled = this.data.get('okDisabled');
        if (!disabled) {
            this.fire('ok');
        }
    },
    template: `
        <a
            class="{{classes}}"
            role="button"
            on-click="handleClick"
        >
            {{locale.ok}}
        </a>
    `
});
