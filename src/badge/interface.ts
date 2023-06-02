export interface SlotNode extends san.SlotNode {
    children: any[]
}

export interface IPresetColorTypes {
    pink: number;
    red: number;
    yellow: number;
    orange: number;
    cyan: number;
    green: number;
    blue: number;
    purple: number;
    geekblue: number;
    magenta: number;
    volcano: number;
    gold: number;
    lime: number;
}
export interface IBadageProps {
    count?: string | number;
    showZero: boolean;
    overflowCount: number;
    dot: boolean;
    status?: string;
    color?: string;
    offset?: [number, number];
    title?: string;
    hasChild: undefined| boolean;
}