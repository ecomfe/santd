/**
 * @file raf polyfill
 * @author wangyongqing <wangyongqing01@baidu.com>
 */
type Prefixs = 'webkit' | 'moz' | 'ms';
type WindowWithCutomAnimationFrame = Window & {
    [key in Prefixs as `${key}RequestAnimationFrame`]: (callback: FrameRequestCallback) => number;
} & {
    [key in Prefixs as `${key}CancelAnimationFrame`]: (id: number | undefined) => void;
} & {
    [key in Prefixs as `${key}CancelRequestAnimationFrame`]: (id: number | undefined) => void;
}

const availablePrefixs = ['webkit', 'moz', 'ms'];

const windowWithAnimationFrame = window as unknown as WindowWithCutomAnimationFrame;

function requestAnimationFramePolyfill() {
    let lastTime = 0;
    return function (callback: FrameRequestCallback): number {
        const currTime = Date.now();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

export const cancelRequestAnimationFrame = (id: number) => {
    if (typeof window === 'undefined') {
        return null;
    }
    if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(id);
    }
    const prefix = availablePrefixs.filter(
        key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
    )[0] as Prefixs;

    return prefix
        ? (
            windowWithAnimationFrame[`${prefix}CancelAnimationFrame`]
            || windowWithAnimationFrame[`${prefix}CancelRequestAnimationFrame`]).call(this, id)
        : clearTimeout(id);
}

export default function getRequestAnimationFrame() {
    if (typeof window === 'undefined') {
        return () => {};
    }
    if (window.requestAnimationFrame) {
        // https://github.com/vuejs/vue/issues/4465
        return window.requestAnimationFrame.bind(window);
    }

    const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0] as Prefixs;
    return prefix ? windowWithAnimationFrame[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill();
}


