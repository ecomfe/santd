/**
* @file menu 导航菜单组件
* @author fuqiangqiang@baidu.com
*/

import {classCreator} from '../core/util';
import './style/index.less';
import {getOffset, on, off, ListenerElement} from '../core/util/dom';
import SubMenu from './SubMenu';
import Icon from '../icon';
import {MENU_FOLDED_ITEM_ID} from '../core/constants';
import throttle from 'lodash/throttle';

import Base from 'santd/base';

import type {TSubMenu} from './SubMenu';
import type {TMenuItem} from './MenuItem';
import type {TMenuItemGroup} from './MenuItemGroup';
import type {TDivider} from './Divider';

import {
    MenuState as State,
    MenuProps as Props,
    MenuComputed as Computed,
    OpenChangeEvent,
    SelectChangeEvent,
    ItemType,
    InnerItem
} from './interface';


type Message = {
    santd_menu_addItem: (this: Menu, payload: {value: ItemType}) => void;
    santd_menu_itemSelect: (this: Menu, payload: {value:  SelectChangeEvent}) => void,
    santd_menu_itemDeselect: (this: Menu, payload: {value:  SelectChangeEvent}) => void,
    santd_menu_itemClick: (this: Menu, payload: {value: ItemType}) => void;
    santd_menu_openChange: (this: Menu, playload: {value: OpenChangeEvent<SubMenu>}) => void
};

type CommonWindow = Window & ListenerElement;

const prefixCls = classCreator('menu')();
const DEFAULT_FOLDED_ITEM_WIDTH = 14;
const FOLDED_ITEM_PADDING = 40;

export default class Menu extends Base<State, Props, Computed> {
    static components = {
        's-sub-menu': SubMenu,
        's-icon': Icon
    }

    static Sub: TSubMenu
    static Item: TMenuItem
    static MenuItemGroup: TMenuItemGroup
    static MenuDivider: TDivider

    items!: ItemType[]
    itemWidths!: number[]
    foldedItemWidth!: number
    lastAvailableMenuWidth!: number
    updateFoldedItemsBind!: () => void
    subMenus!: unknown[]

    initData(): State {
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
    }
    static computed: Computed = {
        rootPrefixCls(this: Menu) {
            let rootPrefixCls = this.data.get('prefixCls');
            return rootPrefixCls ? rootPrefixCls + '-menu' : prefixCls;
        },
        classes(this: Menu) {
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
    }
    inited() {
        this.items = [];
        this.subMenus = [];
        this.data.set('selectedKeys', this.getSelectedKeys(this.data.get('defaultSelectedKeys')));
        this.data.set('openKeys', this.data.get('openKeys') || this.data.get('defaultOpenKeys') || []);
    }
    attached() {
        this.updateItems();

        if (this.data.get('mode') !== 'horizontal') {
            return;
        }
        this.getItemWidths();
        this.updateFoldedItems();
        // resize事件的触发频率较高，因此延迟66ms（意味着updateFoldedItems函数的执行频率变为15fps）
        this.updateFoldedItemsBind = throttle(this.updateFoldedItems, 66).bind(this);
        on(window as unknown as CommonWindow, 'resize', this.updateFoldedItemsBind);
    }
    updated() {
        this.updateItems();
    }
    detached() {
        this.updateFoldedItemsBind && off(window as unknown as CommonWindow, 'resize', this.updateFoldedItemsBind);
    }
    updateItems() {
        const paramsArr = ['mode', 'level', 'selectedKeys', 'openKeys', 'rootPrefixCls', 'multiple'] as const;
        this.items.forEach(item => {
            paramsArr.forEach(param => {
                (item as InnerItem).data.set(param, this.data.get(param));
            });
        });
    }
    getItemWidths() {
        this.itemWidths = [];
        this.items.forEach(item => this.itemWidths.push(getOffset(item.el).width));
        this.foldedItemWidth = DEFAULT_FOLDED_ITEM_WIDTH;
    }
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
            (item as InnerItem).data.set('isFolded', isFolded);
            this.data.set(`itemFoldedFlags[${index}]`, isFolded);
        });
        const hasFoldedItem = availableMenuWidth < 0;
        this.data.set('hasFoldedItem', hasFoldedItem);
        // 用户是否自定义了折叠图标
        if (this.sourceSlots.named.overflowedIndicator
                && this.foldedItemWidth === DEFAULT_FOLDED_ITEM_WIDTH
                && hasFoldedItem) {
            this.nextTick(() => {
                const foldedItemWidth = getOffset(this.ref(`${prefixCls}-fold-item`) as unknown as Element).width;
                if (foldedItemWidth !== DEFAULT_FOLDED_ITEM_WIDTH) {
                    this.foldedItemWidth = foldedItemWidth;
                    this.updateFoldedItems();
                }
            });
        }
    }
    getSelectedKeys(defaultSelectedKeys?: Props['defaultSelectedKeys']) {
        let selectedKeys =  this.data.get('selectedKeys') || defaultSelectedKeys || [];
        if (typeof selectedKeys === 'string') {
            selectedKeys = [selectedKeys];
        }
        return selectedKeys;
    }
    handleSelect(selectInfo: SelectChangeEvent) {
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
    }
    handleDeselect(selectInfo: SelectChangeEvent) {
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
    }
    handleOpenChange(event: OpenChangeEvent<SubMenu>) {
        const openKeys = this.data.get('openKeys')?.concat();
        let changed = false;
        if (event.open) {
            if (!openKeys?.includes(event.key)) {
                openKeys?.push(event.key);
                changed = true;
            }
        }
        else {
            const index = openKeys?.indexOf(event.key);
            if (index !== undefined && index !== -1) {
                openKeys?.splice(index, 1);
                changed = true;
            }
        }

        if (changed) {
            const prevOpenKeys = this.data.get('openKeys')?.concat();
            this.data.set('openKeys', openKeys);
            this.updateItems();
            this.fire('openChange', {openKeys, prevOpenKeys});
        }
    }
    static messages: Message = {
        santd_menu_addItem(payload) {
            this.items.push(payload.value);
            this.updateItems();
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
    }
    static template = /* html */ `
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
};
