/**
 * @file Santd triger index file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Portal from './utils/portal';
import Popup from './popup';
import PopupInner from './popupInner';
import Animate from '../util/animate';
import inherits from '../util/inherits';
import {contains} from '../util/dom';
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

export default san.defineComponent({
    dataTypes: {
        action: DataTypes.oneOfType([DataTypes.string, DataTypes.array]),
        showAction: DataTypes.array,
        hideAction: DataTypes.array,
        getPopupClassNameFromAlign: DataTypes.func,
        popup: DataTypes.func, // 必须是san组件
        popupStyle: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        prefixCls: DataTypes.string,
        popupClassName: DataTypes.string,
        className: DataTypes.string,
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
        stretch: DataTypes.string,
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
        getContainer() {
            const instance = this.data.get('instance');
            return () => {
                const getPopupContainer = this.data.get('getPopupContainer');
                const getDocument = this.data.get('getDocument');
                const popupContainer = document.createElement('div');

                popupContainer.style.position = 'absolute';
                popupContainer.style.top = '0';
                popupContainer.style.left = '0';
                popupContainer.style.width = '100%';

                const mountNode = getPopupContainer ? getPopupContainer(instance && instance.el) : getDocument().body;
                mountNode.appendChild(popupContainer);

                return popupContainer;
            };
        },
        getPopupAlign() {
            const popupPlacement = this.data.get('popupPlacement');
            const popupAlign = this.data.get('popupAlign');
            const builtinPlacements = this.data.get('builtinPlacements');

            if (popupPlacement && builtinPlacements) {
                return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
            }
            return popupAlign;
        },
        getComponent() {
            const prefixCls = this.data.get('prefixCls');
            const destroyPopupOnHide = this.data.get('destroyPopupOnHide');
            const popupClassName = this.data.get('popupClassName');
            const action = this.data.get('action');
            const popupAnimation = this.data.get('popupAnimation');
            const popupTransitionName = this.data.get('popupTransitionName');
            const popupStyle = this.data.get('popupStyle');
            const mask = this.data.get('mask');
            const maskAnimation = this.data.get('maskAnimation');
            const maskTransitionName = this.data.get('maskTransitionName');
            const zIndex = this.data.get('zIndex');
            const popup = this.data.get('popup');
            const stretch = this.data.get('stretch');
            const alignPoint = this.data.get('alignPoint');
            const visible = this.data.get('popupVisible');
            const point = this.data.get('point');
            const getClassNameFromAlign = this.data.get('getClassNameFromAlign');
            const align = this.data.get('getPopupAlign');
            const getRootDomNode = this.data.get('getRootDomNode');
            const getTransitionName = this.data.get('getTransitionName');

            return inherits(san.defineComponent({
                components: {
                    's-popup': popup,
                    's-popupinner': PopupInner,
                    's-animate': Animate
                },
                initData() {
                    return {
                        prefixCls,
                        destroyPopupOnHide,
                        visible,
                        point: alignPoint && point,
                        className: popupClassName,
                        action,
                        align,
                        animation: popupAnimation,
                        getClassNameFromAlign: getClassNameFromAlign,
                        stretch,
                        getRootDomNode,
                        style: popupStyle,
                        mask,
                        zIndex,
                        transitionName: popupTransitionName,
                        maskAnimation,
                        maskTransitionName,
                        getTransitionName,
                        popup
                    };
                }
            }), Popup);
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
        getRootDomNode() {
            const instance = this.data.get('instance');
            const rootDomNode = this.data.get('rootDomNode');

            return rootDomNode || instance && instance.el;
        },
        handlePortalUpdate() {
            const prevPopupVisible = this.data.get('prevPopupVisible');
            const popupVisible = this.data.get('popupVisible');
            const afterPopupVisibleChange = this.data.get('afterPopupVisibleChange');
            return function () {
                if (prevPopupVisible !== popupVisible) {
                    afterPopupVisibleChange && afterPopupVisibleChange(popupVisible);
                }
            };
        }
    },
    created() {
        let popupVisible;

        this.data.set('instance', this);
        if ('popupVisible' in this.data.get()) {
            popupVisible = !!this.data.get('popupVisible');
        }
        else {
            popupVisible = !!this.data.get('defaultPopupVisible');
        }

        this.data.set('prevPopupVisible', popupVisible);
        this.data.set('popupVisible', popupVisible);

        const currentDocument = this.data.get('getDocument')();
        currentDocument.addEventListener('mousedown', this.handleDocumentClick.bind(this));
    },
    detached() {
        this.clearDelayTimer();
    },
    onClick(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const nextVisible = !this.data.get('popupVisible');
        const isClickToHide = this.data.get('isClickToHide');
        const isClickToShow = this.data.get('isClickToShow');

        if (isClickToHide && !nextVisible || nextVisible && isClickToShow) {
            this.setPopupVisible(nextVisible, e);
        }
    },
    setPopupVisible(visible, e) {
        const alignPoint = this.data.get('alignPoint');

        this.clearDelayTimer();

        if (this.data.get('popupVisible') !== visible) {
            const propVisible = this.data.get('visible');
            // 如果有visible，用外部传入的visible来控制是否展示
            this.data.set('popupVisible', propVisible !== undefined ? propVisible : visible);
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
        const isClickToHide = this.data.get('isClickToHide');
        const isClickToShow = this.data.get('isClickToShow');

        if (isClickToShow || isClickToHide || forceTrigger) {
            this.onClick(e);
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
        const isMouseEnterToShow = this.data.get('isMouseEnterToShow');
        if (isMouseEnterToShow || forceTrigger) {
            const mouseEnterDelay = this.data.get('mouseEnterDelay');
            this.fire('mouseEnter', e);
            this.setPopupVisible(true);
            this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
        }
    },
    handleMouseMove(e, forceTrigger) {
        const isMouseEnterToShow = this.data.get('isMouseEnterToShow');
        const alignPoint = this.data.get('alignPoint');

        if ((isMouseEnterToShow || forceTrigger) && alignPoint) {
            this.fire('mouseMove', e);
            this.setPoint(e);
        }
    },
    handleMouseLeave(e) {
        const isMouseLeaveToHide = this.data.get('isMouseLeaveToHide');
        if (isMouseLeaveToHide) {
            this.fire('mouseLeave', e);
            const mouseLeaveDelay = this.data.get('mouseLeaveDelay');
            this.delaySetPopupVisible(false, mouseLeaveDelay);
        }
    },
    handleFocus(e, forceTrigger) {
        const isFocusToShow = this.data.get('isFocusToShow');
        const isClickToShow = this.data.get('isClickToShow');
        if (isFocusToShow || (forceTrigger && !isClickToShow)) {
            this.fire('focus', e);
            this.clearDelayTimer();
            this.data.set('focusTime', Date.now());
            this.delaySetPopupVisible(true, this.data.get('focusDelay'));
        }
    },
    handleBlur(e, forceTrigger) {
        const isBlurToHide = this.data.get('isBlurToHide');
        const isClickToHide = this.data.get('isClickToHide');
        if (isBlurToHide || (forceTrigger && !isClickToHide)) {
            this.fire('blur', e);
            this.clearDelayTimer();
            this.delaySetPopupVisible(false, this.data.get('blurDelay'));
        }
    },
    handleContextMenu(e) {
        const isContextMenuToShow = this.data.get('isContextMenuToShow');
        if (isContextMenuToShow) {
            e.preventDefault();
            this.fire('contextMenu', e);
            this.setPopupVisible(true, e);
        }
    },
    handlePopupMouseEnter() {
        this.fire('popupMouseEnter');
        this.clearDelayTimer();
    },
    handlePopupMouseLeave() {
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
            this.close();
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
    components: {
        's-portal': Portal
    },
    handleShow() {
        this.data.set('show', !this.data.get('show'));
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
            if (this.data.get('isMouseEnterToShow')) {
                this.handlePopupMouseEnter(e);
            }
        },
        santd_popup_mouseLeave(payload) {
            const e = payload.value;
            if (this.data.get('isMouseLeaveToHide')) {
                this.handlePopupMouseLeave(e);
            }
        },
        santd_popup_mouseDown(payload) {
            const e = payload.value;
            this.handlePopupMouseDown(e);
        }
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
        <slot></slot>
        <s-portal
            getContainer="{{getContainer}}"
            s-if="popupVisible || popupComponent || forceRender"
            getComponent="{{getComponent}}"
            didUpdate="{{handlePortalUpdate}}"
        ></s-portal>
    </span>`
});