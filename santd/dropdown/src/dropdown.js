/**
 * @file Santd dropdown source file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import inherits from 'santd/core/util/inherits';
import Trigger from 'santd/core/trigger/index';
import placements from './placements';

export default inherits(san.defineComponent({
    initData() {
        return {
            prefixCls: 'dropdown',
            action: ['hover'],
            popupPlacement: 'bottomLeft',
            popupAlign: {},
            builtinPlacements: placements,
            mouseEnterDelay: 0.15,
            mouseLeaveDelay: 0.1,
            forceRender: true
        };
    },
    computed: {
        getOverlayElement() {
            const overlay = this.data.get('overlay');
            if (!overlay.prototype.nodeType && typeof overlay === 'function') {
                return overlay();
            }
            return overlay;
        },
        getMenuElement() {
            const overlayElement = this.data.get('getOverlayElement');
            const instance = this.data.get('instance');
            const prefixCls = this.data.get('prefixCls');

            return inherits(san.defineComponent({
                initData() {
                    return {
                        selectable: false,
                        overlayPrefixCls: prefixCls
                    };
                },
                messages: {
                    menuClick(payload) {
                        if (!instance.data.get('visible')) {
                            instance.setPopupVisible(false);
                            instance.fire('overlayClick');
                        }
                    }
                }
            }), overlayElement);
        },
        popup() {
            return this.data.get('getMenuElement');
        },
        popupVisible() {
            return this.data.get('visible');
        },
        getMinOverlayWidthMatchTrigger() {
            const minOverlayWidthMatchTrigger = this.data.get('minOverlayWidthMatchTrigger');
            const alignPoint = this.data.get('alignPoint');
            return minOverlayWidthMatchTrigger || !alignPoint;
        },
        afterPopupVisibleChange() {
            const getMinOverlayWidthMatchTrigger = this.data.get('getMinOverlayWidthMatchTrigger');
            const instance = this.data.get('instance');
            return function (visible) {
                if (visible && getMinOverlayWidthMatchTrigger) {
                    instance.data.set('rootDomNode', instance.el.children[0]);
                    const overlayNode = instance.getPopupDomNode();
                    const rootNode = instance.el.children[0];
                    if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
                        overlayNode.style.minWidth = `${rootNode.offsetWidth}px`;
                    }
                }
            };
        }
    }
}), Trigger);
