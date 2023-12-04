/**
 * @file Santd pagination pager file
 **/
import Base from 'santd/base';
import {
    PagerProps as Props,
    PagerComputed as Computed
} from './interface';

export default class Pager extends Base <{}, Props, Computed> {
    static computed: Computed = {
        classes(this: Pager) {
            const prefixCls = this.data.get('rootPrefixCls');
            const page = this.data.get('page');
            const active = this.data.get('active');
            let classArr = [`${prefixCls}-item`, `${prefixCls}-item-${page}`];

            active && classArr.push(`${prefixCls}-item-active`);
            !page && classArr.push(`${prefixCls}-disabled`);
            return classArr;
        }
    }
    handleClick() {
        this.fire('click', this.data.get('page'));
    }
    handleKeyPress(e: KeyboardEvent) {
        // 疑问：this.fire只接受一个参数，this.data.get('page')传参无效，怀疑错误仿造了ant的写法
        // @ts-ignore
        this.fire('keyPress', e, this.data.get('page'));
    }
    static template = `<li
        title="{{showTitle ? page : ''}}"
        class="{{classes}}"
        on-click="handleClick"
        on-keyPress="handleKeyPress"
        tabIndex="0"
    >
        <slot name="itemRender" s-if="{{itemRender}}" var-type="{{'page'}}" var-page="{{page}}" />
        <a s-else>{{page}}</a>
    </li>`
};
