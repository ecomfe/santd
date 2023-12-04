export interface Props {}

export interface State {
    /**
     * 可见高度
     */
    visibilityHeight: number;

    /**
     * 返回window对象
     */
    target: () => HTMLElement | Window;

    /**
     * 是否可见
     */
    visible: boolean;
}

export interface Computed {}