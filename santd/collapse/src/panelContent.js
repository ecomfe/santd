/**
 * @file Santd collapse panelContent file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        isActive: DataTypes.bool,
        destroyInactivePanel: DataTypes.bool,
        forceRender: DataTypes.bool,
        role: DataTypes.string
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const isActive = this.data.get('isActive');

            return classNames({
                [`${prefixCls}-content`]: true,
                [`${prefixCls}-content-active`]: isActive,
                [`${prefixCls}-content-inactive`]: !isActive
            });
        }
    },
    template: `
        <div class="{{classes}}" role="{{role}}">
            <div
                s-if="forceRender || isActive || !destroyInactivePanel"
                class="{{prefixCls}}-content-box"
            >
                    <slot></slot>
            </div>
        </div>
    `
});
