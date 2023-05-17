/**
 * @file css animation file
 **/

import Event, {EventType} from './Event';
import {requestAnimationTimeout, cancelAnimationTimeout} from '../index';

type ListenerHandler = (e?: EventType) => void;

export type AnimateNode = HTMLElement & {
    rcAnimTimeout?: {id: number} | null;
    rcEndAnimTimeout?: NodeJS.Timeout | null;
    rcEndListener?: ListenerHandler | null;
}

export type TransitionName = string | {
    name: string;
    active: string;
}

type DefaultFun = () => void;
type EndCallbackObj = {
    end: DefaultFun;
    start: DefaultFun;
    active: DefaultFun;
};

type EndCallback = DefaultFun | EndCallbackObj;

function isCallbackObj(fun: EndCallback): fun is EndCallbackObj {
    return Object.prototype.toString.call(fun) === '[object Object]'
}

function isListenerFun(fun: AnimateNode['rcEndListener']):  fun is ListenerHandler {
    return fun !== undefined && fun !== null;
}

const isCssAnimationSupported = Event.endEvents.length !== 0;
const capitalPrefixes = ['Webkit',
    'Moz',
    'ms'] as const;
const prefixes = ['-webkit-', '-moz-', 'ms-', ''];

function getStyleProperty(node: HTMLElement, name: string) {
    // old ff need null, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
    const style = window.getComputedStyle(node, null);
    let ret = '';
    for (let i = 0; i < prefixes.length; i++) {
        ret = style.getPropertyValue(prefixes[i] + name);
        if (ret) {
            break;
        }

    }
    return (ret);
}

function fixBrowserByTimeout(node: AnimateNode) {
    if (isCssAnimationSupported) {
        const transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0;
        const transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0;
        const animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0;
        const animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0;
        const time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay);
        // sometimes, browser bug
        node.rcEndAnimTimeout = setTimeout(() => {
            node.rcEndAnimTimeout = null;
            if (node.rcEndListener) {
                node.rcEndListener();
            }
        }, (time) * 1000 + 200);
    }
}

function clearBrowserBugTimeout(node: AnimateNode) {
    if (node.rcEndAnimTimeout) {
        clearTimeout(node.rcEndAnimTimeout);
        node.rcEndAnimTimeout = null;
    }
}

const cssAnimation = (node: AnimateNode, transitionName: TransitionName, endCallback: EndCallback) => {
    const nameIsObj = typeof transitionName === 'object';
    const className = nameIsObj ? transitionName.name : transitionName;
    const activeClassName = nameIsObj ? transitionName.active : `${transitionName}-active`;
    let end: DefaultFun;
    let start: DefaultFun | null = null;
    let active: DefaultFun | null = null;
    const nodeClasses = node.classList;

    if (endCallback) {
        if (isCallbackObj(endCallback)) {
            end = endCallback.end;
            start = endCallback.start;
            active = endCallback.active;
        }
        else {
            end = endCallback;
        }
    }

    if (node.rcEndListener) {
        node.rcEndListener();
    }

    node.rcEndListener = e => {
        if (e && e.target !== node) {
            return;
        }

        if (node.rcAnimTimeout) {
            cancelAnimationTimeout(node.rcAnimTimeout);
            node.rcAnimTimeout = null;
        }

        clearBrowserBugTimeout(node);

        nodeClasses.remove(className);
        nodeClasses.remove(activeClassName);

        isListenerFun(node.rcEndListener) && Event.removeEndEventListener(node, node.rcEndListener);
        node.rcEndListener = null;

        // Usually this optional end is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (end) {
            end();
        }

    };

    Event.addEndEventListener(node, node.rcEndListener);

    if (start) {
        start();
    }

    nodeClasses.add(className);

    node.rcAnimTimeout = requestAnimationTimeout(() => {
        node.rcAnimTimeout = null;
        nodeClasses.add(activeClassName);
        if (active) {
            requestAnimationTimeout(active, 0);
        }

        fixBrowserByTimeout(node);
        // 30ms for firefox
    }, 30);

    return {
        stop() {
            if (node.rcEndListener) {
                node.rcEndListener();
            }

        }
    };
};

cssAnimation.style = (node: AnimateNode, style: string[], callback: () => void) => {
    if (node.rcEndListener) {
        node.rcEndListener();
    }

    node.rcEndListener = e => {
        if (e && e.target !== node) {
            return;
        }

        if (node.rcAnimTimeout) {
            cancelAnimationTimeout(node.rcAnimTimeout);
            node.rcAnimTimeout = null;
        }

        clearBrowserBugTimeout(node);

        isListenerFun(node.rcEndListener) && Event.removeEndEventListener(node, node.rcEndListener);
        node.rcEndListener = null;

        // Usually this optional callback is used for informing an owner of
        // a leave animation and telling it to remove the child.
        if (callback) {
            callback();
        }

    };

    Event.addEndEventListener(node, node.rcEndListener);

    node.rcAnimTimeout = requestAnimationTimeout(() => {
        for (const s in style) {
            if (style.hasOwnProperty(s)) {
                node.style[s] = style[s];
            }

        }
        node.rcAnimTimeout = null;
        fixBrowserByTimeout(node);
    }, 0);
};

cssAnimation.setTransition = (node: HTMLElement, p: string, value: string) => {
    let property: string = p;
    let v = value;
    if (value === undefined) {
        v = property;
        property = '';
    }

    property = property || '';
    capitalPrefixes.forEach(prefix => {
        // 做此类型转换，否则会报“因为索引表达式的类型不为 "number"”的类型错误
        node.style[`${prefix}Transition${property}` as unknown as number] = v;

    });
};

cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

export {isCssAnimationSupported};
export default cssAnimation;
