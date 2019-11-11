/**
 * @file Santd slider utils file
 **/

export function getMousePosition(vertical, e) {
    return vertical ? e.clientY : e.pageX;
}


export function getHandleCenterPosition(vertical, handle) {
    const coords = handle.getBoundingClientRect();
    return vertical
        ? coords.top + (coords.height * 0.5)
        : window.pageXOffset + coords.left + (coords.width * 0.5);
}