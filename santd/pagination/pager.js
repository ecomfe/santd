/**
 * @file Santd pagination pager file
 **/

import san from 'san';

export default san.defineComponent({
    computed: {
        classes() {
            const prefixCls = this.data.get('rootPrefixCls');
            const page = this.data.get('page');
            const active = this.data.get('active');
            const className = this.data.get('className');
            let classArr = [`${prefixCls}-item`, `${prefixCls}-item-${page}`];

            className && classArr.push(className);
            active && classArr.push(`${prefixCls}-item-active`);
            !page && classArr.push(`${prefixCls}-disabled`);
            return classArr;
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
