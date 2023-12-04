import {BaseElement} from '../core/util/dom';

export interface Computed {
    
}

export interface State {
    status: 'info';
    exceptionMap: {
        404: BaseElement;
        500: BaseElement;
        403: BaseElement;
    };
    iconMap: {
        success: string;
        error: string;
        info: string;
        warning: string;
    }
}
export interface Props {
    /**
     * 结果的状态,决定图标和颜色
     */
    status: string;
    /**
     * title 文字
     */
    title: string;
    /**
     * subTitle 文字
     */
    subTitle: string;
}
