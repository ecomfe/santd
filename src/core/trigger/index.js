/**
 * @file Santd triger index file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Popup from './popup';
import {contains} from './util';
import './style/index';

function isPointsEq(a1, a2, isAlignPoint) {
    if (isAlignPoint) {
        return a1[0] === a2[0];
    }
    return a1[0] === a2[0] && a1[1] === a2[1];
}

function getAlignFromPlacement(builtinPlacements, placementStr, align) {
    const baseAlign = builtinPlacements[placementStr] || {};
    return {
        ...baseAlign,
        ...align
    };
}

function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
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

let documentEventListener = null;

export default san.defineComponent({
    dataTypes: {
        action: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        showAction: DataTypes.array,
        hideAction: DataTypes.array,
        getPopupClassNameFromAlign: DataTypes.func,
        popupStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        prefixCls: DataTypes.string,
        popupClassName: DataTypes.string,
        popupPlacement: DataTypes.string,
        builtinPlacements: DataTypes.object,
        popupTransitionName: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        popupAnimation: DataTypes.object,
        mouseEnterDelay: DataTypes.number,
        mouseLeaveDelay: DataTypes.number,
        zIndex: DataTypes.number,
        focusDelay: DataTypes.number,
        blurDelay: DataTypes.number,
        getPopupContainer: DataTypes.func,
        getDocument: DataTypes.func,
        destroyPopupOnHide: DataTypes.bool,
        mask: DataTypes.bool,
        maskClosable: DataTypes.bool,
        popupAlign: DataTypes.object,
        popupVisible: DataTypes.bool,
        defaultPopupVisible: DataTypes.bool,
        maskTransitionName: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        maskAnimation: DataTypes.string,
        alignPoint: DataTypes.bool
    },
    initData() {
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
            state: {}
        };
    },
    computed: {
        getPopupAlign() {
            const popupPlacement = this.data.get('popupPlacement');
            const popupAlign = this.data.get('popupAlign');
            const builtinPlacements = this.data.get('builtinPlacements');

            if (popupPlacement && builtinPlacements) {
                return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
            }
            return popupAlign;
        },
        getClassNameFromAlign() {
            const that = this;
            return function (align) {
                const className = [];
                const popupPlacement = that.data.get('popupPlacement');
                const builtinPlacements = that.data.get('builtinPlacements');
                const prefixCls = that.data.get('prefixCls');
                const alignPoint = that.data.get('alignPoint');
                const getPopupClassNameFromAlign = that.data.get('getPopupClassNameFromAlign');

                if (popupPlacement && builtinPlacements) {
                    className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint));
                }
                if (getPopupClassNameFromAlign) {
                    className.push(getPopupClassNameFromAlign(align));
                }
                return className.join(' ');
            };
        }
    },
    inited() {
        const popupVisible = this.data.get('visible') || this.data.get('defaultPopupVisible');
        this.data.set('popupVisible', popupVisible);

        const currentDocument = this.data.get('getDocument')();
        if (!documentEventListener) {
            documentEventListener = currentDocument.addEventListener('mousedown', this.handleDocumentClick.bind(this));
        }

        this.watch('popupVisible', val => {
            if (!this._container) {
                this.attachPopup();
            }
            this._popup.data.set('visible', val);
        });

        this.watch('visible', val => {
            this.data.set('popupVisible', val);
        });
    },
    attached() {
        if (this.data.get('popupVisible')) {
            this.attachPopup();
            this._popup.data.set('visible', true);
        }
    },
    detached() {
        this.clearDelayTimer();
        this.removeContainer();
    },
    isClickToShow() {
        const action = this.data.get('action');
        const showAction = this.data.get('showAction');
        return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    },
    isClickToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    },
    isMouseEnterToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseEnter') !== -1;
    },
    isMouseLeaveToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    },
    isFocusToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('focus') !== -1 || hideAction.indexOf('focus') !== -1;
    },
    isBlurToHide() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    },
    isContextMenuToShow() {
        const action = this.data.get('action');
        const hideAction = this.data.get('hideAction');
        return action.indexOf('contextMenu') !== -1 || hideAction.indexOf('contextMenu') !== -1;
    },
    setPopupVisible(visible, e) {
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
            this.setpoint(e);
        }
    },
    setPoint(e) {
        const alignPoint = this.data.get('alignPoint');

        if (!e || !alignPoint) {
            return;
        }

        this.data.set('point', {
            pageX: e.pageX,
            pageY: e.pageY
        });
    },
    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    },
    handleClick(e, forceTrigger) {
        if (this.isClickToShow() || this.isClickToHide() || forceTrigger) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            const nextVisible = !this.data.get('popupVisible');

            if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
                this.setPopupVisible(nextVisible, e);
            }
        }
    },
    handleMouseDown(e) {
        this.fire('mouseDown', e);
        this.data.set('preClickTime', Date.now());
    },
    handleTouchStart(e) {
        this.fire('touchStart', e);
        this.data.set('preTouchTime', Date.now());
    },
    handleMouseEnter(e, forceTrigger) {
        if (this.isMouseEnterToShow() || forceTrigger) {
            const mouseEnterDelay = this.data.get('mouseEnterDelay');
            this.fire('mouseEnter', e);
            mouseEnterDelay
                ? this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e)
                : this.setPopupVisible(true);
        }
    },
    handleMouseMove(e, forceTrigger) {
        const alignPoint = this.data.get('alignPoint');

        if ((this.isMouseEnterToShow() || forceTrigger) && alignPoint) {
            this.fire('mouseMove', e);
            this.setPoint(e);
        }
    },
    handleMouseLeave(e) {
        if (this.isMouseLeaveToHide()) {
            this.fire('mouseLeave', e);
            const mouseLeaveDelay = this.data.get('mouseLeaveDelay');
            this.delaySetPopupVisible(false, mouseLeaveDelay);
        }
    },
    handleFocus(e, forceTrigger) {
        if (this.isFocusToShow() || (forceTrigger && !this.isClickToShow())) {
            this.fire('focus', e);
            this.clearDelayTimer();
            this.data.set('focusTime', Date.now());
            this.delaySetPopupVisible(true, this.data.get('focusDelay'));
        }
    },
    handleBlur(e, forceTrigger) {
        if (this.isBlurToHide() || (forceTrigger && !this.isClickToHide())) {
            this.fire('blur', e);
            this.clearDelayTimer();
            this.delaySetPopupVisible(false, this.data.get('blurDelay'));
        }
    },
    handleContextMenu(e) {
        if (this.isContextMenuToShow()) {
            e.preventDefault();
            this.fire('contextMenu', e);
            this.setPopupVisible(true, e);
        }
    },
    handlePopupMouseEnter() {
        this.fire('popupMouseEnter');
        this.clearDelayTimer();
    },
    handlePopupMouseLeave(e) {
        if (e.relatedTarget && contains(this.el, e.relatedTarget)) {
            return;
        }
        this.fire('popupMouseLeave');
        this.delaySetPopupVisible(false, this.data.get('mouseLeaveDelay'));
    },
    handlePopupMouseDown() {
        this.data.set('hasPopupMouseDown', true);

        clearTimeout(this.mouseDownTimeout);
        this.mouseDownTimeout = setTimeout(() => {
            this.data.set('hasPopupMouseDown', false);
        }, 0);
    },
    handleDocumentClick(e) {
        const target = e.target;
        const root = this.el;
        const hasPopupMouseDown = this.data.get('hasPopupMouseDown');
        if (!contains(root, target) && !hasPopupMouseDown) {
            this.close(e);
        }
    },
    delaySetPopupVisible(visible, delayS, e) {
        const delay = delayS * 1000;
        this.clearDelayTimer();
        if (delay) {
            const point = e ? {pageX: e.pageX, pageY: e.pageY} : null;
            this.delayTimer = setTimeout(() => {
                this.setPopupVisible(visible, point);
                this.clearDelayTimer();
            }, delay);
        }
        else {
            this.setPopupVisible(visible, event);
        }
    },
    close(e) {
        this.setPopupVisible(false, e);
    },
    getPopupDomNode() {
        const popupComponent = this.data.get('popupComponent');
        if (popupComponent) {
            return popupComponent.getPopupDomNode();
        }
        return null;
    },
    getContainer() {
        const getPopupContainer = this.data.get('getPopupContainer');
        const getDocument = this.data.get('getDocument');
        const popupContainer = document.createElement('div');

        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';

        const mountNode = getPopupContainer ? getPopupContainer(this.el) : getDocument().body;
        mountNode.appendChild(popupContainer);

        return popupContainer;
    },
    components: {
        's-popup': Popup
    },
    messages: {
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
        santd_popup_mouseEnter(payload) {
            const e = payload.value;
            if (this.isMouseEnterToShow()) {
                this.handlePopupMouseEnter(e);
            }
        },
        santd_popup_mouseLeave(payload) {
            const e = payload.value;
            if (this.isMouseLeaveToHide()) {
                this.handlePopupMouseLeave(e);
            }
        },
        santd_popup_mouseDown(payload) {
            const e = payload.value;
            this.handlePopupMouseDown(e);
        }
    },
    getRootDomNode() {
        return this.data.get('rootDomNode') || this.el;
    },
    attachPopup() {
        this._container = this.getContainer();

        this._popup = new Popup({
            owner: this,
            source: `
                <x-popup
                    prefixCls="{{prefixCls}}"
                    getRootDomNode="{{getRootDomNode()}}"
                    align="{{getPopupAlign}}"
                    transitionName="{{popupTransitionName}}"
                    getClassNameFromAlign="{{getClassNameFromAlign}}"
                    popupClassName="{{popupClassName}}"
                    popupStyle="{{popupStyle}}"
                    destroyPopupOnHide="{{destroyPopupOnHide}}"
                >
                    <slot name="popup" />
                </x-popup>
            `
        });

        this._popup.attach(this._container);
    },
    removeContainer() {
        if (this._container) {
            this._container.parentNode.removeChild(this._container);
            this._container = null;
            this.popup = null;
        }
    },
    refresh() {
        this._popup && this._popup.refresh();
    },
    template: `<span
        on-click="handleClick"
        on-mousedown="handleMouseDown"
        on-touchstart="handleTouchStart"
        on-mouseenter="handleMouseEnter"
        on-mousemove="handleMouseMove"
        on-mouseleave="handleMouseLeave"
        on-contextmenu="handleContextMenu"
        class="{{classes}}"
    >
        <slot />
    </span>`
});
