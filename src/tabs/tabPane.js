/**
 * @file Santd tabs tabPane file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    dataTypes: {
        active: DataTypes.bool,
        forceRender: DataTypes.bool,
        key: DataTypes.string
    },
    inited() {
        this.dispatch('santd_tabs_addTabPane', this);
    },
    detached() {
        this.dispatch('santd_tabs_removeTabPane', this.data.get('key'));
    },
    template: `
        <div
            role="tabpanel"
            aria-hidden="{{active ? false : true}}"
            class="${prefixCls}-tabpane ${prefixCls}-tabpane-{{active ? 'active' : 'inactive'}}"
        >
            <slot s-if="active || forceRender"></slot>
        </div>
    `
});
