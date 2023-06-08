export interface IItemProps {
    color: string;
    pending: boolean;
    label: string;
}

export interface ITimelineProps {
    reverse: boolean,
    mode: 'left' | 'alternate' | 'right';
    labelClass: string;
}