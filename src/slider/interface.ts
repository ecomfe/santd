import Slider from './index';

export interface Messages {
    santd_slider_handle_save: (this: Slider, payload: {value: any}) => void;

}

export interface MarkItem {
    [key: string]: string | number
}

export interface Mark {
    [key: string]: number | {
        style: string;
        label: string
    }
}

export interface State {
    min: number,
    max: number,
    step: number,
    marks: Mark,
    included: boolean,
    disabled: boolean,
    dots: boolean,
    vertical: boolean,
    trackStyle: any[],
    handleStyle: any[],
    railStyle: any,
    dotStyle: any,
    activeDotStyle: any,
    tipFormatter: (value: any) => string
}
export interface Props {
    value: any;
    range: boolean
}