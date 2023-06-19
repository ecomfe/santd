// export type gridType1 = objectType;
export interface Props {
    /**
     * 是否支持清除, 单选模式有效
     */
    allowClear?: boolean,
    /**
     * 自动获取焦点
     */
    autoFocus?: boolean,
    /**
     * 使用键盘选择选项的时候把选中项回填到输入框中
     */
    backfill?: boolean,
    /**
     * 自动完成的数据源
     */
    dataSource?: string[] | number[],
    /**
     * 指定默认选中的条目
     */
    defaultValue?: string | string[] | number | number[],
    /**
     * 是否禁用
     */
    disabled?: boolean,
    /**
     * 是否根据输入项进行筛选
     */
    filterOption?: boolean | ((inputValue: string, option: object) => boolean),
    /**
     * 输入框提示
     */
    placeholder?: string,
    /**
     * 指定当前选中的条目
     */
    value?: string | string[] | number | number[],
    /**
     * 是否默认展开下拉菜单
     */
    defaultOpen?: boolean,
    /**
     * 是否展开下拉菜单
     */
    open?: boolean,
    /**
     * dropdown 菜单自定义样式
     */
    dropdownMenuStyle?: string,
    /**
     * 是否默认高亮第一个选项
     */
    defaultActiveFirstOption?: boolean
};

export interface State {
};

export interface Computed {

};