/**
* @file menu 导航菜单组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';
const prefixCls = classCreator('menu')();

export default san.defineComponent({
    dataTypes: {
        mode: DataTypes.oneOf(['vertical', 'horizontal', 'inline']),
        theme: DataTypes.oneOf(['light', 'dark']),
        defaultSelectedKeys: DataTypes.array,
        defaultOpenKeys: DataTypes.array,
        inlineCollapsed: DataTypes.bool,
        openKeys: DataTypes.array,
        inlineIndent: DataTypes.number,
        multiple: DataTypes.bool,
        selectable: DataTypes.bool,
        selectedKeys: DataTypes.array,
        subMenuCloseDelay: DataTypes.number,
        subMenuOpenDelay: DataTypes.number,
        forceSubMenuRender: DataTypes.bool
    },
    initData() {
        return {
            mode: 'vertical',
            theme: 'light',
            inlineIndent: 24,
            multiple: false,
            selectable: true,
            subMenuCloseDelay: 0.1,
            subMenuOpenDelay: 0,
            defaultOpenKeys: [],
            level: 1
        };
    },
    computed: {
        rootPrefixCls() {
            let rootPrefixCls = this.data.get('prefixCls');
            return rootPrefixCls ? rootPrefixCls + '-menu' : prefixCls;
        },
        classes() {
            const mode = this.data.get('mode');
            const theme = this.data.get('theme');
            const inlineCollapsed = this.data.get('inlineCollapsed');
            const menuPrefixCls = this.data.get('rootPrefixCls');

            let classArr = [menuPrefixCls, `${menuPrefixCls}-root`];
            !!mode && classArr.push(`${menuPrefixCls}-${mode}`);
            !!theme && classArr.push(`${menuPrefixCls}-${theme}`);
            inlineCollapsed && classArr.push(`${menuPrefixCls}-inline-collapsed`);

            return classArr;
        }
    },
    inited() {
        this.items = [];
        this.subMenus = [];

        this.data.set('selectedKeys', this.data.get('selectedKeys') || this.data.get('defaultSelectedKeys') || []);
        this.data.set('openKeys', this.data.get('openKeys') || this.data.get('defaultOpenKeys') || []);
    },
    attached() {
        this.updateItems();
    },
    updated() {
        this.updateItems();
    },
    updateItems() {
        let paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'rootPrefixCls', 'multiple'];
        this.items.forEach(item => {
            paramsArr.forEach(param => {
                item.data.set(param, this.data.get(param), {force: true});
            });
        });
    },
    handleSelect(selectInfo) {
        if (!this.data.get('selectable')) {
            return;
        }

        let selectedKeys = this.data.get('selectedKeys');
        const selectedKey = selectInfo.key;
        const multiple = this.data.get('multiple');

        selectedKeys = multiple ? [...selectedKeys, selectedKey] : [selectedKey];

        this.data.set('selectedKeys', selectedKeys);
        this.updateItems();
        this.fire('select', {...selectInfo, selectedKeys});
    },
    handleDeselect(selectInfo) {
        if (!this.data.get('selectable')) {
            return;
        }

        const selectedKeys = this.data.get('selectedKeys');
        const selectedKey = selectInfo.key;
        const index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
            selectedKeys.splice(index, 1);
        }

        this.data.set('selectedKeys', selectedKeys);
        this.updateItems();
        this.fire('deselect', {...selectInfo, selectedKeys});
    },
    handleOpenChange(event) {
        const openKeys = this.data.get('openKeys').concat();
        let changed = false;
        if (event.open) {
            if (!openKeys.includes(event.key)) {
                openKeys.push(event.key);
                changed = true;
            }
        }
        else {
            const index = openKeys.indexOf(event.key);
            if (index !== -1) {
                openKeys.splice(index, 1);
                changed = true;
            }
        }

        if (changed) {
            const prevOpenKeys = this.data.get('openKeys').concat();
            this.data.set('openKeys', openKeys);
            this.updateItems();
            this.fire('openChange', {openKeys, prevOpenKeys});
        }
    },
    messages: {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
        },
        santd_menu_itemSelect(payload) {
            this.handleSelect(payload.value);
        },
        santd_menu_itemDeselect(payload) {
            this.handleDeselect(payload.value);
        },
        santd_menu_itemClick(payload) {
            this.fire('click', payload.value);
        },
        santd_menu_openChange(payload) {
            this.handleOpenChange(payload.value);
        }
    },
    template: `
        <ul class="{{classes}}" role="{{role || 'menu'}}"><slot/></ul>
    `
});
