
export interface PaginationLocale {
    // Options.jsx
    items_per_page?: string;
    jump_to?: string;
    jump_to_confirm?: string;
    page?: string;

    // Pagination.jsx
    prev_page?: string;
    next_page?: string;
    prev_5?: string;
    next_5?: string;
    prev_3?: string;
    next_3?: string;
}

// Options
export type TItemRender = {
    page: number;
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
}

export interface OptionsProps {
    disabled: boolean;
    showSizeChanger: boolean;
    locale: PaginationLocale;
    rootPrefixCls: string;
    pageSize: number;
    pageSizeOptions: Array<string | number>;
    current: number;
    goButton: boolean | string;
    quickGo: (value: number) => void;
    size: Exclude<SizeType, 'middle'>;
}

export interface OptionsState {
    goInputText: string;
}

// Pager
export interface PagerProps {
    rootPrefixCls: string;
    page: number;
    active?: boolean;
    className?: string;
    showTitle: boolean;
    last?: boolean;
    locale?: any;
    itemRender?: TItemRender;
}

export interface PagerComputed {
    classes: () => string[];
}

// Pagination
export interface PaginationData {
    selectPrefixCls: string;
    prefixCls: string;
    pageSizeOptions: string[] | number[];

    /**
     * 当前页数
     */
    current: number;
    /**
     * 默认当前页数
     */
    defaultCurrent: number;
    /**
     * 数据总数
     */
    total: number;
    /**
     * 每页条数
     */
    pageSize: number;
    /**
     * 默认每页条数
     */
    defaultPageSize: number;
    /**
     * 只有一页时是否隐藏分页器
     */
    hideOnSinglePage: boolean;
    /**
     * 是否可以改变 pageSize
     */
    showSizeChanger: boolean;
    /**
     * 展示较少的分页数
     */
    showLessItems: boolean;
    /**
     * 是否展示前进后退的跳转按钮
     */
    showPrevNextJumpers: boolean;
    /**
     * 是否展示快速跳转
     */
    showQuickJumper: boolean | {
        goButton: boolean;
    };
    /**
     * 是否展示 当前页/总页数
     */
    showTitle: boolean;
    /**
     * 当添加该属性时，显示为简单分页
     */
    simple: boolean;
    /**
     * 禁用分页
     */
    disabled: boolean;

    /**
     * 本地化
     */
    locale: PaginationLocale;
}

export type TPageItem = {type: 'page', page: number, className?: string};
export type TPageItemJump = {type: 'jumpPrev' | 'jumpNext'};
export type TShowTotal = (total: number, range: [number, number]) => boolean;

export interface PaginationProps extends Partial<PaginationData> {
    /**
     * 用于自定义页码的结构
     */
    itemRender?: TItemRender;
    /**
     * 用于显示数据总量和当前数据顺序
     */
    showTotal?: TShowTotal;
    /**
     * 是否还有下一页
     */
    hasNext?: boolean;
}

export interface PaginationState extends Omit<PaginationData,
    'locale' | 'disabled' | 'simple' | 'pageSize' | 'current'> {
    onChange: () => void;
    selectComponentClass: null | string;
    onShowSizeChange: () => void;
}

export interface PaginationPrivateProps {
    current: PaginationData['current'];
    currentInputValue:  PaginationData['current'];
    pageSize: PaginationData['pageSize'];
    hasGoButton: boolean;
}

export interface PaginationComputed {
    classes: () => string[];
    hasPrev: () => boolean;
    hasNext: () => boolean;
    allPages: () => number;
    pageList: () => Array<TPageItem | TPageItemJump>
    totalText: () => boolean;
}

export type JumpFun = (...restParams: any[]) => void;


