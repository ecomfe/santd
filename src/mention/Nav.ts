/**
 * @file 组件 Nav
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */
import {classCreator} from '../core/util';
import './style/index.less';
import Base from 'santd/base';

const prefixCls = classCreator('dropdown')();

export default class Nav extends Base {
    handleClick() {
        const value = this.data.get('value');
        const dispatchData = value ? value : (this.el as unknown as HTMLDivElement).innerText;
        this.dispatch('santd_mention_itemSelect', dispatchData);
    }

   static template = `<div class="${prefixCls}-menu-item" on-click="handleClick">
            <slot></slot>
        </div>`
};
