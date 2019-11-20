/**
 * @file 组件 progress
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/progress-cn/
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import Icon from '../icon';

const prefixCls = classCreator('progress')();

const validProgress = progress => {
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

export const ProgressType = DataTypes.oneOf(['line', 'circle', 'dashboard']);
export const ProgressSize = DataTypes.oneOf(['default', 'small']);

const ProgressInfo = san.defineComponent({
    template: `
        <span class="${prefixCls}-text" title="{{text}}">
            {{text}}
            <s-icon s-if="showIcon" type="{{icon}}" theme="outlined"/>
        </span>
    `,
    components: {
        's-icon': Icon
    }
});

const ProgressCirle = san.defineComponent({
    template: `
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
    `,
    initData() {
        return {
            gapPosition: 'top'
        };
    },
    computed: {
        pathStyles() {
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
        pathString() {
            return this.data.get('pathStyles.pathString');
        },
        trailPathStyle() {
            return this.data.get('pathStyles.trailPathStyle');
        },
        strokePathStyle() {
            return this.data.get('pathStyles.strokePathStyle');
        }
    }
});

export default san.defineComponent({
    template: `
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
    `,
    dataTypes: {
        format: DataTypes.func,
        gapDegree: DataTypes.number,
        gapPosition: DataTypes.oneOf(['top', 'bottom', 'left', 'right']),
        percent: DataTypes.number,
        showInfo: DataTypes.bool,
        size: ProgressSize,
        status: DataTypes.oneOf(['success', 'active', 'exception']),
        strokeWidth: DataTypes.number,
        strokeLinecap: DataTypes.oneOf(['round', 'square']),
        strokeColor: DataTypes.string,
        successPercent: DataTypes.number,
        trailColor: DataTypes.string, // mark
        type: ProgressType,
        width: DataTypes.number
    },
    components: {
        's-info': ProgressInfo,
        's-circle': ProgressCirle
    },
    computed: {
        classes() {
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
        percentStyle() {
            const data = this.data;
            const lineWidth = data.get('lineWidth');
            const lineHeight = data.get('lineHeight');
            const strokeLinecap = data.get('strokeLinecap');
            const borderRadius = strokeLinecap === 'square' ? 0 : 100;

            return `width: ${lineWidth}; height: ${lineHeight}; border-radius: ${borderRadius}px;`;
        },
        successPercentStyle() {
            const data = this.data;
            const successPercent = data.get('successPercent');
            const lineHeight = data.get('lineHeight');
            const strokeLinecap = data.get('strokeLinecap');
            const borderRadius = strokeLinecap === 'square' ? 0 : 100;

            return `width: ${validProgress(successPercent)}%; height: ${lineHeight}; border-radius: ${borderRadius}px;`;
        },
        lineWidth() {
            return validProgress(this.data.get('percent')) + '%';
        },
        lineHeight() {
            const data = this.data;
            const size = data.get('size');
            const strokeWidth = data.get('strokeWidth');

            return `${strokeWidth || size === 'small' ? 6 : 8}px`;
        },
        progressStatus() {
            const data = this.data;
            const status = data.get('status');
            const percent = data.get('percent');
            const successPercent = data.get('successPercent');

            return parseInt((successPercent ? successPercent.toString() : percent.toString()), 10) >= 100
                && !status ? 'success' : (status || 'normal');
        },
        progressText() {
            const data = this.data;
            const format = data.get('format');
            const percent = data.get('percent');
            const successPercent = data.get('successPercent');
            const progressStatus = data.get('progressStatus');
            const textFormatter = format || (percentNumber => `${percentNumber}%`);
            let text = '';

            if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
                text = textFormatter(validProgress(percent), validProgress(successPercent));
            }

            return text;
        },
        progressIcon() {
            const data = this.data;
            const showInfo = data.get('showInfo');
            const type = data.get('type');
            const progressStatus = data.get('progressStatus');
            const iconType = (type === 'circle' || type === 'dashboard') ? '' : '-circle';
            const prefix = {
                exception: 'close',
                success: 'check'
            };
            const progressIcon = `${prefix[progressStatus]}${iconType}`;

            return showInfo && progressIcon;
        },
        showIcon() {
            const data = this.data;
            const progressText = data.get('progressText');
            const progressStatus = data.get('progressStatus');

            return !progressText && !!~['exception', 'success'].indexOf(progressStatus);
        },
        circleStyle() {
            const data = this.data;
            const circleSize = data.get('width') || 120;
            const fontSize = circleSize * 0.15 + 6;

            return `width: ${circleSize}px; height: ${circleSize}px; font-size: ${fontSize}px;`;
        },
        gapPos() {
            const gapPosition = this.data.get('gapPosition');
            const type = this.data.get('type');

            return gapPosition || (type === 'dashboard' && 'bottom') || 'top';
        },
        gapDeg() {
            const gapDegree = this.data.get('gapDegree');
            const type = this.data.get('type');

            return gapDegree || (type === 'dashboard' && 75);
        }
    },
    initData() {
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
});
