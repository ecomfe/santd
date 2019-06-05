/**
 * @file 组件 rate 里面的小星星
 * @author panming <panming@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';

const prefixCls = classCreator('rate-star')();

export default san.defineComponent({
    dataTypes: {
        value: DataTypes.number,
        index: DataTypes.number,
        allowHalf: DataTypes.bool,
        disabled: DataTypes.bool,
        character: DataTypes.any,
        focused: DataTypes.bool
    },
    computed: {
        classes() {
            const data = this.data;
            const index = data.get('index');
            const value = data.get('value');
            const allowHalf = data.get('allowHalf');
            const focused = data.get('focused');
            const starValue = index + 1;

            return classNames(prefixCls, {
                [`${prefixCls}-focused`]: focused,
                [`${prefixCls}-full`]: starValue <= value,
                [`${prefixCls}-half`]: allowHalf && value + 0.5 === starValue
            });
        }
    },
    initData() {
        return {
            value: 0,
            index: 0,
            allowHalf: true,
            disabled: false
        };
    },
    onHover(e) {
        e.starIndex = this.data.get('index');
        this.fire('hover', e);
    },
    onClick(e) {
        e.starIndex = this.data.get('index');
        this.fire('click', e);
        this.data.set('focused', !this.data.get('focused'));
    },
    template: `
    <li
        class="{{classes}}"
        on-click="onClick"
        on-mousemove="onHover"
    >
        <div class="${prefixCls}-first">
            <slot name="starCharacter" />
        </div>
        <div class="${prefixCls}-second">
            <slot name="starCharacter" />
        </div>
  </li>
    `
});
