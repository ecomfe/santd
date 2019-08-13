/**
 * @file 组件 modal/Dialog
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://github.com/react-component/dialog
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import KeyCode from '../core/util/keyCode';
import {on, addClass, removeClass, getScrollBarSize} from '../core/util/dom';
import TransitionEvents from '../core/util/css-animation/Event';
import button from '../button';
import icon from '../icon';

export const filters = {
    css(style) {
        if (!style) {
            return '';
        }
        if (typeof style === 'string') {
            return style.replace(/\s+/g, '');
        }
        Object.keys(style).map(key => {
            // css样式传入的小驼峰转换为短横线
            if (/([A-Z])/g.test(key)) {
                const kebabKey = key.replace(/([A-Z])/g, m => `-${m.toLowerCase()}`);
                style[kebabKey] = style[key];
                delete style[key];
                return kebabKey;
            }
            return key;
        });
        return style;
    },
    mergeStyle(style, zIndex) {
        const zIndexStyle = zIndex ? `z-index:${zIndex};` : '';

        if (zIndexStyle) {
            if (/z-index/.test(style)) {
                style = style.replace(/z-index:\d;?/, zIndexStyle);
            }
            else {
                style += zIndexStyle;
            }
        }

        return style;
    }
};

const cc = classCreator('modal');
const prefixCls = cc();
const locale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};

let uuid = 0;
let openCount = 0;
let mousePosition = null;
let mousePositionEventBinded = false;
let bodyIsOverflowing;
let scrollbarWidth;

function getScroll(w, top) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = w.document;
        ret = d.documentElement[method];
        if (typeof ret !== 'number') {
            ret = d.body[method];
        }
    }
    return ret;
}

function setTransformOrigin(node, value) {
    const style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix => {
        style[`${prefix}TransformOrigin`] = value;
    });
    style.transformOrigin = value;
}

function offset(el) {
    const rect = el.getBoundingClientRect();
    const doc = el.ownerDocument;
    const w = doc.defaultView || doc.parentWindow;
    const pos = {
        left: rect.left + getScroll(w),
        top: rect.top + getScroll(w, true)
    };
    return pos;
}

// function multiEvent(element, event, handler) {
//     event.split(' ').forEach(e => {
//         on(element, e, handler);
//     });
// }

const sentinel = san.defineComponent({
    template: `
        <div tabindex="0" style="width:0px;height:0px;overflow:hidden;">{{type}}</div>
    `
});

export default san.defineComponent({
    template: `
        <template>
            <div s-if="mask && visible"
                s-transition="modalTrans(maskTransitionName)"
                class="${prefixCls}-mask"
                style="{{maskStyle | mergeStyle(zIndex)}}"></div>
            <div s-if="visible || inTransition"
                s-ref="wrap"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="{{title ? titleId : null}}"
                class="{{wrapClass}}"
                style="{{wrapStyle | css | mergeStyle(zIndex)}}"
                on-keydown="onKeydown"
                on-click="onMaskClick"
            >
                <div s-if="visible"
                    s-transition="modalTrans(transitionName, true)"
                    s-ref="dialog"
                    role="document"
                    class="{{dialogClass}}"
                    style="{{dialogStyle}}"
                >
                    <sentinel s-ref="sentinelStart" type="sentinelStart"/>
                    <div class="${prefixCls}-content">
                        <button s-if="closable" aria-label="Close" class="${prefixCls}-close" on-click="close">
                            <span class="${prefixCls}-close-x">
                                <s-icon class="${prefixCls}-close-icon" type="close"/>
                            </span>
                        </button>
                        <div s-if="title" s-ref="header" class="${prefixCls}-header">
                            <slot name="title">
                                <div class="${prefixCls}-title" id="{{titleId}}">{{title}}</div>
                            </slot>
                        </div>
                        <div s-ref="body" class="${prefixCls}-body" style="{{bodyStyle | css}}">
                            <slot/>
                        </div>
                        <div s-if="hasFooter" s-ref="footer" class="${prefixCls}-footer">
                            <slot name="footer"/>
                        </div>
                    </div>
                    <sentinel s-ref="sentinelEnd" type="sentinelEnd"/>
                </div>
            </div>
        </template>
    `,
    dataTypes: {
        test: DataTypes.any
    },
    components: {
        'sentinel': sentinel,
        's-button': button,
        's-icon': icon
    },
    computed: {
        wrapClass() {
            const wrapClassName = this.data.get('wrapClassName');
            return [`${prefixCls}-wrap`, wrapClassName];
        },
        dialogClass() {
            const className = this.data.get('className');
            return [prefixCls, className];
        },
        dialogStyle() {
            const width = this.data.get('width');
            const style = this.data.get('modalStyle');
            return `width: ${width}px; ${filters.css(style)}`;
        },
        titleId() {
            return `santdDialogTitle${uuid++}`;
        }
    },
    filters: {
        ...filters
    },
    modalTrans(transitionName, needCallback) {
        if (!transitionName) {
            return;
        }

        const callback = () => {
            this.data.set('inTransition', false);
            this.removeScrollingEffect();
            this.fire('afterClose');
        };

        return {
            enter(el, done) {
                const cls = [`${transitionName}-enter`, `${transitionName}-enter-active`].join(' ');
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            },
            leave(el, done) {
                const cls = [`${transitionName}-leave`, `${transitionName}-leave-active`].join(' ');
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    needCallback && callback();
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            }
        };
    },
    initData() {
        return {
            bodyStyle: {},
            maskStyle: {},
            mask: true,
            visible: false,
            keyboard: true,
            closable: true,
            maskClosable: true,
            destroyOnClose: false,
            width: 520,
            hasFooter: true,
            okType: 'primary',
            confirmloading: false,
            inTransition: false,
            locale
        };
    },
    inited() {
        this.watch('visible', val => {
            if (val) {
                this.addScrollingEffect();
                this.nextTick(() => {
                    this.afterMouseEvent();
                });
            }
            else {
                this.data.set('inTransition', true);
            }
        });
    },
    attached() {
        if (!mousePositionEventBinded) {
            // 只有点击事件支持从鼠标位置动画展开
            on(document.documentElement, 'click', e => {
                mousePosition = {
                    x: e.pageX,
                    y: e.pageY
                };
                // 100ms 内发生过点击事件，则从点击位置动画展示
                // 否则直接 zoom 展示
                // 这样可以兼容非点击方式展开
                setTimeout(() => (mousePosition = null), 100);
                // console.log('mousePositionEventBinded', mousePosition);
            });
            mousePositionEventBinded = true;
        }

        this.nextTick(() => {
            if (this.data.get('visible')) {
                this.addScrollingEffect();
                this.afterMouseEvent();
            }
        });
    },
    disposed() {
        this.removeScrollingEffect();
    },
    onMaskClick(e) {
        if (!this.data.get('maskClosable')) {
            return;
        }
        if (e.target === e.currentTarget) {
            this.close(e);
        }
    },
    onKeydown(e) {
        if (this.data.get('keyboard') && e.keyCode === KeyCode.ESC) {
            e.stopPropagation();
            this.close(e);
            return;
        }
        // keep focus inside dialog
        if (this.data.get('visible')) {
            if (e.keyCode === KeyCode.TAB) {
                const activeElement = document.activeElement;
                const sentinelStart = this.ref('sentinelStart');
                const sentinelEnd = this.ref('sentinelEnd');
                if (e.shiftKey) {
                    if (activeElement === sentinelStart) {
                        sentinelEnd.focus();
                    }
                }
                else if (activeElement === sentinelEnd) {
                    sentinelStart.focus();
                }
            }
        }
    },
    close(e) {
        const data = this.data;
        if (data.get('visible') !== undefined) {
            this.fire('close', e);
        }
        data.set('visible', false);
    },
    addScrollingEffect() {
        openCount++;
        if (openCount !== 1) {
            return;
        }
        this.checkScrollbar();
        this.setScrollbar();
        document.body.style.overflow = 'hidden';
    },
    removeScrollingEffect() {
        openCount--;
        if (openCount !== 0) {
            return;
        }
        document.body.style.overflow = '';
        this.resetScrollbar();
    },
    checkScrollbar() {
        let fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            const documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        if (bodyIsOverflowing) {
            scrollbarWidth = getScrollBarSize();
        }
    },
    setScrollbar() {
        if (bodyIsOverflowing && scrollbarWidth !== undefined) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    },
    resetScrollbar() {
        document.body.style.paddingRight = '';
    },
    tryFocus() {
        // wrap内的元素聚焦之后，wrap才能生效keydown事件监听
        const sentinelStart = this.ref('sentinelStart');
        sentinelStart.el && sentinelStart.el.focus();
    },
    afterMouseEvent() {
        this.tryFocus();
        const dialogNode = this.ref('dialog');
        if (mousePosition) {
            const elOffset = offset(dialogNode);
            const value = `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`;
            setTransformOrigin(dialogNode, value);
        }
        else {
            setTransformOrigin(dialogNode, '');
        }
    }
});
