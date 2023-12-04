import {dayjsType} from '../../interface';

export interface DecadePanelState {
}
export interface DecadePanelProps {
    prefixCls: string;
    value: dayjsType;
    defaultValue: dayjsType;
}
export interface DecadePanelComputed {
    startYear: () => number;
    endYear: () => number;
}

export interface DecadeTableState {
    
}

export interface DecadeTableProps extends DecadePanelProps {
    startYear: number;
    endYear: number;
}

export interface DecadeTableComputed {
    
}

export interface DecadeItemType {
    startDecade: number;
    endDecade: number;
    year?: number;
}
