import {State as TooltipState, Computed as TooltipComputed} from '../tooltip/interface';
import {ButtonHTMLType} from '../button/interface';

type Placement =
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight';

// DropdownButton
export interface DropdownButtonProps {
    type?: string;
    htmlType?: ButtonHTMLType;
    disabled?: boolean;
    icon?: string;
    href?: string;
}

// Dropdown

export interface DropdownProps {
    /**
     * 菜单渲染父节点
     */
    getPopupContainer?: () => HTMLElement;
    /**
     * 菜单
     */
    overlay?: san.SlotNode;
    /**
     * 下拉根元素的类名称
     */
    overlayClassName?: string;
    /**
     *  菜单弹出位置
     */
    placement?: Placement;
    /**
     * 触发下拉的行为
     */
    trigger?: 'hover' | 'click';
    /**
     * 菜单是否显示
     */
    visible?: boolean;
    /**
     * 菜单是否禁用
     */
    disabled?: boolean;
}

export interface DropdownState extends TooltipState {
}

export interface DropdownComputed extends TooltipComputed {
    getTransitionName: () => string;
}
