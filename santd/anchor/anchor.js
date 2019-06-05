/**
 * @file Santd anchor file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import {getScroll} from 'santd/core/util/dom';
import Affix from 'santd/affix';
import addEventListener from 'santd/core/util/addEventListener';
import getRequestAnimationFrame from 'santd/core/util/getRequestAnimationFrame';
import classNames from 'classnames';
import toStyle from 'to-style';
import './style/index';

const prefixCls = classCreator('anchor')();
const sharpMatcherRegx = /#([^#]+)$/;

const anchorContent = `
    <div class="{{classes}}" style="{{wrapperStyle}}">
        <div class="{{anchorClasses}}">
            <div class="${prefixCls}-ink">
                <span class="{{inkClasses}}" s-ref="inkNode" />
            </div>
            <slot></slot>
        </div>
    </div>
`;

function getOffsetTop(element, container) {
    if (!element) {
        return 0;
    }

    if (!element.getClientRects().length) {
        return 0;
    }

    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
        if (container === window) {
            container = element.ownerDocument.documentElement;
            return rect.top - container.clientTop;
        }
        return rect.top - container.getBoundingClientRect().top;
    }
    return rect.top;
}

function easeInOutCubic(t, b, c, d) {
    const cc = c - b;
    t /= d / 2;
    if (t < 1) {
        return (cc / 2) * t * t * t + b;
    }
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

function scrollTo(href, offsetTop = 0, getContainer, callback) {
    const container = getContainer();
    const scrollTop = getScroll(container, true);
    const raf = getRequestAnimationFrame();
    const sharpLinkMatch = sharpMatcherRegx.exec(href);
    if (!sharpLinkMatch) {
        return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
        return;
    }
    const eleOffsetTop = getOffsetTop(targetElement, container);
    const targetScrollTop = scrollTop + eleOffsetTop - offsetTop;
    const startTime = Date.now();
    const frameFunc = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
        if (container === window) {
            window.scrollTo(window.pageXOffset, nextScrollTop);
        }
        else {
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
}

export default san.defineComponent({
    dataTypes: {
        prefixCls: DataTypes.string,
        className: DataTypes.string,
        offsetTop: DataTypes.number,
        bounds: DataTypes.number,
        affix: DataTypes.bool,
        showInkInFixed: DataTypes.bool
    },
    initData() {
        return {
            affix: true,
            showInkInFixed: false,
            getContainer() {
                return window;
            },
            activeLink: null,
            links: [],
            children: []
        };
    },
    computed: {
        classes() {
            const className = this.data.get('className');
            return classNames(className, `${prefixCls}-wrapper`);
        },
        anchorClasses() {
            const affix = this.data.get('affix');
            const showInkInFixed = this.data.get('showInkInFixed');

            return classNames(prefixCls, {
                fixed: !affix && !showInkInFixed
            });
        },
        wrapperStyle() {
            const offsetTop = this.data.get('offsetTop');
            return {
                'max-height': offsetTop ? `calc(100vh - ${offsetTop}px)` : '100vh',
                ...toStyle.object(this.data.get('bodyStyle'))
            };
        },
        inkClasses() {
            const activeLink = this.data.get('activeLink');

            return classNames(`${prefixCls}-ink-ball`, {
                visible: activeLink
            });
        }
    },
    inited() {
        this.data.set('bodyStyle', this.data.get('style'));
        this.data.set('style', {});
    },
    updated() {
        const children = this.data.get('children');
        children.forEach(child => {
            child.data.set('activeLink', this.data.get('activeLink'));
        });
        this.nextTick(() => {
            this.updateInk();
        });
    },
    attached() {
        const getContainer = this.data.get('getContainer');
        this.scrollEvent = addEventListener(getContainer(), 'scroll', this.handleScroll.bind(this));
        this.handleScroll();
    },
    handleScroll() {
        if (this.data.get('animating')) {
            return;
        }

        const {offsetTop, bounds} = this.data.get();

        this.data.set('activeLink', this.getCurrentAnchor(offsetTop, bounds));
    },
    updateInk() {
        if (typeof document === 'undefined') {
            return;
        }
        const anchorNode = this.el;
        const linkNode = anchorNode.getElementsByClassName(`${prefixCls}-link-title-active`)[0];
        if (linkNode) {
            this.ref('inkNode').style.top = `${linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5}px`;
        }
    },
    getCurrentAnchor(offsetTop = 0, bounds = 5) {
        const activeLink = '';
        if (typeof document === 'undefined') {
            return activeLink;
        }

        const linkSections = [];
        const getContainer = this.data.get('getContainer');
        const container = getContainer();
        const links = this.data.get('links');
        links.forEach(link => {
            const sharpLinkMatch = sharpMatcherRegx.exec(link.toString());
            if (!sharpLinkMatch) {
                return;
            }
            const target = document.getElementById(sharpLinkMatch[1]);
            if (target) {
                const top = getOffsetTop(target, container);
                if (top < offsetTop + bounds) {
                    linkSections.push({
                        link,
                        top
                    });
                }
            }
        });

        if (linkSections.length) {
            const maxSection = linkSections.reduce((prev, curr) => (curr.top > prev.top ? curr : prev));
            return maxSection.link;
        }
        return '';
    },
    messages: {
        addLink(payload) {
            this.data.push('children', payload.value);
        },
        registerLink(payload) {
            const links = this.data.get('links');
            if (!links.includes(payload.value)) {
                this.data.push('links', payload.value);
            }
        },
        unRegisterLink(payload) {
            const links = this.data.get('links');
            const index = links.indexOf(payload.value);
            if (index !== -1) {
                this.data.removeAt('links', index);
            }
        },
        handleClick(payload) {
            this.fire('click', {e: payload.value.e, link: payload.value.link});
        },
        scrollTo(payload) {
            const {offsetTop, getContainer} = this.data.get();
            this.data.set('animating', true);
            this.data.set('activeLink', payload.value);
            scrollTo(payload.value, offsetTop, getContainer, () => {
                this.data.set('animating', false);
            });
        }
    },
    components: {
        's-affix': Affix
    },
    template: `
        <div>
            <s-affix s-if="affix" offsetTop="{{offsetTop}}">
                ${anchorContent}
            </s-affix>
            <template s-else>
                ${anchorContent}
            </template>
        </div>
    `
});
