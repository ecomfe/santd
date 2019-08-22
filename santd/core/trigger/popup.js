/**
 * @file Santd trigger popup file
 * @author mayihui@baidu.com
 **/

import san, {DataTypes} from 'san';
import toStyle from 'to-style';

export default san.defineComponent({
    dataTypes: {
        visible: DataTypes.bool,
        style: DataTypes.oneOfType([DataTypes.string, DataTypes.object]),
        getClassNameFromAlign: DataTypes.func,
        align: DataTypes.object,
        destroyPopupOnHide: DataTypes.bool,
        className: DataTypes.string,
        prefixCls: DataTypes.string,
        stretch: DataTypes.string,
        point: DataTypes.object
    },
    inited() {
        this.data.set('stretchChecked', false);
        this.data.set('targetWidth', undefined);
        this.data.set('targetHeight', undefined);

        this.data.set('bodyStyle', toStyle.object(this.data.get('style')));
        this.data.set('style', {});
        this.watch('visible', val => {
            if (!val) {
                this.data.set('currentAlignClassName', '');
            }
        });
        this.watch('getRootDomNode', val => {
            this.data.set('refresh', Math.random(), {force: true});
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
        newStyle() {
            const bodyStyle = this.data.get('bodyStyle');
            const getZIndexStyle = this.data.get('getZIndexStyle');

            return {
                ...bodyStyle,
                ...getZIndexStyle
            };
        },
        getZIndexStyle() {
            const zIndex = this.data.get('zIndex');
            return zIndex && {
                'z-index': zIndex
            };
        },
        classes() {
            const prefixCls = this.data.get('prefixCls');
            const className = this.data.get('className');
            const currentAlignClassName = this.data.get('currentAlignClassName');
            const align = this.data.get('align');
            const getClassNameFromAlign = this.data.get('getClassNameFromAlign');
            const visible = this.data.get('visible');

            return [
                prefixCls,
                className,
                currentAlignClassName || getClassNameFromAlign(align)
            ].join(' ');
        }
    },
    getPopupDomNode() {
        const popupDomNode = this.ref('popupInstance');
        return popupDomNode && popupDomNode.el.querySelector('div');
    },
    getClassName(currentAlignClassName) {
        const prefixCls = this.data.get('prefixCls');
        const className = this.data.get('className');
        return `${prefixCls} ${className} ${currentAlignClassName}`;
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
    handlePopupTouchStart(e) {
        this.dispatch('santd_popup_mouseDown', e);
    },
    template: `
        <div
            on-mouseenter="handlePopupMouseEnter"
            on-mouseleave="handlePopupMouseLeave"
            on-mousedown="handlePopupMouseDown"
            on-touchstart="handlePopupTouchStart"
        >
            <template s-if="destroyPopupOnHide">
                <s-animate
                    visible="{{visible}}"
                    showProp="visible"
                    exclusive
                    transitionAppear
                    transitionName="{{transitionName || getTransitionName}}"
                    s-ref="popupInstance"
                    s-if="visible"
                >
                    <s-popupinner
                        refresh="{{refresh}}"
                        target="{{getAlignTarget}}"
                        key="popup"
                        monitorWindowResize="{{monitorWindowResize}}"
                        align="{{align}}"
                        on-align="handleAlign"
                        className="{{classes}}"
                        hiddenClassName="{{prefixCls}}-hidden"
                        prefixCls="{{prefixCls}}"
                        visible="{{visible}}"
                        style="{{newStyle}}"
                    >
                        <s-popup s-ref="popup"></s-popup>
                    </s-popupinner>
                </s-animate>
            </template>
            <s-animate
                visible="{{visible}}"
                showProp="visible"
                exclusive
                transitionAppear
                transitionName="{{transitionName || getTransitionName}}"
                s-ref="popupInstance"
                s-else
            >
                <s-popupinner
                    refresh="{{refresh}}"
                    target="{{getAlignTarget}}"
                    key="popup"
                    monitorWindowResize="{{monitorWindowResize}}"
                    align="{{align}}"
                    on-align="handleAlign"
                    className="{{classes}}"
                    hiddenClassName="{{prefixCls}}-hidden"
                    prefixCls="{{prefixCls}}"
                    visible="{{visible}}"
                    style="{{newStyle}}"
                >
                    <s-popup s-ref="popup"></s-popup>
                </s-popupinner>
            </s-animate>
        </div>
    `
});
