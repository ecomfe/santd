/**
 * @file Santd pagination pager file
 **/

import san from 'san';
import classNames from 'classnames';

export default san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('rootPrefixCls');
            const page = this.data.get('page');
            const active = this.data.get('active');
            const className = this.data.get('className');

            return classNames({
                [`${prefixCls}-item`]: true,
                [`${prefixCls}-item-${page}`]: true,
                [`${prefixCls}-item-active`]: active,
                [`${prefixCls}-disabled`]: !page
            }, className);
        }
    },
    handleClick() {
        this.fire('click', this.data.get('page'));
    },
    handleKeyPress(e) {
        this.fire('keyPress', e, this.data.get('page'));
    },
    template: `<li
        title="{{showTitle ? page : ''}}"
        class="{{classes}}"
        on-click="handleClick"
        on-keyPress="handleKeyPress"
        tabIndex="0"
    >
        <a>{{page}}</a>
    </li>`
});
