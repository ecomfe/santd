export interface State {
   
}
enum RequestMethod {
    'POST',
    'PUT',
    'post',
    'put'
}
export interface Props {
    id: string,
    component: string,
    prefixCls: string,
    multiple: boolean,
    directory: boolean,
    disabled: boolean,
    accept: string,
    data: object | ((file: any) => object),
    action: string | ((file: any) => any),
    headers: object,
    beforeUpload: (file: any, fileList: any[]) => (boolean | Promise<any>),
    customRequest: (options: any) => any,
    withCredentials: boolean,
    openFileDialogOnClick: boolean,
    method: RequestMethod
}

export interface Computed {
    
}