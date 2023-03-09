/**
 * @file Santd tabs utils file
 * @author mayihui@baidu.com
 */

import {Data} from "san/types";
import ScrollableInkTabBar from "./ScrollableInkTabBar";

type Children = {
    data: Data;
    key: string;
}[];

export function getTransformPropValue<T>(v: T): {[key: string]: T} {
    return {
        transform: v,
        WebkitTransform: v,
        MozTransform: v
    };
}

export function getActiveIndex(children: Children, activeKey: string): number{
    for (let i = 0; i < children.length; i++) {
        if (children[i].data.get('key') === activeKey) {
            return i;
        }
    }
    return -1;
}

export function getActiveKey(children: Children, index: number): string {
    return children[index].key;
}

export function isTransform3dSupported(style: ScrollableInkTabBar) {
    return ('transform' in style
        || 'webkitTransform' in style
        || 'MozTransform' in style)
        && window.atob;
}

export function setTransform(style: {
    transform: string;
    webkitTransform: string;
    mozTransform: string;
}, v: string): void {
    style.transform = v;
    style.webkitTransform = v;
    style.mozTransform = v;
}

export function setTransition(style: {
    transition: string;
    webkitTransition: string;
    MozTransition: string;
}, v: string): void  {
    style.transition = v;
    style.webkitTransition = v;
    style.MozTransition = v;
}

export function isVertical(tabBarPosition: string): boolean {
    return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getTransformByIndex(index: number, tabBarPosition: string): string {
    const translate = isVertical(tabBarPosition) ? 'translateY' : 'translateX';
    return `${translate}(${-index * 100}%) translateZ(0)`;
}

export function getMarginStyle(index: number, tabBarPosition: string): {[key: string]: string} {
    const marginDirection = isVertical(tabBarPosition) ? 'margin-top' : 'margin-left';
    return {
        [marginDirection]: `${-index * 100}%`
    };
}

export function getStyle(el: Element, property: string): number {
    return +window.getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

export function setPxStyle(el: {
    style: {
        transform: string;
        webkitTransform: string;
        mozTransform: string;
    };
}, value: string, vertical: string): void {
    value = vertical ? `0px, ${value}px, 0px` : `${value}px, 0px, 0px`;
    setTransform(el.style, `translate3d(${value})`);
}

export function getDataAttr(props: { [x: string]: any; }) {
    return Object.keys(props).reduce((prev: {[x: string]: any;}, key: string) => {
        if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
            prev[key] = props[key];
        }
        return prev;
    }, {});
}

function toNum(style: CSSStyleDeclaration, property: string): number {
    return +style.getPropertyValue(property).replace('px', '');
}

function getTypeValue(
    start: string,
    current: string,
    end: string,
    tabNode: {parentNode?: {childNodes: Record<string, unknown>}},
    wrapperNode: Element
) {
    let total = getStyle(wrapperNode, `padding-${start}`);
    if (!tabNode || !tabNode.parentNode) {
        return total;
    }

    const childNodes = tabNode.parentNode.childNodes;
    Array.prototype.some.call(childNodes, node => {
        if (node.nodeType !== 1) {
            return false;
        }
        const style = window.getComputedStyle(node);

        if (node !== tabNode) {
            total += toNum(style, `margin-${start}`);
            total += node[current];
            total += toNum(style, `margin-${end}`);

            if (style.boxSizing === 'content-box') {
                total += toNum(style, `border-${start}-width`) + toNum(style, `border-${end}-width`);
            }
            return false;
        }

        // We need count current node margin
        // ref: https://github.com/react-component/tabs/pull/139#issuecomment-431005262
        total += toNum(style, `margin-${start}`);

        return true;
    });

    return total;
}

export function getLeft(
    tabNode: Record<string, unknown>,
    wrapperNode: Element
) {
    return getTypeValue('left', 'offsetWidth', 'right', tabNode, wrapperNode);
}

export function getTop(
    tabNode: Record<string, unknown>,
    wrapperNode: Element
) {
    return getTypeValue('top', 'offsetHeight', 'bottom', tabNode, wrapperNode);
}
