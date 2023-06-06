export type TypographyType = 'text' | 'paragraph' | 'title';

export enum TitleLevel {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4
}

export interface CopyConfig {
    text?: string | null;
    onCopy?: () => void;
}

export interface EllipsisConfig {
    rows?: number;
    expandable?: boolean;
}

interface BaseProps {
    /**
     * 是否可拷贝，为对象时可设置复制文本以回调函数
     */
    copyable: boolean | CopyConfig;
    /**
     * 添加删除线样式
     */
    delete: boolean;
    /**
     * 禁用文本
     */
    disabled: boolean;
    /**
     * 设置自动溢出
     */
    ellipsis: boolean | EllipsisConfig;
    /**
     * 添加标记样式
     */
    mark: boolean;
    /**
     *  添加下划线样式
     */
    underline: boolean;
    /**
     * 文本类型
     */
    type:  'secondary' | 'warning' | 'danger';
    /**
     * 是否加粗
     */
    strong: boolean;
}

export type TextProps = Partial<BaseProps>;

export type ParagraphProps = Partial<BaseProps>;

export interface TitleProps extends Partial<BaseProps> {
    /**
     * 重要程度，相当于 `h1`、`h2`、`h3`、`h4`
     */
    level: TitleLevel;
}

export interface InternalProps extends Partial<BaseProps> {
    prefixCls: string;
}

export interface InternalState {
    componentName: string;
    clientRendered: boolean;
}

export interface InternalComputed {
    getEllipsis: () => EllipsisConfig;
    canUseCSSEllipsis: () => boolean;
    classes: () => string[];
}


