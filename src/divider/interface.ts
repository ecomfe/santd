export interface Props {}

export interface State {
    /**
     * 水平或者垂直类型
     */
    type: 'horizontal' | 'vertical';
}

export interface Computed {
    /**
     * class集合
     */
    classes: () => string[];
}