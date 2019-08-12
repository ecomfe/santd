/**
* @file menu 导航菜单组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
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
    computed: {
        classes() {
            const prefix = this.data.get('prefixCls');
            const mode = this.data.get('mode');
            const theme = this.data.get('theme');
            const inlineCollapsed = this.data.get('inlineCollapsed');
            const newPrefixCls = prefix ? `${prefix}-menu` : `${prefixCls}`;
            return classNames({
                [`${newPrefixCls}`]: true,
                [`${newPrefixCls}-${mode}`]: !!mode,
                [`${newPrefixCls}-${theme}`]: !!theme,
                [`${newPrefixCls}-root`]: true,
                [`${newPrefixCls}-inline-collapsed`]: inlineCollapsed
            });
        },
        chooseSelectedKeys() {
            const defaultSelectedKeys = this.data.get('defaultSelectedKeys');
            const selectedKeys = this.data.get('selectedKeys');
            return selectedKeys ? selectedKeys : (defaultSelectedKeys || []);
        },
        chooseOpenKeys() {
            const defaultOpenKeys = this.data.get('defaultOpenKeys');
            const openKeys = this.data.get('openKeys');
            return openKeys.length ? openKeys : (defaultOpenKeys || []);
        }
    },
    initData() {
        return {
            componentPropName: 's-menu',
            mode: 'vertical',
            theme: 'light',
            inlineIndent: 24,
            multiple: false,
            selectable: true,
            subMenuCloseDelay: 0.1,
            subMenuOpenDelay: 0,
            defaultOpenKeys: [],
            openKeys: []
        };
    },
    inited() {
        this.menuItems = [];
        this.menuItemGroups = [];
        this.subMenu = [];
    },
    created() {
        // watch openKeys change
        this.watch('openKeys', keys => {
            this.newOpenKeys = keys;
            this.subMenu.forEach(sub => {
                sub.data.set('openKeys', keys);
            });
        });
        this.watch('inlineCollapsed', collapsed => {
            this.subMenu.forEach(sub => {
                sub.data.set('inlineCollapsed', collapsed);
            });
        });
        this.watch('selectedKeys', keys => {
            setTimeout(() => {
                this.menuItems.forEach(item => {
                    item.data.set('selectedKeys', keys);
                });
            }, 0);
        });
    },
    attached() {
        const {inlineIndent, mode, selectable, prefixCls} = this.data.get();
        this.newChooseKeys = [...this.data.get('chooseSelectedKeys')];
        this.newOpenKeys = [...this.data.get('chooseOpenKeys')];

        this.menuItems.forEach(item => {
            item.data.set('mode', mode);
            item.data.set('prefixCls', prefixCls);
            item.data.set('selectable', selectable);
            item.data.set('inlineIndent', inlineIndent);
            item.data.set('selectedKeys', this.data.get('chooseSelectedKeys'));
        });
        this.menuItemGroups.forEach(group => {
            group.data.set('mode', mode);
            group.data.set('inlineIndent', inlineIndent);
        });
    },
    messages: {
        itemRender(compo) {
            this.menuItems.push(compo.value);
        },
        itemGroupRender(compo) {
            this.menuItemGroups.push(compo.value);
        },
        subMenuRender(compo) {
            this.subMenu.push(compo.value);
        },
        // menu-item click
        itemClick(data) {
            const clickData = data.value;
            const multiple = this.data.get('multiple');
            const mode = this.data.get('mode');
            const chooseKeys = this.newChooseKeys;
            if (!multiple) {
                this.menuItems.forEach(item => item.data.set('selectedKeys', [clickData.key]));
            } else {
                if (chooseKeys.indexOf(clickData.key) > -1) {
                    chooseKeys.splice(chooseKeys.indexOf(clickData.key), 1);
                    this.fire('deselect', clickData);
                } else {
                    chooseKeys.push(clickData.key);
                }
                this.menuItems.forEach(item => item.data.set('selectedKeys', [...chooseKeys]));
            }
            if (mode !== 'inline' && !clickData.fromSub) {
                // 说明点击的是subMenu下的，把subMenu的选中状态去掉
                this.subMenu.forEach(item => item.data.set('selected', false));
            }
            this.fire('click', clickData);
            this.dispatch('menuClick');
        },
        subMenuClick(data) {
            const key = data.value;
            const openKeys = this.newOpenKeys;
            if (openKeys.indexOf(key) > -1) {
                openKeys.splice(openKeys.indexOf(key), 1);
            } else {
                openKeys.push(key);
            }
            this.subMenu.forEach(sub => sub.data.set('openKeys', [...openKeys]));
            this.fire('titleClick', key);
            this.fire('openChange', openKeys);
        },
        subMenuSelected(keys) {
            const targetSubMenu = keys.value;
            this.subMenu.forEach(sub => {
                sub.data.set('selected', false);
                if (sub === targetSubMenu) {
                    sub.data.set('selected', true);
                }
            });
        }
    },
    popupScroll(e) {
        this.fire('scroll', e);
    },
    template: `
        <ul class="{{classes}}" on-scroll="popupScroll($event)"><slot></slot></ul>
    `
});
