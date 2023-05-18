import {Screens} from '../core/util/responsiveObserve';
export interface State {
    bordered: boolean,
    title?: string,
    size: string,
    layout: string,
    column: object,
    screens: Screens,
}