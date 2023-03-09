import * as ToolTip from "santd/tooltip/interface";

/**
 * State
 */
export interface State extends ToolTip.State {
    /**
     * 组件名
     */
    componentName: 'Popconfirm';

    /**
     * 动画方式
     */
    transitionName: string;

    /**
     * 触发方式
     */
    trigger: 'click' | 'hover';
    
    /**
     * 确认按钮类型
     */
    okType: string;
};

/**
 * Computed
 */
export interface Computed extends ToolTip.Computed {};
