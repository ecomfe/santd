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
            let classArr = [`${prefixCls}-item`, `${prefixCls}-item-${page}`];

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
        <slot name="itemRender" s-if="{{itemRender}}" var-type="{{'page'}}" var-page="{{page}}" />
        <a s-else>{{page}}</a>
    </li>`
});
