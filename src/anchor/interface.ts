import Anchor from "./Anchor";

export type AnchorGetData = {
    targetOffset: number;
    offsetTop: number;
    bounds: number;
    getContainer: (() => Window & typeof globalThis);
};

export interface State {
    links: string[];
    affix: boolean;
    showInkInFixed: boolean;
    activeLink: null | string;
    getContainer: (() => Window & typeof globalThis);
};

export interface Messages {
    santd_link_addInstance: (this: Anchor, payload: {value: never}) => void;

    santd_link_add: (this: Anchor, payload: {value: never}) => void;

    santd_link_rm: (this: Anchor, payload: {value: never}) => void;

    santd_link_click: (this: Anchor, payload: {value: {
        e: Event;
        link: string;
    }}) => void;

    santd_link_scrollTo: (this: Anchor, payload: {value: never}) => void;
};

export interface Props {};

export interface Computed {};

