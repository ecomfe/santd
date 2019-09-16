/**
 * @file Santd tabs tabContent file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {
  getTransformByIndex,
  getActiveIndex,
  getTransformPropValue,
  getMarginStyle
} from './utils';
import {classCreator} from '../../core/util';

const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    dataTypes: {
        animated: DataTypes.oneOfType([DataTypes.bool, DataTypes.object]),
        animatedWithMargin: DataTypes.bool,
        activeKey: DataTypes.string,
        tabBarPosition: DataTypes.string
    },
    initData() {
        return {
            animated: true,
            animatedWithMargin: true,
            children: []
        };
    },
    computed: {
        classes() {
            const animated = this.data.get('animated');
            const tabPosition = this.data.get('tabBarPosition');
            const type = this.data.get('type') || '';

            let classArr = [`${prefixCls}-content`, `${prefixCls}-${tabPosition}-content`];
            type.indexOf('card') >= 0 && classArr.push(prefixCls + '-card-content');
            animated
                ? classArr.push(`${prefixCls}-content-animated`)
                : classArr.push(`${prefixCls}-content-no-animated`);
            return classArr;
        }
    },
    updated() {
        const children = this.data.get('children');
        const activeKey = this.data.get('activeKey');
        const animated = this.data.get('animated');
        const tabBarPosition = this.data.get('tabBarPosition');
        const animatedWithMargin = this.data.get('animatedWithMargin');
        let style = {};

        if (animated) {
            const activeIndex = getActiveIndex(children, activeKey);
            const animatedStyle = animatedWithMargin
                ? getMarginStyle(activeIndex, tabBarPosition)
                : getTransformPropValue(getTransformByIndex(activeIndex, tabBarPosition));

            style = {
                ...this.data.get('style'),
                ...animatedStyle
            };
        }
        else {
            style = {
                ...this.data.get('style'),
                display: 'none'
            };
        }

        this.data.set('style', style);
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
        <div class="{{classes}}">
            <slot />
        </div>
    `
});
