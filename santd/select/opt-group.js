/**
* @file opt-group
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import {findComponentUpward} from 'santd/core/util/findCompont';
import Icon from 'santd/icon';
const pagin = classCreator('select');
const prefixCls = pagin();

export default san.defineComponent({
    components: {
        's-icon': Icon
    },
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}-dropdown-menu-item-group`]: true
            });
        }
    },
    initData() {
        return {
            isShow: true
        };
    },
    inited() {

    },
    attached() {
        // 拿到select中的defaultValue，进行对比，如果命中的，就加选中样式
        const defaultSelected = findComponentUpward(this, 's-select');
        const defaultValue = defaultSelected && defaultSelected.data.get('defaultValue');
        const mode = defaultSelected && defaultSelected.data.get('mode');
        if (mode) {
            this.data.set('mode', mode);
        }
        if (Array.isArray(defaultValue)) {
            defaultValue.forEach(item => {
                if (item.trim() === this.el.innerText.trim()) {
                    this.data.set('selected', true);
                }
            });
        }
    },
    itemClick() {
        const disabled = this.data.get('disabled');
        if (!disabled) {
            this.dispatch('itemHandleClick', this.el.innerText);
        }
    },
    template: `
        <li
            class="{{classes}}"
            style="user-select: none;"
            key="{{key}}"
        >
            <div class="${prefixCls}-dropdown-menu-item-group-title" title="{{label}}">{{label}}</div>
            <ul class="${prefixCls}-dropdown-menu-group-list">
                <slot></slot>
            </ul>
        </li>
    `
});
