import Tabs from ".";

export type Payload = {
    value: string;
} & Record<string, unknown>;

export interface Props {};

export interface State {
    /**
     *  页签的基本样式
     */
    type: 'line' | 'card' | 'editable-card';

    /**
     *  是否隐藏加号图标
     */
    hideAdd: boolean;

    /**
     * 页签位置
     */
    tabPosition: 'top' | 'right' | 'bottom' | 'left';

    /**
     * 子代
     */
    children: [];

    /**
     * 标签居中展示
     */
    centered: boolean;

    /**
     * 开启键盘切换功能
     */
    keyboard: true;
};

export interface Computed {
    classes?: () => string;
    contentClasses?: () => string[];
    hasAnimated?: () => object;
    props?: () => {[key: string]: unknown};
};

export interface Messages {
    santd_tabs_addTabPane: (this: Tabs, payload: Payload) => void;
    santd_tabs_removeTabPane: (this: Tabs, payload: Payload) => void;
    santd_tabs_prevClick: (this: Tabs, payload: Payload) => void;
    santd_tabs_nextClick:(this: Tabs, payload: Payload) => void;
};

/**
 * TabBarTabsNode
 */
export interface ComputedBar {
    __tabBars__?: () => Record<string, unknown>;
};

/**
 * ScrollableInkTabBar
 */
export interface MessagesScroll {
    santd_tabs_addRef?: (payload: {
        value: {
            [x: string]: any;
            name: string;

        };
    }) => void;
}
