/**
 * @file 组件 progress
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/progress-cn/
 */

import './style/index.less';
import * as I from './interface';
import Base from 'santd/base';
import san from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';

const prefixCls = classCreator('progress')();

const validProgress = (progress: number) => {
    if (!progress || progress < 0) {
        return 0;
    }
    if (progress > 100) {
        return 100;
    }
    return progress;
};

const statusColorMap = {
    normal: '#108ee9',
    exception: '#ff5500',
    success: '#87d068'
};

const ProgressInfo = san.defineComponent({
    template: `
        <span class="${prefixCls}-text" title="{{text}}">
            {{text}}
            <s-icon s-if="showIcon" type="{{icon}}" theme="outlined"/>
        </span>
    `,
    components: {
        's-icon': Icon as unknown as Element
    }
});

class ProgressCirle extends Base<I.ProgressCirleState, I.ProgressCirleProps, I.ProgressCirleComputed> {
    static template = /* html */ `
        <svg
            class="${prefixCls}-circle"
            viewBox="0 0 100 100"
            style="{{style}}"
        >
            <path
                class="${prefixCls}-circle-trail"
                d="{{pathString}}"
                stroke="{{trailColor}}"
                stroke-width="{{trailWidth || strokeWidth}}"
                fill-opacity="0"
                style="{{trailPathStyle}}"
            >
            </path>
            <path
                class="${prefixCls}-circle-path"
                d="{{pathString}}"
                stroke-linecap="{{strokeLinecap}}"
                stroke-width="{{percent === 0 ? 0 : strokeWidth}}"
                fill-opacity="0"
                style="{{strokePathStyle}}"
            >
            </path>
        </svg>
    `;

    initData(): I.ProgressCirleState {
        return {
            gapPosition: 'top'
        };
    }

    static computed: I.ProgressCirleComputed = {
        pathStyles(this: ProgressCirle) {
            const data = this.data;
            const percent = validProgress(data.get('percent'));
            const strokeWidth = data.get('strokeWidth');
            const strokeColor = data.get('strokeColor');
            const gapDegree = data.get('gapDegree') || 0;
            const gapPosition = data.get('gapPosition');
            const radius = 50 - (strokeWidth / 2);
            const len = Math.PI * 2 * radius;
            let beginPositionX = 0;
            let beginPositionY = -radius;
            let endPositionX = 0;
            let endPositionY = -2 * radius;

            switch (gapPosition) {
                case 'left':
                    beginPositionX = -radius;
                    beginPositionY = 0;
                    endPositionX = 2 * radius;
                    endPositionY = 0;
                    break;
                case 'right':
                    beginPositionX = radius;
                    beginPositionY = 0;
                    endPositionX = -2 * radius;
                    endPositionY = 0;
                    break;
                case 'bottom':
                    beginPositionY = radius;
                    endPositionY = 2 * radius;
                    break;
                default:
            }

            const pathString = `
                M 50,50 m ${beginPositionX},
                ${beginPositionY} a ${radius},
                ${radius} 0 1 1 ${endPositionX},
                ${-endPositionY} a ${radius},
                ${radius} 0 1 1 ${-endPositionX},
                ${endPositionY}
            `;
            const trailPathStyle = `
                stroke-dasharray: ${len - gapDegree}px ${len}px;
                stroke-dashoffset: -${gapDegree / 2}px;
                transition: stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s;
            `;
            const strokePathStyle = `
                stroke: ${strokeColor};
                stroke-dasharray: ${(percent / 100) * (len - gapDegree)}px ${len}px;
                stroke-dashoffset: -${gapDegree / 2}px;
                transition: stroke-dashoffset .3s ease 0s,
                    stroke-dasharray .3s ease 0s, stroke .3s,
                    stroke-width .06s ease .3s;
            `;

            return {
                pathString,
                trailPathStyle,
                strokePathStyle
            };
        },
        pathString(this: ProgressCirle) {
            return this.data.get('pathStyles.pathString');
        },
        trailPathStyle(this: ProgressCirle) {
            return this.data.get('pathStyles.trailPathStyle');
        },
        strokePathStyle(this: ProgressCirle) {
            return this.data.get('pathStyles.strokePathStyle');
        }
    }
};

export default class Progress extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div class="{{classes}}">
            <template s-if="type === 'line'">
                <div class="${prefixCls}-outer">
                    <div class="${prefixCls}-inner">
                        <div class="${prefixCls}-bg" style="{{percentStyle}}"></div>
                        <div
                            s-if="successPercent !== undefined"
                            class="${prefixCls}-success-bg"
                            style="{{successPercentStyle}}"
                        ></div>
                    </div>
                </div>
                <s-info
                    s-if="{{showInfo}}"
                    text="{{progressText}}"
                    icon="{{progressIcon}}"
                    showIcon="{{showIcon}}"
                />
            </template>
            <template s-elif="type === 'circle' || type === 'dashboard'">
                <div class="${prefixCls}-inner" style="{{circleStyle}}">
                    <s-circle
                        percent="{{percent}}"
                        strokeWidth="{{strokeWidth || 6}}"
                        trailWidth="{{strokeWidth || 6}}"
                        strokeColor="{{strokeColor || statusColorMap[progressStatus]}}"
                        strokeLinecap="{{strokeLinecap}}"
                        trailColor="{{trailColor}}"
                        gapDegree="{{gapDeg}}"
                        gapPosition="{{gapPos}}"
                    />
                    <s-info
                        s-if="{{showInfo}}"
                        text="{{progressText}}"
                        icon="{{progressIcon}}"
                        showIcon="{{showIcon}}"
                    />
                </div>
            </template>
        </div>
    `;

    static components = {
        's-info': ProgressInfo,
        's-circle': ProgressCirle
    };

    static computed = {
        classes(this: Progress) {
            const data = this.data;
            const size = data.get('size');
            const showInfo = data.get('showInfo');
            const type = data.get('type');
            const progressStatus = data.get('progressStatus');
            let classArr = [prefixCls, `${prefixCls}-${type === 'dashboard' && 'circle' || type}`, `${prefixCls}-status-${progressStatus}`];
            showInfo && classArr.push(`${prefixCls}-show-info`);
            size && classArr.push(`${prefixCls}-${size}`);
            return classArr;
        },
        percentStyle(this: Progress) {
            const data = this.data;
            const lineWidth = data.get('lineWidth');
            const lineHeight = data.get('lineHeight');
            const strokeLinecap = data.get('strokeLinecap');
            const borderRadius = strokeLinecap === 'square' ? 0 : 100;

            return `width: ${lineWidth}; height: ${lineHeight}; border-radius: ${borderRadius}px;`;
        },
        successPercentStyle(this: Progress) {
            const data = this.data;
            const successPercent = data.get('successPercent');
            const lineHeight = data.get('lineHeight');
            const strokeLinecap = data.get('strokeLinecap');
            const borderRadius = strokeLinecap === 'square' ? 0 : 100;

            return `width: ${validProgress(successPercent)}%; height: ${lineHeight}; border-radius: ${borderRadius}px;`;
        },
        lineWidth(this: Progress) {
            return validProgress(this.data.get('percent')) + '%';
        },
        lineHeight(this: Progress) {
            const data = this.data;
            const size = data.get('size');
            const strokeWidth = data.get('strokeWidth');

            return `${strokeWidth || size === 'small' ? 6 : 8}px`;
        },
        progressStatus(this: Progress) {
            const data = this.data;
            const status = data.get('status');
            const percent = data.get('percent');
            const successPercent = data.get('successPercent');

            return parseInt((successPercent ? successPercent.toString() : percent.toString()), 10) >= 100
                && !status ? 'success' : (status || 'normal');
        },
        progressText(this: Progress) {
            const data = this.data;
            const format = data.get('format');
            const percent = data.get('percent');
            const successPercent = data.get('successPercent');
            const progressStatus = data.get('progressStatus');
            const textFormatter = format || ((percentNumber: number) => `${percentNumber}%`);
            let text = '';

            if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
                text = textFormatter(validProgress(percent), validProgress(successPercent));
            }

            return text;
        },
        progressIcon(this: Progress) {
            const data = this.data;
            const showInfo = data.get('showInfo');
            const type = data.get('type');
            const progressStatus = data.get('progressStatus');
            const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
            const prefix = {
                exception: 'close',
                success: 'check'
            };
            const progressIcon = `${(prefix as any)[progressStatus]}${iconType}`;

            return showInfo && progressIcon;
        },
        showIcon(this: Progress) {
            const data = this.data;
            const progressText = data.get('progressText');
            const progressStatus = data.get('progressStatus');

            return !progressText && !!~['exception', 'success'].indexOf(progressStatus);
        },
        circleStyle(this: Progress) {
            const data = this.data;
            const circleSize = data.get('width') || 120;
            const fontSize = circleSize * 0.15 + 6;

            return `width: ${circleSize}px; height: ${circleSize}px; font-size: ${fontSize}px;`;
        },
        gapPos(this: Progress) {
            const gapPosition = this.data.get('gapPosition');
            const type = this.data.get('type');

            return gapPosition || (type === 'dashboard' && 'bottom') || 'top';
        },
        gapDeg(this: Progress) {
            const gapDegree = this.data.get('gapDegree');
            const type = this.data.get('type');

            return gapDegree || (type === 'dashboard' && 75);
        }
    }
    initData(): I.State {
        return {
            percent: 0,
            showInfo: true,
            size: 'default',
            strokeLinecap: 'round',
            successPercent: 0,
            trailColor: '#f3f3f3',
            type: 'line',
            width: 132,
            statusColorMap
        };
    }
};
