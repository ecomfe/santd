/**
 * @file Santd trigger utils index file
 * @author mayihui@baidu.com
 **/

export function contains(root: Element, n: Element | null) {
    let node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode as Element;
    }

    return false;
}

export function buffer(fn: () => void, ms: number) {
    let timer: NodeJS.Timer | null;

    function clear() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    function bufferFn() {
        clear();
        timer = setTimeout(fn, ms);
    }

    bufferFn.clear = clear;

    return bufferFn;
}

// 说明：若声明next 为 MouseEvent，则clientX的判断逻辑不执行，且 next类型会强制变为 never
export function isSamePoint(prev: MouseEvent, next: any) {
    if (prev === next) {
        return true;
    }
    if (!prev || !next) {
        return false;
    }

    if ('pageX' in next && 'pageY' in next) {
        return prev.pageX === next.pageX && prev.pageY === next.pageY;
    }

    if ('clientX' in next && 'clientY' in next) {
        return prev.clientX === next.clientX && prev.clientY === next.clientY;
    }

    return false;
}

export function isWindow(obj: Record<string, any>) {
    return obj && typeof obj === 'object' && obj.window === obj;
}

export function isSimilarValue(val1: number, val2: number) {
    const int1 = Math.floor(val1);
    const int2 = Math.floor(val2);
    return Math.abs(int1 - int2) <= 1;
}

export function restoreFocus(activeElement: HTMLElement | null, container: Element) {
    // Focus back if is in the container
    if (activeElement !== document.activeElement && contains(container, activeElement)) {
        activeElement?.focus();
    }
}
