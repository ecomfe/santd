export interface State {
    groupSeparator: string;
    value: string | number;
    decimalSeparator: string;
}

export interface Props {
    
}

export interface Computed {
    showValue: () => {
        int: string;
        decimal?: string;
    }
}