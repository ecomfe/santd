interface IImgCommonProps {
    crossorigin?:  string | null;
    decoding?:  string | null;
    alt?: string |  string | null;
    sizes?:  string | null;
    srcset?:  string | null;
    usemap?: string | null;
    style?: string | null;
}
export interface IImageProps extends IImgCommonProps {
    status: string;
    currentId: number;
    isShowPreview: boolean;
    imgCommonProps: object;
    preview: boolean;
}

export interface IPreviewGroupProps {
    imageList: string[];
    current: number;
    isShowPreview: boolean;
    previewUrls: object;
}

export type OriginType = {
    originX: number;
    originY :number;
    deltaX: number;
    deltaY: number;
}
export interface Positon {
    x: number;
    y: number;
}
export interface IPreviewProps {
    scale: number;
    rotate: number;
    isMoving: boolean;
    position: Positon;
    modalBodyStyle: {
        position: string;
        inset: number;
        overflow: string;
    },
    modalStyle: string;
    previewUrls: {[index: string]: any},
    lastWheelZoomDirection: {
        wheelDirection: number;
    };
    visible?: boolean;
}