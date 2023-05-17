import san from 'san/types';
import openAnimation from '../core/util/openAnimation';
import Base from 'santd/base';

type Mode = 'vertical' | 'horizontal'| 'inline';
type BuiltinPlacements = Record<string, any>;
type TriggerSubMenuAction = 'click' | 'hover';

interface ItemSharedProps {
    mode?: Mode;
    level?: number;
    inlineIndent?: number;
    title?: string | san.SlotNode;
    selectedKeys?: string | string[];
    openKeys?: string[];
    rootPrefixCls?: string;
    multiple?: boolean;
}

export interface MenuItemProps extends ItemSharedProps {
    disabled?: boolean;
    key?: string;
    title?: string;
    isFolded?: boolean;
}

export interface MenuItemState {
}

export interface MenuItemComputed {
    classes: () => string[];
    isSelected: () =>  boolean;
    active: () => boolean;
}

export interface SelectChangeEvent {
    key: string;
    keyPath: string[];
    item: Base<MenuItemState, MenuItemProps, MenuComputed>;
    e: MouseEvent;
}

export interface MenuItemGroupProps extends ItemSharedProps {
}

export interface MenuItemGroupState {
    inlineIndent: number;
}

export interface MenuItemGroupComputed {
    groupPrefixCls: () => string;
}

export interface SubMenuProps extends ItemSharedProps {
    subMenuKey?: number;
    itemFoldedFlags?: boolean[];
}

export interface SubMenuState {
    openKeys: string[];
    activeKey: string[];
    openAnimation: typeof openAnimation;
    inlineIndent: number;
    builtinPlacements: BuiltinPlacements;
    trigger: TriggerSubMenuAction;
    triggerSubMenuAction?: TriggerSubMenuAction;
    transitionName: string;
    noSubClick: boolean;
    inFoldedItem?: boolean;
}

export interface SubMenuComputed {
    menuPrefixCls: () => string;
    classes: () => string[];
    isOpen: () => boolean;
    active: () => boolean | void;
}

export type TriggerChangeAction = 'mouseenter' | 'mouseleave' | 'click';
export type OpenChangeEvent<Component> =  {key: string, item: Component, trigger: TriggerChangeAction, open: boolean};

export interface MenuProps extends ItemSharedProps {
    theme?: 'light' | 'dark';
    defaultSelectedKeys?: string | string[];
    defaultOpenKeys?: string[];
    isFolded?: boolean;
    inlineCollapsed?: boolean;
    selectable?: boolean;
    subMenuCloseDelay?: number;
    subMenuOpenDelay?: number;
    forceSubMenuRender?: boolean;
    prefixCls?: string;
}

export interface MenuState extends Required<Omit<MenuProps,
    | 'title'
    | 'inlineCollapsed'
    | 'forceSubMenuRender'
    | 'openKeys'
    | 'defaultSelectedKeys'
    | 'isFolded'
    | 'selectedKeys'
    | 'prefixCls'
    | 'rootPrefixCls'>
> {
    level: number;
    hasFoldedItem: boolean;
    itemFoldedFlags: boolean[];
}

export interface MenuComputed {
    rootPrefixCls: () => string;
    classes: () => string[];
}

export type ItemType =
    | Base<SubMenuState, SubMenuProps, SubMenuComputed>
    | Base<MenuItemState, MenuItemProps, MenuComputed>
    | Base<MenuItemGroupState, MenuItemGroupProps, MenuItemGroupComputed>;

export type MessageFun = (payload: {value: ItemType}) => void;
export type InnerItem = Base<ItemSharedProps>;



