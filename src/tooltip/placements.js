/**
 * @file 位置函数
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];
export const colorList = {
    'pink': '#eb2f96',
    'red': '#f5222d',
    'yellow': '#fadb14',
    'orange': '#fa8c16',
    'cyan': '#13c2c2',
    'green': '#52c41a',
    'blue': '#1890ff',
    'purple': '#722ed1',
    'geekblue': '#2f54eb',
    'magenta': '#eb2f96',
    'volcano': '#fa541c',
    'gold': '#faad14',
    'lime': '#a0d911'
};
export default {
    left: {
        points: ['cr', 'cl'],
        overflow: autoAdjustOverflow,
        offset: [-4, 0],
        targetOffset,
        direction: 'left'
    },
    right: {
        points: ['cl', 'cr'],
        overflow: autoAdjustOverflow,
        offset: [4, 0],
        targetOffset,
        direction: 'right'
    },
    top: {
        points: ['bc', 'tc'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset,
        direction: 'top'
    },
    bottom: {
        points: ['tc', 'bc'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
        direction: 'bottom'
    },
    topLeft: {
        points: ['bl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset,
        direction: 'top'
    },
    leftTop: {
        points: ['tr', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [-4, 0],
        targetOffset,
        direction: 'left'
    },
    topRight: {
        points: ['br', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -4],
        targetOffset,
        direction: 'top'
    },
    rightTop: {
        points: ['tl', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [4, 0],
        targetOffset,
        direction: 'right'
    },
    bottomRight: {
        points: ['tr', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
        direction: 'bottom'
    },
    rightBottom: {
        points: ['bl', 'br'],
        overflow: autoAdjustOverflow,
        offset: [4, 0],
        targetOffset,
        direction: 'right'
    },
    bottomLeft: {
        points: ['tl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 4],
        targetOffset,
        direction: 'bottom'
    },
    leftBottom: {
        points: ['br', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [-4, 0],
        targetOffset,
        direction: 'left'
    }
};
