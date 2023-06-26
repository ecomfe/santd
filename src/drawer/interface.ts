export interface State {
    closable: boolean;
    destroyOnClose: boolean;
    getContainer: string;
    mask: boolean;
    maskClosable: boolean;
    maskStyle: object;
    width: number;
    height: number;
    placement: string;
    keyboard: boolean;
    showCloseBtn: boolean;
}

export interface Props {
    
}

export interface Computed {
    wrapStyle: () => {
        transform: string;
        msTransform: string;
        width: string | number | false;
        height: string | number | false;
    }
}