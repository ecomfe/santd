/**
 * @file DOM相关基础库
 */

interface StandardElement {
    addEventListener: (...args: any) => void;
    removeEventListener: (...args: any) => void;
}

interface IEElement {
    attachEvent: (event: string, listener: EventListener) => void;
    detachEvent: (event: string, listener: EventListener) => void;
}

export interface BaseElement extends Partial<StandardElement>, Partial<IEElement> {
}

export type ListenerElement = StandardElement & IEElement;

const isCompatMode = document.compatMode === 'BackCompat';

function isWindow<T>(ele: Window | T): ele is Window {
    return ele === window;
}

function getViewRoot() {
    return isCompatMode ? document.body : document.documentElement;
}

export function hasClass(elements: HTMLElement, cls: string) {
    return elements.className
        && typeof elements.className === 'string'
        && elements.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

export function addClass(ele: HTMLElement, cls: string) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

export function removeClass(ele: HTMLElement, cls: string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * 获取元素在页面中的位置和尺寸信息
 *
 * @param {HTMLElement} element 目标元素
 * @return 元素的尺寸和位置信息，
 * 包含`top`、`right`、`bottom`、`left`、`width`和`height`属性
 */
export function getOffset<TElement extends Element = Element>(element?: TElement) {
    if (!element) {
        return {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
        };
    }

    const rect = element.getBoundingClientRect();
    const clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
    const clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    return {
        top: rect.top + scrollTop - clientTop,
        right: rect.right + scrollLeft - clientLeft,
        bottom: rect.bottom + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
}

/**
 * 获取页面宽度
 *
 * @return 页面宽度
 */
export function getPageWidth() {
    const viewRoot = getViewRoot();

    return Math.max(
        document.documentElement ? document.documentElement.scrollWidth : 0,
        document.body ? document.body.scrollWidth : 0,
        viewRoot ? viewRoot.clientWidth : 0,
        0
    );
}

/**
 * 获取页面高度
 *
 * @return 页面高度
 */
export function getPageHeight() {
    const viewRoot = getViewRoot();

    return Math.max(
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.scrollHeight : 0,
        viewRoot ? viewRoot.clientHeight : 0,
        0
    );
}



export function getScroll<TElement extends Element = HTMLElement>(target: Window | TElement, top?: boolean) {
    if (typeof window === 'undefined') {
        return 0;
    }
    const a = document.createElement('div');
    a.scrollTop = 30;

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';

    let ret = isWindow(target) ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow(target) && typeof ret !== 'number') {
        ret = document.documentElement[method];
    }

    return ret;
}

/**
 * 获取页面视觉区域宽度
 *
 * @return 页面视觉区域宽度
 */
export function getViewWidth() {
    const viewRoot = getViewRoot();
    return viewRoot ? viewRoot.clientWidth : 0;
}

/**
 * 获取页面视觉区域高度
 *
 * @return 页面视觉区域高度
 */
export function getViewHeight() {
    const viewRoot = getViewRoot();
    return viewRoot ? viewRoot.clientHeight : 0;
}

/**
 * 获取纵向滚动量
 *
 * @return 纵向滚动量
 */
export function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/**
 * 获取横向滚动量
 *
 * @return 横向滚动量
 */
export function getScrollLeft() {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

/**
 * 获取页面纵向坐标
 *
 * @return 页面纵向坐标
 */
export function getClientTop() {
    return document.documentElement.clientTop || document.body.clientTop || 0;
}

/**
 * 获取页面横向坐标
 *
 * @return 页面横向坐标
 */
export function getClientLeft() {
    return document.documentElement.clientLeft || document.body.clientLeft || 0;
}

/**
 * 封装addEventListener
 *
 * @return {function}
 */
export const on = (document as BaseElement).addEventListener
    ? function <TElement extends StandardElement>(
        element: TElement,
        event?: Parameters<TElement['addEventListener']>[0],
        handler?: Parameters<TElement['addEventListener']>[1]) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    }
    : function (element: IEElement, event?: string, handler?: EventListener) {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    };

/**
 * 封装removeEventListener
 *
 * @return {function}
 */
export let off = (document as BaseElement).removeEventListener
    ? function <TElement extends StandardElement>(
        element: TElement,
        event?: Parameters<TElement['removeEventListener']>[0],
        handler?: Parameters<TElement['removeEventListener']>[1]) {
        if (element && event && handler) {
            element.removeEventListener(event, handler, false);
        }
    }
    : function (element: IEElement, event?: string, handler?: EventListener) {
        if (element && event && handler) {
            element.detachEvent('on' + event, handler);
        }
    };

/**
 * 判断某个元素是否在外层元素中
 * @param root 外层元素
 * @param n 被检测的元素
 *
 * @return
 */

export function contains(root: Node, n: Node | null) {
    let node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

let cached: number | undefined;

export function getScrollBarSize(fresh?: boolean) {
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = '0px';
        outerStyle.left = '0px';
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

/**
 * 获取指定层级的父节点
 * @param {HTMLElement} node HTML节点
 * @param {number=} num 父节点层级（可选）
 */
export function getParentNode(node: ParentNode | null, num?: number): ParentNode | null {
    if (!node) {
        return null;
    }
    return num ? getParentNode(node.parentNode, num - 1) : node;
}
