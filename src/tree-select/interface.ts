import Base from 'santd/base';
import TreeSelect from "./TreeSelect";


export interface TreeNode extends Base {
    [key: string]: any;
    value: string, 
    label: string, 
    title: string,
    key: string,
    node: TreeNode,
    treeNodes: TreeNode[];
    disabled: boolean;
}

export interface Props {
    defaultValue: number | number[] | string | string[],
    treeCheckable: boolean,
    visible: boolean,
    treeDefaultExpandAll: boolean,
    treeExpandedKeys: string[],
    treeDefaultExpandedKeys: string[],
    treeDefaultexpandedKeys: string[],
    showInput: boolean,
    disabled: boolean,
    treeData: TreeNode[],
    value: string[]
};

interface CheckedKeys {
    checked: string[],
    halfChecked: string[]
}

export type ShowCheckedStrategy = 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';

export interface State {
    multiple: boolean,
    allowClear: boolean,
    selectedKeys: string[],
    filteredKeys: string[],
    hiddenKeys: (string | null)[],
    checkedKeys: CheckedKeys,
    expandedKeys: string[] | undefined,
    selectedValue: TreeNode[],
    dropdownMatchSelectWidth: boolean,
    showCheckedStrategy: ShowCheckedStrategy,
    treeCheckStrictly: boolean,
    treeIcon: boolean,
    inputValue: string,
    showValue: string,
    searchValue: string,
    activeKey: string,
    treeNodeLabelProp: string,
    replaceFields: {
        children: string, 
        title: string, 
        key: string, 
        value: string, 
        label: string
    }
};

export interface Messages {
    santd_treeselect_setInputElement: (this: TreeSelect, payload: {value: HTMLInputElement}) => void;
    santd_treeselect_inputChange: (this: TreeSelect, payload: {value: string}) => void;
    santd_treeselect_inputKeyDown: (this: TreeSelect, payload: {value: KeyboardEvent}) => void;
    santd_treeselect_inputBlur: (this: TreeSelect, payload: {value: MouseEvent}) => void;
    santd_treeselect_inputSearch: (this: TreeSelect, payload: {value: string}) => void;
};
