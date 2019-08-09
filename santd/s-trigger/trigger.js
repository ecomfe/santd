/**
* @file trigger 下拉菜单触发
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';
import classNames from 'classnames';
import {alignElement, alignPoint} from 'dom-align';
import {addClass, contains} from 'santd/core/util/dom';
import addDOMEventListener from 'add-dom-event-listener';
import {requestAnimationTimeout, cancelAnimationTimeout} from 'santd/core/util/requestAnimationTimeout';
import {getAlignPopupClassName, getAlignFromPlacement} from './_utils';
import Popup from './popup';
const pagin = classCreator('dropdown');
const prefixCls = pagin();

function getPoint(point) {
    if (typeof point !== 'object' || !point) {
        return null;
    }
    return point;
}

function getElement(node) {
    if (node.nodeType !== 1) {
        return null;
    }
    return node;
}

export default san.defineComponent({
    dataTypes: {
        mouseEnterDelay: DataTypes.number,
        placement: DataTypes.string,
        isAlignPoint: DataTypes.bool,
        disabled: DataTypes.bool,
        overlayClassName: DataTypes.string,
        overlayStyle: DataTypes.object,
        placements: DataTypes.object,
        trigger: DataTypes.string,
        isShow: DataTypes.bool
    },
    components: {
        's-popup': Popup
    },
    computed: {

    },
    initData() {
        return {
            mouseEnterDelay: 0.15,
            mouseLeaveDelay: 0.1,
            placement: 'bottomLeft',
            currentVisible: false
        };
    },
    created() {
        this.eleShow = false;
        this.data.set('parent', this);
        // handle placement class
        const placementClass = this.handleGetPopupClassFromAlign();
        this.data.set('placementClass', placementClass);
        this.watch('isShow', show => {
            this.data.set('currentVisible', show);
            if (show) {
                if (!this.eleShow) {
                    this.getContainer();
                    setTimeout(() => {
                        this.getPositon();
                    }, 10);
                    this.eleShow = true;
                }
                this.setPopupVisible(true);
            }
        });
        this.watch('currentVisible', visible => {
            this.updatedCal();
        });
        this.watch('newPosition', change => {
            if (change) {
                setTimeout(() => {
                    this.getPositon();
                }, 10);
            }
        });
    },
    attached() {
        const slot = this.slot()[0];
        const isShow = this.data.get('isShow');
        const disabled = this.data.get('disabled');
        const headRef = this.ref('reference');
        if (slot && slot.isInserted && headRef.children[0]) {
            addClass(headRef.children[0], `${prefixCls}-trigger`);
            if (disabled) {
                headRef.children[0].setAttribute('disabled', true);
            }
        }
        // handle visible
        if (isShow) {
            if (!this.eleShow) {
                this.getContainer();
                setTimeout(() => {
                    this.getPositon();
                }, 10);
                this.eleShow = true;
            }
            this.setPopupVisible(true);
        }
        // 包装事件，传到popup
        let popup = {
            mouseenter: this.onPopupMouseenter,
            mouseleave: this.onPopupMouseleave,
            popupclick: this.onPopupClick,
            mousedown: this.onPopupMouseDown
        };
        this.data.set('popupListener', popup);

    },
    updatedCal() {
        // 绑定点击docuement区域隐藏事件
        if (this.data.get('currentVisible')) {
            if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
                this.clickOutsideHandler = addDOMEventListener(document, 'mousedown', this.onDocumentClick.bind(this));
            }
        } else {
            this.clearOutsideHandler();
        }

    },
    isClickToHide() {
        const trigger = this.data.get('trigger');
        return trigger.indexOf('click') !== -1;
    },
    isContextmenuToShow() {
        const trigger = this.data.get('trigger');
        return trigger.indexOf('contextmenu') !== -1;
    },
    getPopupAlign() {
        // 获取align
        const placement = this.data.get('placement');
        const builtinPlacements = this.data.get('placements');
        const align = this.data.get('align') || '';
        if (placement && builtinPlacements) {
            return getAlignFromPlacement(builtinPlacements, placement);
        }
        return align;
    },
    handleGetPopupClassFromAlign() {
        // 获取合成后的placement的class
        const className = [];
        const placement = this.data.get('placement');
        const builtinPlacements = this.data.get('placements');
        const align = this.getPopupAlign();
        if (placement && builtinPlacements) {
            const clsName = getAlignPopupClassName(builtinPlacements, prefixCls, align);
            className.push(clsName);
        }
        return className.join(' ');
    },
    // 确定菜单加载位置
    getContainer() {
        // 处理要放置在页面的什么位置
        let popupPosition = this.data.get('getPopupContainer');
        let popupContainer = document.createElement('div');
        const getPopupContainer = this.data.get('getPopupContainer');
        const refs = this.ref('popUp');
        popupContainer.style.position = 'absolute';
        popupContainer.style.top = '0';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100%';
        popupPosition = popupPosition
            ? getPopupContainer(this.el)
            : document.body;
        popupContainer.appendChild(refs.el);
        popupPosition.appendChild(popupContainer);
    },
    onMouseenter(e) {
        this.clearDelayTimer();
        const mouseEnterDelay = this.data.get('mouseEnterDelay');
        const trigger = this.data.get('trigger');
        if (trigger !== 'hover') {
            return false;
        }
        this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e, 'hover');
        setTimeout(() => {
            if (!this.eleShow) {
                this.getContainer();
                this.eleShow = true;
                this.getPositon();

            }
        }, 10);
    },
    onMouseMove() {

    },
    onMouseleave() {
        this.clearDelayTimer();
        const trigger = this.data.get('trigger');
        const mouseLeaveDelay = this.data.get('mouseLeaveDelay');
        if (trigger !== 'hover') {
            return false;
        }
        this.delaySetPopupVisible(false, mouseLeaveDelay, null, 'hover');
    },
    onPopupMouseenter(e) {
        // 弹出框enter
        this.clearDelayTimer();
    },
    onPopupMouseleave() {
        const mouseLeaveDelay = this.data.get('mouseLeaveDelay');
        const trigger = this.data.get('trigger');
        if (trigger !== 'hover') {
            return false;
        }
        this.delaySetPopupVisible(false, mouseLeaveDelay);
    },
    onFocus() {

    },
    onBlur() {

    },
    onContextMenu(e) {
        e.preventDefault();
        this.clearDelayTimer();
        this.delaySetPopupVisible(true, 0, e);
        setTimeout(() => {
            if (!this.eleShow) {
                this.getContainer();
                this.eleShow = true;
            }
            this.getPositon();
        }, 10);

    },
    onClick(e) {
        // 处理head头点击
        const mouseEnterDelay = this.data.get('mouseEnterDelay');
        const trigger = this.data.get('trigger');
        this.clearDelayTimer();
        if (trigger !== 'click') {
            return false;
        }
        this.delaySetPopupVisible(true, 0, mouseEnterDelay ? null : e, 'click');
        setTimeout(() => {
            this.getPositon();
            if (!this.eleShow) {
                this.getContainer();
                this.eleShow = true;
            }
        }, 50);
    },
    onPopupMouseDown(e) {
        this.hasPopupMouseDown = true;

        clearTimeout(this.mouseDownTimeout);
        this.mouseDownTimeout = setTimeout(() => {
            this.hasPopupMouseDown = false;
        }, 0);
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
            this.onDocumentClick(e);
        }
    },
    onDocumentClick(event) {
        const target = event.target;
        const root = this.el;
        const isInner = contains(root, target);
        if (!isInner && !this.hasPopupMouseDown) {
            this.close();
        }
    },
    close() {
        this.setPopupVisible(false);
    },
    onPopupClick(val) {
        this.nextTick(() => {
            this.getPositon();
        });
    },
    delaySetPopupVisible(visible, delayS, event, trigger) {
        const delay = delayS * 1000;
        const disabled = this.data.get('disabled');
        if (disabled) {
            return false;
        }
        if (delay) {
            this.delayTimer = requestAnimationTimeout(() => {
                this.setPopupVisible(visible, event, trigger);
                this.clearDelayTimer();
            }, delay);
        } else {
            this.setPopupVisible(visible, event, trigger);
        }
    },
    clearDelayTimer() {
        if (this.delayTimer) {
            cancelAnimationTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    },
    // 设置visible状态
    setPopupVisible(visible, event, trigger) {
        const isAlignPoint = this.data.get('isAlignPoint');
        if (visible && isAlignPoint && event) {
            this.setPoint(event);
        }
        this.clearDelayTimer();
        this.dispatch('visibleStateChange', visible);
        if (visible || trigger === 'hover') {
            this.dispatch('visibleChange', visible);
        }
    },
    setPoint(point) {
        const isAlignPoint = this.data.get('isAlignPoint');
        if (!isAlignPoint || !point) {
            return false;
        }
        this.data.set('point', {
            pageX: point.pageX,
            pageY: point.pageY
        });
    },
    getPositon() {
        const align = this.getPopupAlign();
        const source = this.data.get('childComponent') || '';
        const target = this.getAlignTarget();
        if (source && align) {
            this.forceAlign(source, target, align);
        }
    },
    getAlignTarget() {
        const point = this.data.get('point');
        if (point) {
            return point;
        }
        return this.ref('reference');
    },
    forceAlign(source, target, align) {
        const element = getElement(target);
        const point = getPoint(target);
        let result;
        if (element) {
            if (source.style.visibility === '') {
                source.style.visibility = 'hidden';
            }
            result = alignElement(source, element, align);
        } else if (point) {
            result = alignPoint(source, point, align);
        }
    },
    updateDropdownMenu() {
        this.nextTick(() => {
            if (!this.eleShow) {
                this.getContainer();
                this.eleShow = true;
                this.getPositon();
            }
        });
    },
    clearOutsideHandler() {
        if (this.clickOutsideHandler) {
            this.clickOutsideHandler.remove();
            this.clickOutsideHandler = null;
        }
    },
    messages: {
        childComponent(val) {
            this.data.set('childComponent', val.value);
        }
    },
    template: `
        <div>
            <span
                style="display: block;"
                s-ref="reference"
                on-mouseenter="onMouseenter($event)"
                on-mouseleave="onMouseleave($event)"
                on-contextmenu="onContextMenu($event)"
                on-click="onClick($event)"
            >
                <slot name="headInner"></slot>
            </span>
            <s-popup
                s-ref="popUp"
                parent="{{parent}}"
                class="{{addClassName}}"
                isShow="{{currentVisible}}"
                computedStyle="{{computedStyle}}"
                overlay="{{overlay}}"
                popupListener="{{popupListener}}"
                point="{{point}}"
                className="{{placementClass}}"
                placemens="{{placemens}}"
                overlayClassName="{{overlayClassName}}"
                overlayStyle="{{overlayStyle}}"
                prefixCls="{{prefixCls}}"
                allData="{{allData}}"
                width="{{width}}"
                targetProperty="{{targetProperty}}"
                dropdownMatchSelectWidth="{{dropdownMatchSelectWidth}}"
            ><slot name="popupInner"></slot></s-popup>
        </div>
    `
});
