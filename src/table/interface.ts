export interface Props {};

export interface State {
    /**
     * 是否加载中
     */
    loading: boolean;

    /**
     * 设置横向或纵向滚动
     */
    scroll: {
        x?: number | boolean;
        y?: number;
    };

    /**
     * 尺寸大小
     */
    size: 'default' | 'middle' | 'small';
    data: {
        [key: string]: JSONValue;
    }[];

    /**
     * 分页配置
     */
    pagination: {
        current: number;
        pageSize: number;
        position: string[];
    } | undefined;

    /**
     * 展示树形数据时，每层缩进的宽度
     */
    indentSize: number;
    selectedKeys: any[];
    expandedKeys: string[];

    /**
     * 指定选中项的 key 数组
     */
    selectedRowKeys: string[];
    selectedRows: object[];

    /**
     * 初始时是否展开所有子行
     */
    defaultExpandAllRows: boolean;
    defaultExpandedRowKeys: string[];

    /**
     * 滚动位置
     */ 
    scrollPosition: string;

    /**
     * 通过点击行来展开子行
     */ 
    expandRowByClick: boolean;

    /**
     * 默认文案设置
     */  
    locale?: {
        emptyText: string;
        filterConfirm: string;
        filterReset: string;
    };

    /**
     * 是否自动省略
     */   
    ellipsis: boolean;

    /**
     * 是否固定表头
     */
    sticky: boolean;
};

export interface Computed {
    /**
     * class合集
     */
    classes: () => string[];

    /**
     * 是否存在顶部pagination
     */
    paginationTop: () => string | undefined;

    /**
     * 是否存在底部pagination
     */
    paginationBottom: () => string | undefined;
};

export type Column = {
    key: number;
    dataIndex: number;
    scopedSlots: {
        filterIcon: string;
        [key: string]: JSONValue;
    };
    className: number;
    attrs: {
        rowSpan: number;
        colSpan: number;
        [key: string]: JSONValue;
    };
    children: object;
    render: () => {};
    onFilter: (value: object, item: object) => {};
    sorter: JSONValue;
    filters: JSONValue;
    left: string;
    right: string;
    width: string;
};