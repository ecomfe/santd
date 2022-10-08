/**
 * @file 坐标工具函数
 */

import {getClientSize} from './dom/css';

/**
 * 获取元素 x 或 y 方向自身大小和容器大小比较后的偏移量
 */
function fixPoint(key, start, width, clientWidth) {
    const startAddWidth = start + width;
    const offsetStart = (width - clientWidth) / 2;
    if (width > clientWidth) {
        if (start > 0) {
            return {
                [key]: offsetStart
            };
        }
        if (start < 0 && startAddWidth < clientWidth) {
            return {
                [key]: -offsetStart
            };
        }
    } else if (start < 0 || startAddWidth > clientWidth) {
        return {
            [key]: start < 0 ? offsetStart : -offsetStart
        };
    }
    return {};
}

/**
 * Fix position x,y point when
 * Ele width && height < client
 * - Back origin
 * 修正节点的坐标，当其宽高未超过容器大小时，返回原点坐标
 * 如：
 * - Ele width | height > clientWidth | clientHeight
 * - left | top > 0 -> Back 0
 * - left | top + width | height < clientWidth | clientHeight -> Back left | top + width | height === clientWidth | clientHeight
 *
 * Regardless of other
 */
export default function getFixScaleEleTransPosition(width, height, left, top) {
    const {width: clientWidth, height: clientHeight} = getClientSize();

    let fixPos = null;

    if (width <= clientWidth && height <= clientHeight) {
        fixPos = {
            x: 0,
            y: 0
        };
    } else if (width > clientWidth || height > clientHeight) {
        fixPos = {
            ...fixPoint('x', left, width, clientWidth),
            ...fixPoint('y', top, height, clientHeight)
        };
    }

    return fixPos;
}
