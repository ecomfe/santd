export interface SlotNode extends san.SlotNode {
    children: any[]
}

interface StarProps {
    index: number,
    disabled: boolean,
    allowHalf:boolean,
    value: number | undefined | null,
    focused: boolean,
    ref: string
};

export interface Props {
    
};

export interface State {
    disabled: boolean,
    allowClear: boolean,
    autoFocus: boolean,
    allowHalf: boolean,
    value: number | undefined,
    focused: boolean,
    cleanedValue: number | undefined | null,
    hoverValue: number |undefined,
    defaultValue: number |undefined,
    count: number,
    starsProps: StarProps[],
    sValue: number | undefined, // 组件内维护的分数值
    characterIsString: boolean
};

export interface Computed {
    starsProps: () =>  StarProps[];
};