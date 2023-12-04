/**
 * @file Santd tabs tabPane file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tabs')();

export default class TabPane extends Base {
    static template =  /* html */ `
        <div
            role="tabpanel"
            aria-hidden="{{active ? false : true}}"
            class="${prefixCls}-tabpane ${prefixCls}-tabpane-{{active ? 'active' : 'inactive'}}"
        >
            <slot s-if="active || forceRender"></slot>
        </div>
    `;

    inited() {
        this.dispatch('santd_tabs_addTabPane', this);
    };

    detached() {
        this.dispatch('santd_tabs_removeTabPane', this.data.get('key'));
    };
};
