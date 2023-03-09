/**
 * State
 */
export interface State {
    /**
     * 鼠标移入后延时多少显示，单位s
     */
    mouseEnterDelay: number;
    destroyTooltipOnHide: boolean;

    /**
     * 鼠标移出后延时多少才隐藏，单位s
     */
    mouseLeaveDelay: number;
    popupAlign: JSONValue;
    builtinPlacements: PlacementMap;

    /**
     * 触发行为
     */
    trigger: 'hover' | 'click';

    /**
     * 气泡框位置
     */
    placement: string;
    transitionName: string;

    /**
     * 箭头是否指向目标元素中心
     */
    arrowPointAtCenter: boolean;

    /**
     * 气泡被遮挡时自动调整位置
     */
    autoAdjustOverflow: boolean;
    useDomNodeForce: boolean;

    /**
     * 	背景颜色
     */
    color: string;
};

/**
 * Props
 */
export interface Props {};

/**
 * Computed
 */
export interface Computed {
    builtinPlacements: () => PlacementMap;
    colorStyle: () => {[key: string]: string} | string;
    arrowColorStyle: () => {[key: string]: string} | string;
};

/**
 * Config
 */
export interface Config {
    arrowPointAtCenter: JSONValue;
    arrowWidth?: number;
    horizontalArrowShift?: number;
    verticalArrowShift: number;
    autoAdjustOverflow: boolean;
};

/**
 * PlacementMap
 */
export interface PlacementMap {
    [key: string]: {
        points: string[];
        offset: number[];
        ignoreShake?: boolean;
        overflow?: AutoAdjustOverflow;
        targetOffset?: number[];
        direction?: Direction;
    };
};

/**
 * AutoAdjustOverflow
 */
export interface AutoAdjustOverflow {
    adjustX: number;
    adjustY: number;
};