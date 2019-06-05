/**
 * @file Santd timepicker placements file
 * @author mayihui@baidu.com
 **/

const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const targetOffset = [0, 0];

export default {
    bottomLeft: {
        points: ['tl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, -3],
        targetOffset
    },
    bottomRight: {
        points: ['tr', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -3],
        targetOffset
    },
    topRight: {
        points: ['br', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 3],
        targetOffset
    },
    topLeft: {
        points: ['bl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 3],
        targetOffset
    }
};
