/**
 * @file 组件 spin
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/spin-cn/
 */

/* eslint-disable fecs-prefer-class */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';

const prefixCls = classCreator('spin')();

// 默认加载器指示符
let defaultIndicator = null;

// 加载器尺寸
const SpinSize = DataTypes.oneOf(['small', 'default', 'large']);

function shouldDelay(spinning, delay) {
    return !!spinning && !!delay && !isNaN(Number(delay));
}

// 判断是否SanComponent, 可能会随着san的版本迭代变更，参考依据如下：
// https://github.com/baidu/san/blob/36085399ab3d84df3ff8b741bb2f57c483b59acb/src/view/node-type.js
// https://github.com/baidu/san/blob/9a7cd2e74ecd4f307afd1733aa5b745707edc0c9/src/view/component.js#L278
function isValidComponent(content) {
    if (typeof content === 'function' && 5 === content.prototype.nodeType) {
        return true;
    }

    return false;
}

const SpinDot = san.defineComponent({
    template: `
        <span class="san-spin-dot san-spin-dot-spin">
            <i/>
            <i/>
            <i/>
            <i/>
        </span>
    `
});

const SpinTip = san.defineComponent({
    template: `
        <div class="${prefixCls}-text">{{tip}}</div>
    `
});

const IndicatorLoader = san.createComponentLoader(() => {
    const promise = new Promise(resolve => {
        resolve(isValidComponent(defaultIndicator) ? defaultIndicator : SpinDot);
    });
    return promise;
});

const Spin = san.defineComponent({
    template: `
        <div class="{{nestedClassName || spinClassName}}">
            <slot s-if="!hasContent" name="indicator">
                <indicator/>
            </slot>
            <spin-tip s-if="!hasContent" tip="{{tip}}"/>
            <div s-if="hasContent && currentSpinning">
                <div class="{{spinClassName}}">
                    <slot name="indicator">
                        <indicator/>
                    </slot>
                    <spin-tip tip="{{tip}}"/>
                </div>
            </div>
            <div class="{{containerClassName}}">
                <slot name="content"/>
            </div>
        </div>
    `,
    dataTypes: {
        delay: DataTypes.number,
        indicator: DataTypes.any,
        size: SpinSize,
        spinning: DataTypes.bool,
        tip: DataTypes.string,
        wrapperClassName: DataTypes.string
    },
    components: {
        'indicator': IndicatorLoader, // san >= 3.7
        'spin-tip': SpinTip
    },
    computed: {
        spinClassName() {
            const data = this.data;
            const size = data.get('size');
            const currentSpinning = data.get('currentSpinning');
            const tip = data.get('tip');
            let classArr = [prefixCls];
            size === 'small' && classArr.push(`${prefixCls}-sm`);
            size === 'large' && classArr.push(`${prefixCls}-lg`);
            currentSpinning && classArr.push(`${prefixCls}-spinning`);
            !!tip && classArr.push(`${prefixCls}-show-text`);
            return classArr;
        },
        nestedClassName() {
            const data = this.data;
            const hasContent = data.get('hasContent');
            const wrapperClassName = data.get('wrapperClassName');
            let classArr = [`${prefixCls}-nested-loading`];
            !!wrapperClassName && classArr.push(wrapperClassName);
            return hasContent || classArr;
        },
        containerClassName() {
            const data = this.data;
            const currentSpinning = data.get('currentSpinning');
            let classArr = [`${prefixCls}-container`];
            currentSpinning && classArr.push(`${prefixCls}-blur`);
            return classArr;
        },
        currentSpinning() {
            const data = this.data;
            const delay = data.get('delay');
            const spinning = data.get('spinning');

            return spinning && !shouldDelay(spinning, delay);
        }
    },
    initData() {
        return {
            hasContent: false,
            size: 'default',
            spinning: true
        };
    },
    inited() {
        const data = this.data;
        const delay = data.get('delay');
        const currentSpinning = data.get('currentSpinning');

        this.watch('spinning', spinning => {
            if (currentSpinning === spinning) {
                return;
            }

            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }
            if (currentSpinning && !spinning) {
                this.debounceTimeout = window.setTimeout(() => {
                    data.set('currentSpinning', spinning);
                }, 200);
                if (this.delayTimeout) {
                    clearTimeout(this.delayTimeout);
                }
            }
            else {
                if (shouldDelay(spinning, delay)) {
                    if (this.delayTimeout) {
                        clearTimeout(this.delayTimeout);
                    }
                    this.delayTimeout = window.setTimeout(this.delayUpdateSpinning.bind(this), delay);
                }
                else {
                    data.set('currentSpinning', spinning);
                }
            }
        });
    },
    attached() {
        const innerContent = this.slot('content')[0];

        if (innerContent && innerContent.isInserted) {
            this.data.set('hasContent', true);
        }
    },
    delayUpdateSpinning() {
        const data = this.data;
        const spinning = data.get('spinning');
        const currentSpinning = data.get('currentSpinning');

        if (currentSpinning !== spinning) {
            data.set('currentSpinning', spinning);
        }
    },
    debounceTimeout: null,
    delayTimeout: null
});

Spin.setDefaultIndicator = indicator => {
    defaultIndicator = indicator;
};

export default Spin;
