export interface ICarouselProps {
    clientWidth: number,
    clientHeight: number,
    curIndex: number,
    slickIndex: number,
    slickDots: number[] | null | undefined,
    dontAnimate: boolean,
    animating: boolean,
    dots: boolean,
    easing: string,
    dotPosition: string,
    effect: string,
    autoplay: boolean,
    autoplaySpeed: number,
    speed: number
};

export interface CNode extends Node {
    style: string;
};

export interface ITrackProps {
    slickTracks?: Node[] | null | undefined;
    slickDots?: number[] | null | undefined;
    clientHeight: number
};