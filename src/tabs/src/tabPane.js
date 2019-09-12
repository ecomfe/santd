/**
 * @file Santd tabs tabPane file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';

export default san.defineComponent({
    dataTypes: {
        className: DataTypes.string,
        active: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        destroyInactiveTabPane: DataTypes.bool,
        forceRender: DataTypes.bool,
        rootPrefixCls: DataTypes.string,
        id: DataTypes.string
    },
    computed: {
        classes() {
            const rootPrefixCls = this.data.get('rootPrefixCls');
            const prefixCls = rootPrefixCls + '-tabpane';
            const active = this.data.get('active');
            const className = this.data.get('className');
            let classArr = [prefixCls, className];
            !active && classArr.push(`${prefixCls}-inactive`);
            active && classArr.push(`${prefixCls}-active`);
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
            destroyInactiveTabPane,
            prefixCls
        } = parent.data.get();
        const key = this.data.get('key');

        this.data.set('active', activeKey === key);
        this.data.set('destroyInactiveTabPane', destroyInactiveTabPane);
        this.data.set('rootPrefixCls', prefixCls);
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
