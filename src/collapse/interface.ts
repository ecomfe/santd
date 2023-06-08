export interface IPanelProps {
    prefixCls?: string;
    header?: string;
    headerClass: string;
    showArrow: boolean;
    isActive: boolean;
    destroyInactivePanel: boolean;
    disabled?: boolean;
    accordion?: boolean;
    forceRender: boolean;
    panelKey?: string | number;

}
export interface ICollapseProps {
    activeKey?: string | string[];
    defaultActiveKey?: string | string[];
    acordion?: boolean;
    destroyInactivePanel: boolean;
    expandIconPosition: string;
    bordered: boolean;
    accordion: boolean;
}