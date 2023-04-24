import san from 'san/types';

// Col
type ColSpanType = number | string;

type FlexType = number | 'none' | 'auto' | string;

export interface ColSize {
    flex?: FlexType;
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
}

export interface ColProps {
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
    xs?: ColSpanType | ColSize;
    sm?: ColSpanType | ColSize;
    md?: ColSpanType | ColSize;
    lg?: ColSpanType | ColSize;
    xl?: ColSpanType | ColSize;
    xxl?: ColSpanType | ColSize;
}

export interface ColComputed {
    classes: () => string[];
}


// Row
type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

type RowAligns = 'top' | 'middle' | 'bottom';
type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

type ResponsiveLike<T> = {
    [key in Breakpoint]?: T;
};
type ResponsiveAligns = ResponsiveLike<RowAligns>;
type ResponsiveJustify = ResponsiveLike<RowJustify>;

type Gutter = number | Partial<Record<Breakpoint, number>>;

export interface RowProps {
    gutter?: Gutter;
    align?: RowAligns | ResponsiveAligns;
    justify?: RowJustify | ResponsiveJustify;
    type?: 'normal' | 'flex';
}

export interface RowState extends Required<Pick<RowProps, 'type' | 'gutter'>>{
    screens: Partial<Record<Breakpoint, boolean>>;
}

export interface RowComputed {
    classes: () => string[];
}

export type WatchFunType = () => void;

// 重写san中部分类型的定义

export type LoopNode = ElementNode | TextNode | SlotNode |  LoopComponent;
export interface LoopComponent extends san.Component {
    children: Array<LoopNode>;
}
export interface SlotNode extends san.SlotNode {
    children: Array<LoopNode>;
}
export interface TextNode extends san.AText {
    nodeType: san.NodeType.TEXT;
}
export interface ElementNode extends san.AElement {
    nodeType: san.NodeType.ELEM;
    children: Array<TextNode | ElementNode>;
}