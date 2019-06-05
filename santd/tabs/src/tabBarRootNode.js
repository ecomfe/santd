/**
 * @file Santd tabs tab bar root node file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        tabBarPosition: DataTypes.oneOf(['left', 'right', 'top', 'bottom'])
    },
    initData() {
        return {
            prefixCls: '',
            className: '',
            style: {},
            tabBarPosition: 'top'
        };
    },
    compiled() {
        const parent = this.parentComponent;
        const extra = parent.data.get('tabBarExtraContent');
        if (extra) {
            this.components.extra = extra;
        }
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');

            return classNames(`${prefixCls}-bar`, className);
        },
        hasExtra() {
            return this.data.get('tabBarExtraContent');
        },
        extraStyle() {
            const tabBarPosition = this.data.get('tabBarPosition');
            const topOrBottom = tabBarPosition === 'top' || tabBarPosition === 'bottom';

            return topOrBottom ? {float: 'right'} : {};
        }
    },
    handleKeyDown(e) {
        this.fire('keydown', e);
    },
    attached() {
        this.dispatch('addRef', {
            name: 'root',
            ref: this.el
        });
    },
    template: `
        <div
            role="tablist"
            class="{{classes}}"
            tabIndex="0"
            on-keydown="handleKeyDown"
        >
            <extra s-if="hasExtra" style="{{extraStyle}}"></extra>
            <slot></slot>
        </div>
    `
});
