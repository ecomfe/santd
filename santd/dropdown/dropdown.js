/**
* @file Santd dropdown file
* @author mayihui@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import inherits from 'santd/core/util/inherits';
import DropDown from './src/dropdown';
import './style/index';

const prefixCls = classCreator('dropdown')();

export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls
        };
    },
    computed: {
        action() {
            const trigger = this.data.get('trigger');
            const triggerAction = (trigger && [trigger]) || ['hover'];
            const disabled = this.data.get('disabled');

            return disabled ? [] : triggerAction;
        },
        popupPlacement() {
            return this.data.get('placement') || 'bottomLeft';
        },
        classes() {
            const className = this.data.get('className');
            return classNames(className, `${prefixCls}-trigger`);
        },
        getTransitionName() {
            const placement = this.data.get('popupPlacement');
            const transitionName = this.data.get('transitionName');
            if (transitionName) {
                return transitionName;
            }
            if (placement.indexOf('top') >= 0) {
                return 'slide-down';
            }
            return 'slide-up';
        }
    }
}), DropDown);
