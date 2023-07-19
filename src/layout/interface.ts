/**
* @component layout
* @author lijiangsong@baidu.com
*/

// GeneratorProps
export interface GeneratorProps {
    suffixCls: string | number;
    tagName: 'header' | 'footer' | 'main' | 'section';
}

// Payload
export type Payload = {
    value: string;
} & Record<string, unknown>;

// BaseState
export interface BaseState {
    siders: string[];
}

// BaseProps
export interface BaseProps {
    className?: string;
    hasSider?: boolean;
    style?: {
        [key: string]: string;
    }
}

export type CollapseType = 'clickTrigger' | 'responsive';

export type SiderTheme = 'light' | 'dark';

// SiderState
export interface SiderState {
    collapsible: boolean;
    width: number | string;
    collapsedWidth: number | string;
    mediaChange: boolean;
    collapsed: boolean;
}

// SiderProps
export interface SiderProps {
  prefixCls?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  zeroWidthTriggerStyle?: string | object;
  trigger?: string;
  width?: number | string;
  collapsedWidth?: number | string;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  theme?: SiderTheme;
  onBreakpoint?: (broken: boolean) => void;
}

export interface SiderComputed {
    classes: () => string[];
    styles: () => {[key: string]: string};
    siderWidth: () => number|string;
}

export interface MediaQueryList {  
    matches?: boolean;  
    media?: string;  
    addListener?: (listener: MediaQueryListListener) => void;  
    removeListener?: (listener: MediaQueryListListener) => void;  
}
    
export type MediaQueryListListener = (list: MediaQueryList) => void;

export type LoopNode = ElementNode | TextNode | SlotNode |  LoopComponent;

export interface LoopComponent extends san.Component {
    children: Array<LoopNode>;
}
export interface SlotNode extends san.SlotNode {
    children?: Array<LoopNode>;
}
export interface TextNode extends san.AText {
    nodeType: san.NodeType.TEXT;
}
export interface ElementNode extends san.AElement {
    nodeType: san.NodeType.ELEM;
    children: Array<TextNode | ElementNode>;
}