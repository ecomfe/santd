import {dayjsType} from '../../interface';

export interface YearPanelState {
    
}

export interface YearPanelProps {
    prefixCls: string;
    value: dayjsType;
    defaultValue: dayjsType;
}

export interface YearPanelComputed {
    startYear: () => number;
    endYear: () => number;
}

export interface YearTableState {
    
}

export interface YearTableProps {
    prefixCls: string;
    value: dayjsType;
    defaultValue: dayjsType;
}

export interface YearTableComputed {
    years: () => YearTableItemType[][];
}

export interface YearTableItemType {
    content: string;
    year: number;
    title: string;
}