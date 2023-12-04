/**
 * @file 组件 modal/Dialog
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://github.com/react-component/dialog
 */

import './style/index.less';
import * as I from './interface';
import Base from 'santd/base';
import san from 'san';
import {classCreator} from '../core/util';
import KeyCode from '../core/util/keyCode';
import {getScrollBarSize, on, addClass, removeClass} from '../core/util/dom';
import TransitionEvents from '../core/util/css-animation/Event';
import button from '../button';

interface TElement extends HTMLElement {
    focus: () => void;
    el?: TElement;
};

export const filters = {
    css(style: I.styleType | string): string | I.styleType {
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
    mergeStyle(style: string, zIndex: number): string {
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

const prefixCls = classCreator('modal')();
const locale = {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了'
};

let uuid: number = 0;
let openCount: number = 0;
let mousePosition: null | {x: number; y: number} = null;
let mousePositionEventBinded: boolean = false;
let bodyIsOverflowing: boolean;
let scrollbarWidth: number;

function getScroll(w: Window, top?: boolean) {
    let ret = w[`page${top ? 'Y' : 'X'}Offset`];
    const method = `scroll${top ? 'Top' : 'Left'}`;
    if (typeof ret !== 'number') {
        const d = w.document;
        const doc = d.documentElement;
        // 如果as Document，会报错元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "Document"。
        ret = (doc as any)[method];
        if (typeof ret !== 'number') {
            const bo = d.body;
            // 同理
            ret = (bo as any)[method];
        }
    }
    return ret;
}

function setTransformOrigin(node: HTMLElement, value: string) {
    const style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix => {
        (style as any)[`${prefix}TransformOrigin`] = value;
    });
    style.transformOrigin = value;
}

function offset(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const doc: I.TDocument = el.ownerDocument;
    const w = doc.defaultView || doc.parentWindow;
    const pos = {
        left: rect.left + getScroll(w!)!,
        top: rect.top + getScroll(w!, true)!,
    };
    return pos;
}

const sentinel = san.defineComponent({
    template: `
        <div tabindex="0" style="width:0px;height:0px;overflow:hidden;">{{type}}</div>
    `
});

export default class Dialog extends Base<I.DialogState, I.DialogProps, I.DialogComputed> {
    static template = /* html */ `
        <template>
            <div s-if="{{mask && visible}}"
                s-transition="modalTrans(maskTransitionName)"
                class="${prefixCls}-mask"
                style="{{maskStyle | mergeStyle(zIndex)}}"></div>
            <div s-if="{{visible || inTransition}}"
                s-ref="wrap"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="{{title ? titleId : null}}"
                class="${prefixCls}-wrap {{wrapClassName}}"
                style="{{wrapStyle | css | mergeStyle(zIndex)}}"
                on-keydown="onKeydown"
                on-click="onMaskClick"
            >
                <div s-if="{{visible}}"
                    s-transition="modalTrans(transitionName, true)"
                    s-ref="dialog"
                    role="document"
                    class="${prefixCls} {{className}}"
                    style="{{dialogStyle(width, modalStyle)}}"
                >
                    <sentinel s-ref="sentinelStart" type="sentinelStart"/>
                    <div class="${prefixCls}-content">
                        <button s-if="{{closable}}" aria-label="Close" class="${prefixCls}-close" on-click="close">
                            <slot name="closeIcon"/>
                        </button>
                        <div s-if="{{title}}" s-ref="header" class="${prefixCls}-header">
                            <slot name="title">
                                <div class="${prefixCls}-title" id="{{titleId}}">{{title}}</div>
                            </slot>
                        </div>
                        <div s-ref="body" class="${prefixCls}-body" style="{{bodyStyle | css}}">
                            <slot/>
                        </div>
                        <div s-if="{{hasFooter}}" s-ref="footer" class="${prefixCls}-footer">
                            <slot name="footer"/>
                        </div>
                    </div>
                    <sentinel s-ref="sentinelEnd" type="sentinelEnd"/>
                </div>
            </div>
        </template>
    `;

    static components = {
        'sentinel': sentinel,
        's-button': button
    }

    static filters = {
        ...filters
    }

    dialogStyle(width: number, modalStyle: I.styleType | string) {
        return `width: ${width}px; ${filters.css(modalStyle)}`;
    }

    modalTrans(transitionName: string, needCallback: boolean) {
        if (!transitionName) {
            return;
        }

        const callback = () => {
            this.data.set('inTransition', false);
            this.removeScrollingEffect();
            this.fire('afterClose');
        };

        return {
            enter(el: HTMLElement, done: () => void) {
                const cls = [`${transitionName}-enter`, `${transitionName}-enter-active`].join(' ');
                const end = () => {
                    TransitionEvents.removeEndEventListener(el, end);
                    removeClass(el, cls);
                    done();
                };
                TransitionEvents.addEndEventListener(el, end);
                addClass(el, cls);
            },
            leave(el: HTMLElement, done: () => void) {
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
    }

    initData(): I.DialogState {
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
            titleId: `santdDialogTitle${uuid++}`,
            locale
        };
    }

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
    }

    attached() {
        if (!mousePositionEventBinded) {
            // 只有点击事件支持从鼠标位置动画展开
            on((document as unknown as I.TListenerElement).documentElement, 'click', (e: MouseEvent) => {
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
    }

    disposed() {
        this.removeScrollingEffect();
    }

    onMaskClick(e: MouseEvent) {
        if (!this.data.get('maskClosable')) {
            return;
        }
        if (e.target === e.currentTarget) {
            this.close(e);
        }
    }

    onKeydown(e: KeyboardEvent) {
        if (this.data.get('keyboard') && e.keyCode === KeyCode.ESC) {
            e.stopPropagation();
            this.close(e);
            return;
        }
        // keep focus inside dialog
        if (this.data.get('visible')) {
            if (e.keyCode === KeyCode.TAB) {
                const activeElement = document.activeElement;
                const sentinelStart = this.ref('sentinelStart') as unknown as TElement;
                const sentinelEnd = this.ref('sentinelEnd') as unknown as TElement;
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
    }

    close(e: MouseEvent | KeyboardEvent) {
        const data = this.data;
        if (data.get('visible') !== undefined) {
            this.fire('close', e);
        }
        data.set('visible', false);
    }

    addScrollingEffect() {
        openCount++;
        if (openCount !== 1) {
            return;
        }
        this.checkScrollbar();
        this.setScrollbar();
        document.body.style.overflow = 'hidden';
    }

    removeScrollingEffect() {
        openCount--;
        if (openCount !== 0) {
            return;
        }
        document.body.style.overflow = '';
        this.resetScrollbar();
    }

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
    }

    setScrollbar() {
        if (bodyIsOverflowing && scrollbarWidth !== undefined) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
    }

    resetScrollbar() {
        document.body.style.paddingRight = '';
    }

    tryFocus() {
        // wrap内的元素聚焦之后，wrap才能生效keydown事件监听
        const sentinelStart = this.ref('sentinelStart') as unknown as TElement;
        sentinelStart.el && sentinelStart.el.focus();
    }

    afterMouseEvent() {
        this.tryFocus();
        const dialogNode = this.ref('dialog') as unknown as HTMLElement;
        if (mousePosition) {
            const elOffset = offset(dialogNode);
            const value = `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`;
            setTransformOrigin(dialogNode, value);
        }
        else {
            setTransformOrigin(dialogNode, '');
        }
    }
};
