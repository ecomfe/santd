import Base from 'santd/base';
export interface Computed {
    
}

export interface State {
    
}
export interface objKeys {
    checked: boolean;
    halfChecked: boolean;
}
export interface Props {
    autoExpandParent: boolean;
    blockNode: boolean;
    checkable: boolean;
    checkedKeys: keysArray | objKeys;
    checkStrictly: boolean;
    defaultCheckedKeys: keysArray;
    defaultExpandAll: boolean;
    defaultExpandedKeys: keysArray;
    defaultSelectedKeys: keysArray;
    disabled: boolean;
    draggable: boolean;
    expandedKeys: keysArray;
    height: number | string;
    loadData: () => void;
    loadedKeys: TBase[];
    multiple: boolean;
    selectedKeys: keysArray;
    showIcon: boolean;
    showLine: boolean;
    treeData: TBase[];
    virtual: boolean
}

export interface TBase extends Base {
    treeNodes: TBase[];
    key: string;
    disabled: boolean;
    isEnd: number[];
    expanded: boolean;
}

export interface EBase extends Base {
    handleNodeExpand: () => void;
}

export interface DirectoryTreeComputed {
    
}

export interface DirectoryTreeState {
    expandAction: string;
    showIcon: boolean;
}

export type keysArray = string[];

export interface infoType {
    nativeEvent: {
        ctrlKey?: string;
        metaKey?: string;
        shiftKey?: string;
    }
    node: EBase;
    key: string;
}

export interface expandAllPayloadType {
    value: {
        key: string;
    };
}

export interface nodeCheckPayloadType {
    checkedKeys: keysArray;
    info: infoType;
}

export interface DirectoryTreeProps {
    autoExpandParent: boolean;
    blockNode: boolean;
    checkable: boolean;
    checkedKeys: keysArray;
    checkStrictly: boolean;
    defaultCheckedKeys: keysArray;
    defaultExpandAll: boolean;
    defaultExpandedKeys: keysArray;
    defaultSelectedKeys: keysArray;
    disabled: boolean;
    draggable: boolean;
    expandedKeys: keysArray;
    loadData: () => void;
    loadedKeys: TBase[];
    multiple: boolean;
    selectedKeys: keysArray;
    showIcon: boolean;
    switcherIcon: () => void;
    showLine: boolean;
}

export interface TreeNodeComputed {
    selected: () => boolean;
    checked: () => boolean;
    filtered: () => boolean;
    hidden: () => boolean;
    actived: () => boolean;
    indeterminate: () => boolean;
    classes: () => string[];
    checkboxClass: () => string[];
    titleClass: () => string[];
    showExpandIcon: () => boolean;
}

export interface TreeNodeState {
    selectable: boolean;
    disabled: boolean;
    loading: boolean;
    hasTitle: boolean;
    LINE_UNIT_OFFEST_V: 18;
    isSwitcherActive: boolean;
}

export interface TreeNodeProps {
    disableCheckbox: boolean;
    disabled: boolean;
    icon: string | HTMLElement;
    isLeaf: boolean;
    key: string;
    selectable: boolean;
    title: string | HTMLElement;
}

export interface addTreeNodePayloadType {
    value: TBase;
}

interface commonPayloadValueType {
    event: string;
    nativeEvent: MouseEvent;
    node: TBase;
    key: string;
}

export interface clickTreeNodePayloadValueType extends commonPayloadValueType {
    selected: boolean;
}

export interface checkTreeNodePayloadValueType extends commonPayloadValueType {
    checked: boolean;
    treeNodeDataV: TBase;
}

export interface expandTreeNodePayloadValueType extends commonPayloadValueType {
    treeIndexV: number;
    expanded: boolean;
    expandedKeys: keysArray;
}

export interface dataLoadedPayloadValueType extends commonPayloadValueType {
    loadedKeys: TBase[];
}

export interface clickTreeNodePayloadType {
    value: clickTreeNodePayloadValueType;
}

export interface checkTreeNodePayloadType {
    value: checkTreeNodePayloadValueType;
}

export interface dataLoadedPayloadType {
    value: dataLoadedPayloadValueType;
}

export interface expandTreeNodePayloadType {
    value: expandTreeNodePayloadValueType;
}

export interface allKeysType {
    checkedKeys: keysArray;
    halfCheckedKeys: keysArray;
}