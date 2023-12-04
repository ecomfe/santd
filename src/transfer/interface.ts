import List from './List';
export interface TransferItem {
    key: string,
    title: string,
    description: string,
    chosen: boolean,
    disabled: boolean,
    checked: boolean,
}

export interface State {
    componentName: string,
    showSelectAll: boolean,
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[],
    operations: string[]
}

export interface ListState {
    filterValue: string,
    checkedKeys: string[]
}

export interface ListProps {
    getFilteredItems: TransferItem[],
    checkedKeys: string[]
}

export interface ListMessages {
    santd_transfer_itemSelect: (this: List, payload: {value: string}) => void;
    santd_transfer_itemSelectAll: (this: List, payload: {value: {
        selectedKeys: string[],
        checkAll: boolean
    }}) => void;
    
};