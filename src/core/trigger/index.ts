/**
 * @file Santd triger index file
 * @author mayihui@baidu.com
 **/

import Base from 'santd/base';
import {TransitionName} from '../util/animate';
import Popup from './popup';
import {contains} from './util';
import './style/index';

export interface Props {
    action?: string | string[];
    showAction?: string[];
    hideAction?: string[];
    getPopupClassNameFromAlign?: (align: any) => string;
    popupStyle?: string | Record<string, any>;
    prefixCls?: string;
    popupClassName?: string;
    // todo
    popupPlacement?: string;
    // todo
    builtinPlacements: Record<string, any>;
    popupTransitionName: TransitionName;
    popupAnimation?: Record<string, any>;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    focusDelay?: number;
    blurDelay?: number;
    zIndex?: number;
    getPopupContainer?: (el?: HTMLElement) => HTMLElement;
    // todo
    getDocument?: () => Document;
    destroyPopupOnHide?: boolean;
    mask?: boolean;
    maskClosable?: boolean;
    // todo
    popupAlign?: Record<string, any>;
    popupVisible?: boolean;
    defaultPopupVisible?: boolean;
    maskTransitionName?: TransitionName;
    maskAnimation?: string;
    alignPoint?: boolean;
    stretch?: string;
    useDomNodeForce?: boolean;
}

interface State {
    prefixCls: string;
    getPopupClassNameFromAlign: () => string;
    getDocument: () => Document;
    popupClassName: string;
    mouseEnterDelay: number;
    mouseLeaveDelay: number;
    focusDelay: number;
    blurDelay: number;
    popupStyle: string | Record<string, any>;
    destroyPopupOnHide: boolean;
    popupAlign: Record<string, any>;
    defaultPopupVisible: boolean;
    mask: boolean;
    maskClosable: boolean;
    action: string[];
    showAction: string[];
    hideAction: string[];
    show: boolean;
    state: Record<string, any>;
    useDomNodeForce: boolean;
}

interface Computed {
    getPopupAlign: () => Record<string, any>;
    getClassNameFromAlign: () => (align: any) => string;
}

interface Message {
    /* eslint-disable camelcase, @typescript-eslint/naming-convention */
    santd_popup_save: (this: Trigger, payload: {value: Base}) => void;
    santd_button_trigger: (this: Trigger, payload: {value: {e: any, action: 'handleFocus' | 'handleBlur'}}) => void;
    santd_popup_mouseEnter: (this: Trigger, payload: {value: MouseEvent}) => void;
    santd_popup_mouseLeave: (this: Trigger, payload: {value: MouseEvent}) => void;
    santd_popup_mouseDown: (this: Trigger, payload: {value: MouseEvent}) => void;
    /* eslint-enable camelcase, @typescript-eslint/naming-convention */
}



function isPointsEq(a1: string[], a2: string[], isAlignPoint?: boolean) {
    if (isAlignPoint) {
        return a1[0] === a2[0];
    }
    return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(
    builtinPlacements: Record<string, any>,
    placementStr: string, align: Record<string, any>
) {
    const baseAlign = builtinPlacements[placementStr] || {};
    return {
        ...baseAlign,
        ...align
    };
}

function getAlignPopupClassName(
    builtinPlacements: Record<string, any>,
    prefixCls: string, align: any,
    isAlignPoint?: boolean
) {
    const points = align.points;
    for (const placement in builtinPlacements) {
        if (builtinPlacements.hasOwnProperty(placement)) {
            if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
                return `${prefixCls}-placement-${placement}`;
            }
        }
    }
    return '';
}

let documentEventListener: void | null = null;

export default class Trigger extends Base<State, Props, Computed> {
    static computed: Computed = {
        getPopupAlign(this: Trigger) {
            const popupPlacement = this.data.get('popupPlacement');
            const popupAlign = this.data.get('popupAlign');
            const builtinPlacements = this.data.get('builtinPlacements');

            if (popupPlacement && builtinPlacements) {
                return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
            }
            return popupAlign;
        },
        getClassNameFromAlign(this: Trigger) {
            const alignFun = (align: any) => {
                const className = [];
                const popupPlacement = this.data.get('popupPlacement');
                const builtinPlacements = this.data.get('builtinPlacements');
                const prefixCls = this.data.get('prefixCls');
                const alignPoint = this.data.get('alignPoint');
                const getPopupClassNameFromAlign = this.data.get('getPopupClassNameFromAlign');

                if (popupPlacement && builtinPlacements) {
                    className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint));
                }
                if (getPopupClassNameFromAlign) {
                    className.push(getPopupClassNameFromAlign(align));
                }
                return className.join(' ');
            };
            return alignFun;
        }
    };

    static components = {
        's-popup': Popup
    };

    static messages: Message = {
        /* eslint-disable camelcase, @typescript-eslint/naming-convention */
        santd_popup_save(payload) {
            this.data.set('popupComponent', payload.value);
        },
        santd_button_trigger(payload) {
            const action = payload.value.action;
            const e = payload.value.e;
            if (this[action]) {
                this[action](e, true);
            }
        },
        santd_popup_mouseEnter() {
            // const e = payload.value;
            if (this.isMouseEnterToShow()) {
                this.handlePopupMouseEnter();
            }
        },
        santd_popup_mouseLeave(payload) {
            const e = payload.value;
            if (this.isMouseLeaveToHide()) {
                this.handlePopupMouseLeave(e);
            }
        },
        santd_popup_mouseDown() {
            this.handlePopupMouseDown();
        }
        /* eslint-enable camelcase, @typescript-eslint/naming-convention */
    };

    static template = /* html */ `<span
        on-click="handleClick"
        on-mousedown="handleMouseDown"
        on-touchstart="handleTouchStart"
        on-mouseenter="handleMouseEnter"
        on-mousemove="handleMouseMove"
        on-mouseleave="handleMouseLeave"
        on-contextmenu="handleContextMenu"
    >
        <slot />
    </span>`;

    delayTimer!: NodeJS.Timer | null;

    _container!: HTMLElement | null;

    _popup!: Popup | null;

    mouseDownTimeout!: NodeJS.Timer;

    initData(): State {
        return {
            prefixCls: 'trigger-popup',
            getPopupClassNameFromAlign() {
                return '';
            },
            getDocument() {
                return window.document;
            },
            popupClassName: '',
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0.1,
            focusDelay: 0,
            blurDelay: 0.15,
            popupStyle: {},
            destroyPopupOnHide: false,
            popupAlign: {},
            defaultPopupVisible: false,
            mask: false,
            maskClosable: true,
            action: [],
            showAction: [],
            hideAction: [],
            show: true,
            state: {},
            useDomNodeForce: false
        };
    }

    inited() {
        const popupVisible = this.data.get('visible') || this.data.get('defaultPopupVisible');
        this.data.set('popupVisible', popupVisible);

        const currentDocument = this.data.get('getDocument')();
        if (!documentEventListener) {
            documentEventListener = currentDocument.addEventListener('mousedown', this.handleDocumentClick.bind(this));
        }

        this.watch('popupVisible', val => {
            /* eslint-disable no-underscore-dangle */
            if (!this._container) {
                this.attachPopup();
            }
            this.nextTick(() => {
                this._popup?.data.set('visible', val);
            });
            /* eslint-enable no-underscore-dangle */
        });

        this.watch('visible', val => {
            this.data.set('popupVisible', val);
        });
    }
    attached() {
        if (this.data.get('popupVisible')) {
            this.attachPopup();
            /* eslint-disable no-underscore-dangle */
            this._popup?.data.set('visible', true);
            /* eslint-enable no-underscore-dangle */
        }
    }
    detached() {
        this.clearDelayTimer();
        this.removeContainer();
    }
    isClickToShow() {
        const action = this.data.get('action');
        const showAction = this.data.get('showAction');
        return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    }
    isClickToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    }
    isMouseEnterToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseEnter') !== -1;
    }
    isMouseLeaveToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    }
    isFocusToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('focus') !== -1 || hideAction.indexOf('focus') !== -1;
    }
    isBlurToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    }
    isContextMenuToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('contextMenu') !== -1 || hideAction.indexOf('contextMenu') !== -1;
    }
    setPopupVisible(visible: boolean, e?: MouseEvent | null) {
        const alignPoint = this.data.get('alignPoint');

        this.clearDelayTimer();

        if (this.data.get('popupVisible') !== visible) {
            // 如果没有外部传入的visible，设置当前的popVisible为visible，否则会进入visible的watch逻辑
            if (this.data.get('visible') === undefined) {
                this.data.set('popupVisible', visible);
            }
            this.fire('visibleChange', visible);
        }
        if (alignPoint && e) {
            this.setPoint(e);
        }
    }
    setPoint(e: MouseEvent) {
        const alignPoint = this.data.get('alignPoint');

        if (!e || !alignPoint) {
            return;
        }

        this.data.set('point', {
            pageX: e.pageX,
            pageY: e.pageY
        });
    }
    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }
    handleClick(e: MouseEvent, forceTrigger: boolean) {
        if (this.isClickToShow() || this.isClickToHide() || forceTrigger) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            const nextVisible = !this.data.get('popupVisible');

            if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
                this.setPopupVisible(nextVisible, e);
            }
        }
    }
    handleMouseDown(e: MouseEvent) {
        this.fire('mouseDown', e);
        this.data.set('preClickTime', Date.now());
    }
    handleTouchStart(e: TouchEvent) {
        this.fire('touchStart', e);
        this.data.set('preTouchTime', Date.now());
    }
    handleMouseEnter(e: MouseEvent, forceTrigger: boolean) {
        if (this.isMouseEnterToShow() || forceTrigger) {
            const mouseEnterDelay = this.data.get('mouseEnterDelay');
            this.fire('mouseEnter', e);
            if (mouseEnterDelay) {
                this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
            }
            else {
                this.setPopupVisible(true);
            }
        }
    }
    handleMouseMove(e: MouseEvent, forceTrigger: boolean) {
        const alignPoint = this.data.get('alignPoint');

        if ((this.isMouseEnterToShow() || forceTrigger) && alignPoint) {
            this.fire('mouseMove', e);
            this.setPoint(e);
        }
    }
    handleMouseLeave(e: MouseEvent) {
        if (this.isMouseLeaveToHide()) {
            this.fire('mouseLeave', e);
            const mouseLeaveDelay = this.data.get('mouseLeaveDelay');
            this.delaySetPopupVisible(false, mouseLeaveDelay);
        }
    }
    handleFocus(e: MouseEvent, forceTrigger: boolean) {
        if (this.isFocusToShow() || (forceTrigger && !this.isClickToShow())) {
            this.fire('focus', e);
            this.clearDelayTimer();
            this.data.set('focusTime', Date.now());
            this.delaySetPopupVisible(true, this.data.get('focusDelay'));
        }
    }
    handleBlur(e: MouseEvent, forceTrigger: boolean) {
        if (this.isBlurToHide() || (forceTrigger && !this.isClickToHide())) {
            this.fire('blur', e);
            this.clearDelayTimer();
            this.delaySetPopupVisible(false, this.data.get('blurDelay'));
        }
    }
    handleContextMenu(e: MouseEvent) {
        if (this.isContextMenuToShow()) {
            e.preventDefault();
            this.fire('contextMenu', e);
            this.setPopupVisible(true, e);
        }
    }
    handlePopupMouseEnter() {
        this.fire('popupMouseEnter');
        this.clearDelayTimer();
    }
    handlePopupMouseLeave(e: MouseEvent) {
        if (e.relatedTarget && contains(this.el as Element, e.relatedTarget as Element)) {
            return;
        }
        this.fire('popupMouseLeave');
        this.delaySetPopupVisible(false, this.data.get('mouseLeaveDelay'));
    }
    handlePopupMouseDown() {
        this.data.set('hasPopupMouseDown', true);

        clearTimeout(this.mouseDownTimeout);
        this.mouseDownTimeout = setTimeout(() => {
            this.data.set('hasPopupMouseDown', false);
        }, 0);
    }
    handleDocumentClick(e: MouseEvent) {
        const target = e.target as Element;
        const root = this.el as Element;
        const hasPopupMouseDown = this.data.get('hasPopupMouseDown');
        if (!contains(root, target) && !hasPopupMouseDown) {
            this.close(e);
        }
    }
    delaySetPopupVisible(visible: boolean, delayS: number, e?: MouseEvent | null) {
        const delay = delayS * 1000;
        this.clearDelayTimer();
        if (delay) {
            const point = e ? {pageX: e.pageX, pageY: e.pageY} : null;
            this.delayTimer = setTimeout(() => {
                this.setPopupVisible(visible, point as MouseEvent);
                this.clearDelayTimer();
            }, delay);
        }
        else {
            this.setPopupVisible(visible, e);
        }
    }
    close(e?: MouseEvent | null) {
        this.setPopupVisible(false, e);
    }
    getPopupDomNode() {
        const popupComponent = this.data.get('popupComponent');
        if (popupComponent) {
            return popupComponent.getPopupDomNode();
        }
        return null;
    }
    getContainer() {
        const getPopupContainer = this.data.get('getPopupContainer');
        const getDocument = this.data.get('getDocument');
        const popupContainer = document.createElement('div');

        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';

        const mountNode = getPopupContainer ? getPopupContainer(this.el as HTMLElement) : getDocument().body;
        mountNode.appendChild(popupContainer);

        return popupContainer;
    }
    getRootDomNode(rootDomNode?: HTMLElement) {
        const useDomNodeForce = this.data.get('useDomNodeForce');
        return rootDomNode || (!useDomNodeForce && this.el);
    }
    /* eslint-disable no-underscore-dangle */
    attachPopup() {

        this._container = this.getContainer();
        this._popup = new Popup({
            owner: this,
            source: `
                <x-popup
                    prefixCls="{{prefixCls}}"
                    getRootDomNode="{{getRootDomNode(rootDomNode)}}"
                    align="{{getPopupAlign}}"
                    transitionName="{{popupTransitionName}}"
                    getClassNameFromAlign="{{getClassNameFromAlign}}"
                    popupClassName="{{popupClassName}}"
                    popupStyle="{{popupStyle}}"
                    destroyPopupOnHide="{{destroyPopupOnHide}}"
                    stretch="{{stretch}}"
                >
                    <slot name="popup" />
                </x-popup>
            `
        });

        this._popup.attach(this._container);
    }
    removeContainer() {
        if (this._container) {
            /* eslint-disable no-unused-expressions */
            this._container.parentNode?.removeChild(this._container);
            /* eslint-enable no-unused-expressions */
            this._container = null;
            this._popup = null;
        }

    }
    refresh() {
        this._popup && this._popup.refresh();
    }
    /* eslint-enable no-underscore-dangle */
}
