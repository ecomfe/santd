import {ListenerElement} from '../core/util/dom';

export interface State {
    componentName: string;
    width: number;
    transitionName: string;
    maskTransitionName: string;
    confirmLoading: boolean;
    visible: boolean;
    okType: string;
    getContainer?: () => HTMLElement;
}

export interface Props {
    /**
     * 确认按钮文字	
     */
    okText?: string;
    /**
     * 取消按钮文字	
     */
    cancelText?: string;
    /**
     * 垂直居中展示 modal
     */
    centered?: boolean;
}

export interface Computed {
    wrapClass: () => string;
}

export interface ActionButtonProps {
    autoFocus?: boolean;
    buttonProps?: object;
    closeModal: (args?: any[]) => void;
    type?: string;
}

export interface ActionButtonComputed {
    
}

export interface ActionButtonState {
    loading: boolean;
}

export interface ConfirmDialogState {
    componentName: string;
    autoFocusButton: string;
    iconType: string;
    maskClosable: boolean;
    okCancel: boolean;
    okType: string;
    width: number;
}

export interface ConfirmDialogProps {
    
}

export interface ConfirmDialogComputed {
    contentIsComponent: () => boolean;
}

export interface ConfirmConfigType {
    type: string;
    iconType?: iconMapsType;
    okCancel: boolean;
    afterClose?: (...args: any[]) => void;
    [key: string | number | symbol]: any;
}

type iconMapsType = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

export interface DialogState {
    bodyStyle: styleType;
    maskStyle: styleType;
    mask: boolean;
    visible: boolean;
    keyboard: boolean;
    closable: boolean;
    maskClosable: boolean;
    destroyOnClose: boolean;
    width: number;
    hasFooter: boolean;
    okType: string;
    confirmloading: boolean;
    inTransition: boolean;
    titleId: string;
    locale: {
        okText: string;
        cancelText: string;
        justOkText: string;
    };
}

export interface DialogProps {
    
}

export interface DialogComputed {

}

export interface styleType {
    [key: string]: string;
}

export interface TDocument extends Document {
    parentWindow?: Window;
}

export interface TListenerElement extends ListenerElement{
    documentElement: ListenerElement;
}

export interface ModalType {
    warn: confirmType;
    warning: confirmType;
    confirm: (props: any[]) => confirmType;
}

export interface confirmType {
    destroy: (...args: any[]) => void;
    update: (args: ConfirmConfigType) => void;
}
