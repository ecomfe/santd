/**
 * @file Santd trigger popup file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import Animate from '../util/animate';
import PopupInner from './popupInner';

interface Props {
    visible?: boolean;
    getClassNameFromAlign?: (align: any) => string;
    getRootDomNode?: HTMLElement;
    align?: Record<string, any>;
    destroyPopupOnHide?: boolean;
    prefixCls?: string;
    point: {};
}

interface Computed {
    classes: () => string[];
    getPopupStyle: () => Record<string, any>;
}



export default class Popup extends Base<{}, Props, Computed> {
    inited() {
        const destroyPopupOnHide = this.data.get('destroyPopupOnHide');
        this.data.set('destroy', true);
        this.watch('visible', val => {
            if (!val) {
                this.data.set('currentAlignClassName', '');
                // 这里先简单的设置一个timeout来保证动画结束后且destroyPopupOnHide为true时删除popup子节点
                window.setTimeout(() => {
                    this.data.set('destroy', !destroyPopupOnHide);
                }, 500);
            }
            else {
                this.data.set('destroy', true);
                let rootNode = this.data.get('getRootDomNode');
                if (rootNode && this.data.get('stretch')) {
                    this.data.set('targetWidth', rootNode.offsetWidth);
                    this.data.set('targetHeight', rootNode.offsetHeight);
                }
            }
        });
    }
    static computed: Computed = {
        classes(this: Popup) {
            const prefixCls = this.data.get('prefixCls');
            const currentAlignClassName = this.data.get('currentAlignClassName');
            const align = this.data.get('align');
            const getClassNameFromAlign = this.data.get('getClassNameFromAlign') as NonNullable<Props['getClassNameFromAlign']>;

            let classArr = [prefixCls, currentAlignClassName || getClassNameFromAlign(align)];

            return classArr;
        },
        getPopupStyle(this: Popup) {
            const targetWidth = this.data.get('targetWidth');
            const targetHeight = this.data.get('targetHeight');
            const stretch = this.data.get('stretch') || '';
            let popupStyle = this.data.get('popupStyle');
            let sizeStyle: Record<string, string> = {};

            if (stretch.indexOf('height') !== -1) {
                sizeStyle.height = `${targetHeight}px`;
            }
            else if (stretch.indexOf('minHeight') !== -1) {
                sizeStyle['min-height'] = `${targetHeight}px`;
            }
            if (stretch.indexOf('width') !== -1) {
                sizeStyle.width = `${targetWidth}px`;
            }
            else if (stretch.indexOf('minWidth') !== -1) {
                sizeStyle['min-width'] = `${targetWidth}px`;
            }

            return {
                ...sizeStyle,
                ...popupStyle
            };
        }
    }
    getPopupDomNode() {
        const popupDomNode = this.ref('popupInstance');
        return popupDomNode && popupDomNode.el?.querySelector('div');
    }
    handleAlign({source, result}: {source: HTMLElement, result: any}) {
        const getClassNameFromAlign = this.data.get('getClassNameFromAlign') as NonNullable<Props['getClassNameFromAlign']>;
        const currentAlignClassName = getClassNameFromAlign(result);
        const prevCurrentAlignClassName = this.data.get('currentAlignClassName');
        if (prevCurrentAlignClassName !== currentAlignClassName) {
            this.data.set('currentAlignClassName', currentAlignClassName);
        }
        this.fire('align', {source, result});
    }
    attached() {
        this.dispatch('santd_popup_save', this);
    }
    handlePopupMouseEnter(e: MouseEvent) {
        this.dispatch('santd_popup_mouseEnter', e);
    }
    handlePopupMouseLeave(e: MouseEvent) {
        this.dispatch('santd_popup_mouseLeave', e);
    }
    handlePopupMouseDown(e: MouseEvent) {
        this.dispatch('santd_popup_mouseDown', e);
    }
    refresh() {
        (this.ref('popupinner') as PopupInner).forceAlign();
    }
    static components = {
        's-animate': Animate,
        's-popupinner': PopupInner
    }
    static template = /* html */ `
        <div
            on-mouseenter="handlePopupMouseEnter"
            on-mouseleave="handlePopupMouseLeave"
            on-mousedown="handlePopupMouseDown"
        >
            <s-popupinner
                target="{{point ? point : getRootDomNode}}"
                key="popup"
                monitorWindowResize="{{monitorWindowResize}}"
                align="{{align}}"
                on-align="handleAlign"
                class="{{classes}}"
                hiddenClassName="{{prefixCls}}-hidden"
                prefixCls="{{prefixCls}}"
                visible="{{visible}}"
                showProp="visible"
                transitionName="{{transitionName}}"
                popupStyle="{{getPopupStyle}}"
                popupClassName="{{popupClassName}}"
                s-ref="popupinner"
            >
                <slot s-if="destroy" />
            </s-popupinner>
        </div>
    `
};
