import {Component} from 'san/types';

export type gridType = objectType;

export interface Props {
    /**
     * 是否展示边框
     */
    bordered?:	boolean;
    /**
     * 列表底部
     */
    footer?: string | HTMLElement;
    /**
     * 列表栅格配置
     */
    grid?: object;
    /**
     * 列表头部
     */
    header?: string | HTMLElement;
    /**
     * 设置 List.Item 布局, 设置成vertical则竖直样式显示, 默认横排
     */
    itemLayout?: string;
    /**
     * 当卡片内容还在加载中时，可以用 loading 展示一个占位
     */
    loading?: boolean;
    /**
     * 加载更多
     */
    loadMore?: boolean | HTMLElement;
    /**
     * 默认文案设置，目前包括没有数据时文案
     */
    locale?: localeType;
    /**
     * 对应的 pagination 配置, 设置 false 不显示
     */
    pagination?: boolean | paginationType;
    /**
     * list 的尺寸
     */
    size?: 'default' | 'middle' | 'small' | 'large';
}

export interface paginationType extends Object {
    defaultCurrent?: number;
    defaultPageSize?: number;
    onShowSizeChange?: Function;
    onChange?: Function;
}

export type defaultPaginationPropsType = {
    current: number;
    total: number;
}

export type localeType = {
    emptyText: string;
}

export interface State {
    dataSource: string[];
    bordered: boolean;
    split: boolean;
    loading: boolean;
    pagination: boolean;
    paginationPosition: string;
    defaultPaginationProps: defaultPaginationPropsType;
    itemChildren: Component[];
    locale: localeType;
}

export interface Computed {
    /**
     * 总容器类名列表
     */
    classes: () => string[];

    /**
     * 分页器参数
     */
    paginationProps: () => {
        current: number;
        total: number;
        pageSize: number;
        [key: string]: any;
    }

    splitDataSource: () => string[];
}

export type payloadType = objectType;

export type objectType = {
    [key: string]: any;
}
export interface ItemState {}

export interface ItemProps {
    /**
     * 列表操作组对应的slot名称，根据 itemLayout 的不同, 位置在卡片底部或者最右侧
     **/
    actions?: Array<object | string>;
    /**
     * 额外内容, 通常用在 itemLayout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧
     **/
    extra?: HTMLElement;
    /**
     * 设置 List.Item 布局, 设置成vertical则竖直样式显示, 默认横排
     **/
    itemLayout?: string;
}

export interface ItemComputed {}