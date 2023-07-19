export type Target = () => HTMLElement | Window;

export type ObjectDetail = {[key: string]: string};

export type Scroller = (() => void) | null | undefined;

export interface State {
    offsetBottom?: number;
    offsetTop?: number;
    affix?: boolean;
    styles?: ObjectDetail;
    outerStyles?: ObjectDetail;
    
}

export interface Props {
    offsetBottom?: number;
    offsetTop?: number;
    target?: Target;
    styles?: ObjectDetail;
}