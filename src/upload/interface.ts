export interface UploadProps {
    
};

export interface UploadState {
    componentName: string,
    type: string,
    multiple: boolean,
    action: string,
    data: object | ((file: any) => object),
    accept: string,
    beforeUpload: (file: any, fileList: any[]) => (boolean | Promise<any>),
    showUploadList: boolean,
    listType: string,
    disabled: boolean,
    openFileDialogOnClick:  boolean,
    dragState: string,
    showButton:  boolean,
    method: string
    
};

export interface UploadComputed {
    locale: () => object,
    localeCode: () => any,
    dragClass: () => string
};

export interface FileIconState {
}

export interface FileIconProps {
}

export interface FileIconComputed {
    isImage: () => boolean,
}

export interface UploadListState {
    listType: string,
    progressAttr: object,
    showRemoveIcon: boolean,
    showPreviewIcon: boolean,
    previewFile: (file: any) => Promise<any>,
    fileList: any[]
}

export interface UploadListProps {
}

export interface UploadListComputed {
    items: () => object
}
