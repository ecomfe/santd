/**
 * @file Santd tabs tabContent file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import classNames from 'classnames';
import toStyle from 'to-style';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle
} from './utils';

export default san.defineComponent({
    dataTypes: {
        animated: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        animatedWithMargin: DataTypes.bool,
        prefixCls: DataTypes.string,
        activeKey: DataTypes.string,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        tabBarPosition: DataTypes.string,
        className: DataTypes.string
    },
    initData() {
        return {
            animated: true,
            children: []
        };
    },
    created() {
        const style = this.data.get('style');
        this.data.set('bodyStyle', style);
        this.data.set('style', {});
    },
    computed: {
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const animated = this.data.get('animated');
            const className = this.data.get('className');

            return classNames({
                [`${prefixCls}-content`]: true,
                [animated
                    ? `${prefixCls}-content-animated`
                    : `${prefixCls}-content-no-animated`]: true
            }, className);
        }
    },
    updated() {
        const children = this.data.get('children');
        const activeKey = this.data.get('activeKey');
        const animated = this.data.get('animated');
        const tabBarPosition = this.data.get('tabBarPosition');
        const animatedWithMargin = this.data.get('animatedWithMargin');
        const bodyStyle = this.data.get('bodyStyle');
        let style = {};

        if (animated) {
            const activeIndex = getActiveIndex(children, activeKey);
            const animatedStyle = animatedWithMargin
                ? getMarginStyle(activeIndex, tabBarPosition)
                : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition));

            style = {
                ...bodyStyle,
                ...animatedStyle
            };
        }
        else {
            style = {
                ...bodyStyle,
                display: 'none'
            };
        }

        this.data.set('style', toStyle.string(style));
        this.dispatch('addTabPane', this.data.get('children'));
        children.forEach(child => {
            child.data.set('activeKey', activeKey);
        });
    },
    messages: {
        addTabPane(payload) {
            const child = payload.value;
            this.data.push('children', child);
        },
        removeTabPane(payload) {
            const children = this.data.get('children');
            children.forEach((child, index) => {
                if (child.data.get('key') === payload.value) {
                    this.data.removeAt('children', index);
                }
            });
        }
    },
    template: `
        <div
            class="{{classes}}"
            style="{{style}}"
        >
            <slot></slot>
        </div>
    `
});
