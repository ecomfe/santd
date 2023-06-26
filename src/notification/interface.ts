import Base from 'santd/base';
export interface NotificationProps {
    prefixCls: string;
    animation: string | object;
    transitionName: string;
    maxCount: number;
    closeIcon: HTMLElement;
}

export interface noticesType {
    [key: string]: any;
}

export interface NotificationState {
    prefixCls: string;
    animation: string;
    style: {
        top: string;
        left: string;
    },
    notices: noticesType;
}

export interface NotificationComputed {
    getTransitionName: () => string;
}

export interface NoticeComputed {
}

export interface NoticeState {
    duration: number;
    style: {
        right: string;
        [key: string]: string | number;
    }
}

export interface NoticeProps {
    duration: number;
    closable: boolean;
    prefixCls: string;
    update: boolean;
}

export interface NotificationConfigType {
    btn: string;
    duration?: number;
    placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    bottom: number;
    top: number;
    className: string;
    description: string | Element;
    icon: string;
    key: string;
    message: string | Element;
    style: string | object;
    type: string;
    onClose: () => void;
    onClick: () => void;
    closeIcon: Element;
    getContainer: () => HTMLElement;
    prefixCls: string;
}

export interface PlacementStyle {
    left?: number | string;
    top?: number | string;
    bottom?: number | string;
    right?: number | string;
}

export interface TElement extends Element {
    style?: Record<string, any>;
};

export interface TBase extends Base {
    el?: TElement;
    add?: (arg0: noticesType) => void;
    remove?: (arg0: string) => void;
};

interface callbackTypeArgs {
    component: TBase;
    notice: (arg0: noticesType) => void;
    removeNotice: (arg0: string) => void;
    destroy: () => void;
}

export type callbackType = (args: callbackTypeArgs) => void;

export interface NotificationType {
    newInstance: (args0: noticesType, args1: callbackType) => void;
};