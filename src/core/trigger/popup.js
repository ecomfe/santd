/**
 * @file Santd trigger popup file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import Animate from '../../core/util/animate';
import PopupInner from './popupInner';

export default san.defineComponent({
    dataTypes: {
        visible: DataTypes.bool,
        getClassNameFromAlign: DataTypes.func,
        align: DataTypes.object,
        destroyPopupOnHide: DataTypes.bool,
        prefixCls: DataTypes.string,
        point: DataTypes.object
    },
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
            }
        });
    },
    computed: {
        getAlignTarget() {
            const point = this.data.get('point');
            if (point) {
                return point;
            }
            return this.data.get('getRootDomNode');
        },
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const currentAlignClassName = this.data.get('currentAlignClassName');
            const align = this.data.get('align');
            const getClassNameFromAlign = this.data.get('getClassNameFromAlign');
            const popupClassName = this.data.get('popupClassName');

            let classArr = [prefixCls, currentAlignClassName || getClassNameFromAlign(align)];
            popupClassName && classArr.push(popupClassName);

            return classArr;
        }
    },
    getPopupDomNode() {
        const popupDomNode = this.ref('popupInstance');
        return popupDomNode && popupDomNode.el.querySelector('div');
    },
    handleAlign({source, result}) {
        const getClassNameFromAlign = this.data.get('getClassNameFromAlign');
        const currentAlignClassName = getClassNameFromAlign(result);
        const prevCurrentAlignClassName = this.data.get('currentAlignClassName');
        if (prevCurrentAlignClassName !== currentAlignClassName) {
            this.data.set('currentAlignClassName', currentAlignClassName);
        }
        this.fire('align', {source, result});
    },
    attached() {
        this.dispatch('santd_popup_save', this);
    },
    handlePopupMouseEnter(e) {
        this.dispatch('santd_popup_mouseEnter', e);
    },
    handlePopupMouseLeave(e) {
        this.dispatch('santd_popup_mouseLeave', e);
    },
    handlePopupMouseDown(e) {
        this.dispatch('santd_popup_mouseDown', e);
    },
    components: {
        's-animate': Animate,
        's-popupinner': PopupInner
    },
    template: `
        <div
            on-mouseenter="handlePopupMouseEnter"
            on-mouseleave="handlePopupMouseLeave"
            on-mousedown="handlePopupMouseDown"
        >
            <s-popupinner
                target="{{getAlignTarget}}"
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
                popupStyle="{{popupStyle}}"
            >
                <slot s-if="destroy" />
            </s-popupinner>
        </div>
    `
});
