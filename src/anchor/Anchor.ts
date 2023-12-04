/**
 * @file Santd anchor file
 * @author mayihui@baidu.com
 **/

import {classCreator} from '../core/util/index';
import {getScroll, on, off, ListenerElement} from '../core/util/dom';
import getRequestAnimationFrame from '../core/util/getRequestAnimationFrame';
import type * as I from './interface';
import {Component} from 'san/types';
import Base from 'santd/base';
import Affix from '../affix';
import Link from './Link';
import './style/index';

const prefixCls = classCreator('anchor')();
const sharpMatcherRegx: RegExp = /#([^#]+)$/;

const anchorContent = /* html */ `
    <div
        class="${prefixCls}-wrapper {{wrapperClass}}"
        style="max-height:{{offsetTop ? 'calc(100vh - ' + offsetTop + 'px)' : '100vh'}};{{style}}{{wrapperStyle}}"
    >
        <div class="${prefixCls}{{!affix && !showInkInFixed ? ' fixed' : ''}}">
            <div class="${prefixCls}-ink">
                <span class="${prefixCls}-ink-ball{{activeLink ? ' visible' : ''}}" s-ref="inkNode" />
            </div>
            <slot/>
        </div>
    </div>
`;

function getOffsetTop(element: HTMLElement, container: HTMLElement | (Window & typeof globalThis)): number {
    if (!element || !element.getClientRects().length) {
        return 0;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument.documentElement;
            return rect.top - container.clientTop;
        }
        // @ts-ignore
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
};

function easeInOutCubic(t: number, b: number, c: number, d: number): number {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
};

function scrollTo(
    href: string,
    offsetTop = 0,
    getContainer: (() => Window & typeof globalThis),
    callback: () => void
): void {
    const sharpLinkMatch = sharpMatcherRegx.exec(href);
    if (!sharpLinkMatch) {
        return;
    }

    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
        return;
    }

    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const raf = getRequestAnimationFrame();
    const eleOffsetTop = getOffsetTop(targetElement, container);
    const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
    const startTime = Date.now();
    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time > 450 ? 450 : time, scrollTop, targetScrollTop, 450);
        if (container === window) {
            window.scrollTo(window.pageXOffset, nextScrollTop);
        }
        else {
            // @ts-ignore
            container.scrollTop = nextScrollTop;
        }
        if (time < 450) {
            raf(frameFunc);
        }
        else {
            callback();
        }
    };
    raf(frameFunc);
};

function getContainer(): Window & typeof globalThis {
    return window;
};


export default class Anchor extends Base<I.State, I.Props, I.Computed> {
    autoFillStyleAndId!: false;
    linkChildren!: never[];
    static Link: typeof Link;
    private _handleScroll!: () => void;

    initData(): I.State {
        return {
            getContainer,
            affix: true,
            showInkInFixed: false,
            activeLink: null,
            links: []
        };
    };

    inited(): void {
        this.linkChildren = [];
    };

    updated(): void {
        this.nextTick(() => {
            this.updateInk();
        });
    };

    attached(): void {
        this._handleScroll = this.handleScroll.bind(this);
        if (this._handleScroll) {
            on(this.data.get('getContainer')() as unknown as ListenerElement, 'scroll', this._handleScroll);
        }
        this.nextTick(() => this._handleScroll());

        this.watch('activeLink', value => {
            this.fire('change', value);
            this.linkChildren && this.linkChildren.forEach((child: Component) => {
                child.data.set('activeLink', value);
            });
        });
    };

    disposed(): void {
        // @ts-ignore
        this.linkChildren = null;

        if (this._handleScroll) {
            off(this.data.get('getContainer')() as unknown as ListenerElement, 'scroll', this._handleScroll);
            this._handleScroll = () => {};
        }
    };

    handleScroll(): void {
        if (this.data.get('animating')) {
            return;
        }

        const {targetOffset, offsetTop, bounds} = this.data.get() as I.AnchorGetData;
        this.data.set('activeLink', this.getCurrentActiveLink(targetOffset || offsetTop, bounds));
    };

    updateInk<T extends Component<{}> & HTMLElement>(): void {
        if (typeof document === 'undefined') {
            return;
        }

        let anchorNode = this.el as HTMLElement;
        let linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0] as HTMLElement;
        if (linkNode) {
            this.ref<T>('inkNode').style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
        }
    };

    getCurrentActiveLink(offsetTop = 0, bounds = 5): string {
        const getCurrentAnchor = this.data.get('getCurrentAnchor');
        if (getCurrentAnchor) {
            return getCurrentAnchor();
        }

        let activeLink = '';

        if (document) {
            let container = this.data.get('getContainer')();

            this.data.get('links').forEach(function (link: string) {
                const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
                if (!sharpLinkMatch) {
                    return;
                }

                let target = document.getElementById(sharpLinkMatch[1]);
                if (target) {
                    const top = getOffsetTop(target, container);
                    if (top < offsetTop + bounds) {
                        activeLink = link;
                    }
                }
            });
        }
        return activeLink;
    };

    static messages: I.Messages = {
        santd_link_addInstance(payload) {
            this.linkChildren.push(payload.value);
        },

        santd_link_add(payload) {
            let links = this.data.get('links');
            if (!links.includes(payload.value)) {
                this.data.push('links', payload.value);
            }
        },

        santd_link_rm(payload) {
            let links = this.data.get('links');
            const index = links.indexOf(payload.value);
            if (index !== -1) {
                this.data.removeAt('links', index);
            }
        },

        santd_link_click(payload) {
            this.fire('click', {e: payload.value.e, link: payload.value.link});
        },

        santd_link_scrollTo(payload) {
            const {targetOffset, offsetTop, getContainer} = this.data.get() as I.AnchorGetData;
            this.data.set('animating', true);
            this.data.set('activeLink', payload.value);

            scrollTo(payload.value, targetOffset || offsetTop, getContainer, () => {
                this.data.set('animating', false);
            });
        }
    };

    static components = {
        's-affix': Affix
    };

    static template = /* html */ `
        <div>
            <s-affix s-if="affix" offsetTop="{{offsetTop}}">
                ${anchorContent}
            </s-affix>
            <template s-else>
                ${anchorContent}
            </template>
        </div>
    `;
};
