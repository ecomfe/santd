/**
 * @file Santd tabs tabPane file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from '../../core/util';
const prefixCls = classCreator('tabs')();

export default san.defineComponent({
    dataTypes: {
        active: DataTypes.bool,
        destroyInactiveTabPane: DataTypes.bool,
        forceRender: DataTypes.bool,
        id: DataTypes.string
    },
    computed: {
        classes() {
            const active = this.data.get('active');
            let classArr = [`${prefixCls}-tabpane`];
            !active && classArr.push(`${prefixCls}-tabpane-inactive`);
            active && classArr.push(`${prefixCls}-tabpane-active`);
            return classArr;
        },
        shouldRender() {
            const destroyInactiveTabPane = this.data.get('destroyInactiveTabPane');
            const active = this.data.get('active');
            const isActived = this.data.get('isActived');
            const forceRender = this.data.get('forceRender');

            const isRender = destroyInactiveTabPane ? active : isActived || active;
            return isRender || forceRender;
        }
    },
    created() {
        this.dispatch('addTabPane', this);
    },
    updated() {
        const parent = this.parentComponent;
        const {
            activeKey,
            destroyInactiveTabPane
        } = parent.data.get();
        const key = this.data.get('key');

        this.data.set('active', activeKey === key);
        this.data.set('destroyInactiveTabPane', destroyInactiveTabPane);
    },
    detached() {
        this.dispatch('removeTabPane', this.data.get('key'));
    },
    template: `
        <div
            role="tabpanel"
            aria-hidden="{{active ? false : true}}"
            class="{{classes}}"
            id="{{id}}"
        >
            <slot s-if="shouldRender"></slot>
        </div>
    `
});
