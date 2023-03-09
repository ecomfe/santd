export interface Props {};

export interface State {
    /**
     * 是否有slot=content内容
     */
    hasContent: boolean;

    /**
     * 组件大小
     */
    size: 'small' | 'default' | 'large';

    /**
     * 是否为加载中状态
     */
    spinning: boolean;
};

export interface Computed {
    /**
     * classes合集
     */
    spinClasses: () => string[];

    /**
     * 当前加载状态
     */
    currentSpinning: () => boolean;
};