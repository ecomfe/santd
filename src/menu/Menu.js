/**
* @file menu 导航菜单组件
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import './style/index.less';
import {getOffset, on, off} from '../core/util/dom';
import SubMenu from './SubMenu';
import Icon from '../icon';
import {MENU_FOLDED_ITEM_ID} from '../core/constants';
import throttle from 'lodash/throttle';

const prefixCls = classCreator('menu')();
const DEFAULT_FOLDED_ITEM_WIDTH = 14;
const FOLDED_ITEM_PADDING = 40;

export default san.defineComponent({
    dataTypes: {
        mode: DataTypes.oneOf(['vertical', 'horizontal', 'inline']),
        theme: DataTypes.oneOf(['light', 'dark']),
        defaultSelectedKeys: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        defaultOpenKeys: DataTypes.array,
        inlineCollapsed: DataTypes.bool,
        openKeys: DataTypes.array,
        inlineIndent: DataTypes.number,
        multiple: DataTypes.bool,
        selectable: DataTypes.bool,
        selectedKeys: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        subMenuCloseDelay: DataTypes.number,
        subMenuOpenDelay: DataTypes.number,
        forceSubMenuRender: DataTypes.bool
    },
    components: {
        's-sub-menu': SubMenu,
        's-icon': Icon
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
            level: 1,
            hasFoldedItem: false,
            itemFoldedFlags: []
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
        this.data.set('selectedKeys', this.getSelectedKeys(this.data.get('defaultSelectedKeys')));
        this.data.set('openKeys', this.data.get('openKeys') || this.data.get('defaultOpenKeys') || []);
    },
    attached() {
        this.updateItems();

        if (this.data.get('mode') !== 'horizontal') {
            return;
        }
        this.getItemWidths();
        this.updateFoldedItems();
        // resize事件的触发频率较高，因此延迟66ms（意味着updateFoldedItems函数的执行频率变为15fps）
        this.updateFoldedItemsBind = throttle(this.updateFoldedItems, 66).bind(this);
        on(window, 'resize', this.updateFoldedItemsBind);
        this.nextTick(() => {
            const foldedItemWidth = getOffset(this.ref(`${prefixCls}-fold-item`)).width;
            // 用户是否传入了和默认折叠图标的宽度不一样的折叠图标
            if (foldedItemWidth !== DEFAULT_FOLDED_ITEM_WIDTH) {
                this.foldedItemWidth = foldedItemWidth;
                this.updateFoldedItems();
            }
        });
    },
    updated() {
        this.updateItems();
    },
    detached() {
        this.updateFoldedItemsBind && off(window, 'resize', this.updateFoldedItemsBind);
    },
    updateItems() {
        let paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'rootPrefixCls', 'multiple'];
        this.items.forEach(item => {
            paramsArr.forEach(param => {
                item.data.set(param, this.data.get(param), {force: true});
            });
        });
    },
    getItemWidths() {
        this.itemWidths = [];
        this.items.forEach(item => this.itemWidths.push(getOffset(item.el).width));
        this.foldedItemWidth = DEFAULT_FOLDED_ITEM_WIDTH;
    },
    updateFoldedItems() {
        let availableMenuWidth = getOffset(this.el).width;
        const itemFoldedFlags = this.data.get('itemFoldedFlags');
        // 是否是可用空间正在变大且目前只有一项折叠项
        const isSpecialCase = this.lastAvailableMenuWidth
            && (availableMenuWidth - this.lastAvailableMenuWidth) > 0
            && itemFoldedFlags[itemFoldedFlags.length - 1] && !itemFoldedFlags[itemFoldedFlags.length - 2];
        if (this.data.get('hasFoldedItem') && !isSpecialCase) {
            availableMenuWidth -= this.foldedItemWidth + FOLDED_ITEM_PADDING;
        }
        this.lastAvailableMenuWidth = availableMenuWidth;
        this.items.forEach((item, index, items) => {
            // 折叠项（最后一项）不参与菜单项是否需要被折叠的计算
            if (index === items.length - 1) {
                return;
            }

            availableMenuWidth -= this.itemWidths[index];
            const isFolded = availableMenuWidth < 0;
            item.data.set('isFolded', isFolded);
            this.data.set(`itemFoldedFlags[${index}]`, isFolded);
        });
        this.data.set('hasFoldedItem', availableMenuWidth < 0);
    },
    getSelectedKeys(defaultSelectedKeys) {
        let selectedKeys =  this.data.get('selectedKeys') || defaultSelectedKeys || [];
        if (typeof selectedKeys === 'string') {
            selectedKeys = [selectedKeys];
        }
        return selectedKeys;
    },
    handleSelect(selectInfo) {
        if (!this.data.get('selectable')) {
            return;
        }

        let selectedKeys = this.getSelectedKeys();
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

        const selectedKeys = this.getSelectedKeys();
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
        <ul class="{{classes}}" role="{{role || 'menu'}}">
            <slot></slot>
            <s-sub-menu
                s-show="hasFoldedItem"
                id="${MENU_FOLDED_ITEM_ID}"
                key="${MENU_FOLDED_ITEM_ID}"
                itemFoldedFlags="{{itemFoldedFlags}}">
                <div slot="title" s-ref="${prefixCls}-fold-item" class="${prefixCls}-fold-item">
                    <slot name="overflowedIndicator">
                        <s-icon type="ellipsis"></s-icon>
                    </slot>
                </div>
                <slot></slot>
            </s-sub-menu>
        </ul>
    `
});
