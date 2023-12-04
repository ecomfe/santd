export type Size = 'small' | 'middle' | 'large' | number;
export type Direction = 'horizontal' |'vertical'

// space State
export interface State {
    align?: 'start' | 'end' | 'center' | 'baseline';
    direction: Direction;
    size: Size | Size[];
    wrap?: boolean
}

// space Props
export interface Props {
    size?: Size;
    wrap?: boolean;
    direction?: Direction;
    align?:'start' | 'end' | 'center' | 'baseline';
}

// space Computed
export interface Computed {
    classes: () => string[];
    styles: () => string;
}