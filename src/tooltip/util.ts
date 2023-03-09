/**
 * @file Santd tooltip util file
 * @author mayihui@baidu.com
 **/

import type * as I from './interface';
import {placements} from './placements';

const autoAdjustOverflowEnabled: I.AutoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
};

const autoAdjustOverflowDisabled: I.AutoAdjustOverflow = {
    adjustX: 0,
    adjustY: 0
};

const targetOffset: number[] = [0, 0];

export function getOverflowOptions(autoAdjustOverflow: boolean | Record<string, boolean>) {
    if (typeof autoAdjustOverflow === 'boolean') {
        return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
    }
    return {
        ...autoAdjustOverflowDisabled,
        ...autoAdjustOverflow
    };
}

export function getPlacements(config: I.Config) {
    const {
        arrowWidth = 5,
        horizontalArrowShift = 16,
        verticalArrowShift = 12,
        autoAdjustOverflow = true
    }: I.Config = config;

    const placementMap: I.PlacementMap = {
        left: {
            points: ['cr', 'cl'],
            offset: [-4, 0]
        },
        right: {
            points: ['cl', 'cr'],
            offset: [4, 0]
        },
        top: {
            points: ['bc', 'tc'],
            offset: [0, -4]
        },
        bottom: {
            points: ['tc', 'bc'],
            offset: [0, 4]
        },
        topLeft: {
            points: ['bl', 'tc'],
            offset: [-(horizontalArrowShift + arrowWidth), -4]
        },
        leftTop: {
            points: ['tr', 'cl'],
            offset: [-4, -(verticalArrowShift + arrowWidth)]
        },
        topRight: {
            points: ['br', 'tc'],
            offset: [horizontalArrowShift + arrowWidth, -4]
        },
        rightTop: {
            points: ['tl', 'cr'],
            offset: [4, -(verticalArrowShift + arrowWidth)]
        },
        bottomRight: {
            points: ['tr', 'bc'],
            offset: [horizontalArrowShift + arrowWidth, 4]
        },
        rightBottom: {
            points: ['bl', 'cr'],
            offset: [4, verticalArrowShift + arrowWidth]
        },
        bottomLeft: {
            points: ['tl', 'bc'],
            offset: [-(horizontalArrowShift + arrowWidth), 4]
        },
        leftBottom: {
            points: ['br', 'cl'],
            offset: [-4, verticalArrowShift + arrowWidth]
        }
    };

    Object.keys(placementMap).forEach(key => {
        placementMap[key] = config.arrowPointAtCenter
            ? {
                ...placementMap[key],
                overflow: getOverflowOptions(autoAdjustOverflow),
                targetOffset
            }
            : {
                ...placements[key],
                overflow: getOverflowOptions(autoAdjustOverflow)
            };

        placementMap[key].ignoreShake = true;
    });

    return placementMap;
}
