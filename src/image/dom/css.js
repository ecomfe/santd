/**
 * @file dom 工具函数
 */

/**
 * 获取元素 offsetLeft 和 offsetTeft
 */
export function getOffset(node) {
    const box = node.getBoundingClientRect();
    const docElem = document.documentElement;

    // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
    return {
        left:
            box.left
            + (window.pageXOffset || docElem.scrollLeft)
            - (docElem.clientLeft || document.body.clientLeft || 0),
        top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
    };
}

/**
 * 获取元素 clientHeight 和 clientWidth
 */
export function getClientSize() {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight;
    return {
        width,
        height
    };
}
