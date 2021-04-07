/**
 * @file Santd timepicker select file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import getRequestAnimationFrame from '../core/util/getRequestAnimationFrame';

const raf = getRequestAnimationFrame();

const scrollTo = (element, to, duration) => {
    // jump to target if duration zero
    if (duration <= 0) {
        raf(() => {
            element.scrollTop = to;
        });
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;

    raf(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    });
};

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        options: DataTypes.array,
        selectedIndex: DataTypes.number,
        type: DataTypes.string
    },
    initData() {
        return {
            active: false
        };
    },
    computed: {
        renderOptions() {
            const options = this.data.get('options');
            const prefixCls = this.data.get('prefixCls');
            const selectedIndex = this.data.get('selectedIndex');

            return options.map((option, index) => {
                let classArr = [];
                selectedIndex === index && classArr.push(`${prefixCls}-select-option-selected`);
                option.disabled && classArr.push(`${prefixCls}-select-option-disabled`);
                option.className = classArr.join(' ');
                return option;
            });
        }
    },
    attached() {
        this.watch('selectedIndex', val => {
            this.scrollToSelected(120);
        });
        window.setTimeout(() => {
            this.scrollToSelected(0);
        }, 0);
    },
    scrollToSelected(duration) {
        const selectedIndex = this.data.get('selectedIndex');
        const select = this.el;
        const list = this.ref('list');
        if (!list) {
            return;
        }
        let index = selectedIndex;
        if (index < 0) {
            index = 0;
        }
        const topOption = list.children[index];
        const to = topOption.offsetTop;
        scrollTo(select, to, duration);
    },
    handleMouseEnter(e) {
        this.data.set('active', true);
        this.fire('mouseenter', e);
    },
    handleMouseLeave(e) {
        this.data.set('active', false);
        this.fire('mouseleave', e);
    },
    handleClick(itemValue) {
        const type = this.data.get('type');
        this.fire('select', {type, itemValue});
    },
    template: `<div class="{{prefixCls}}-select {{active ? prefixCls + '-select-active' : ''}}"
        on-mouseenter="handleMouseEnter"
        on-mouseleave="handleMouseLeave">
        <ul s-ref="list">
            <li
                s-for="option, index in renderOptions"
                role="button"
                on-click="handleClick(option.value)"
                class="{{option.className}}"
                disabled="{{option.disabled}}"
            >
                {{option.value}}
            </li>
        </ul>
    </div>`
});
