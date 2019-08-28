/**
 * @file 组件 drawer
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/drawer-cn/
 *
 * @todo API: destroyOnClose
 * @todo API: getContainer
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import isNumber from 'lodash/isNumber';
import Icon from '../icon';
import filters from '../modal/Dialog';

const prefixCls = classCreator('drawer')();
const placementType = DataTypes.oneOf(['top', 'right', 'bottom', 'left']);
const styleType = DataTypes.oneOfType([DataTypes.string, DataTypes.object]);

export default san.defineComponent({
    template: `
        <div class="{{drawerClassName}}" style="z-index:{{zIndex}};">
            <div s-if="{{mask}}" class="${prefixCls}-mask" style="{{maskStyle | css}}" on-click="onMaskClick"></div>
            <div class="${prefixCls}-content-wrapper" style="{{wrapStyle | css}}">
                <div class="${prefixCls}-content">
                    <div class="${prefixCls}-wrapper-body" style="{{containerStyle | css}}">
                        <div s-if="{{title}}" class="${prefixCls}-header">
                            <div class="${prefixCls}-title">{{title}}</div>
                        </div>
                        <button
                            s-if="{{closable}}"
                            on-click="close"
                            aria-label="Close"
                            class="${prefixCls}-close"
                        >
                            <span class="${prefixCls}-close-x">
                                <s-icon type="close" />
                            </span>
                        </button>
                        <div class="${prefixCls}-body" style="{{bodyStyle | css}}">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    dataTypes: {
        bodyStyle: styleType, // 原来的参数是style，但是san会把样式添加到根节点，所以改为了bodyStyle
        className: DataTypes.string,
        closable: DataTypes.bool,
        destroyOnClose: DataTypes.bool,
        getContainer: DataTypes.string,
        mask: DataTypes.bool,
        maskClosable: DataTypes.bool,
        maskStyle: styleType,
        width: DataTypes.number,
        height: DataTypes.number,
        placement: placementType,
        title: DataTypes.string,
        visible: DataTypes.bool,
        zIndex: DataTypes.number
    },
    components: {
        's-icon': Icon
    },
    computed: {
        drawerClassName() {
            const data = this.data;
            const className = data.get('className');
            const placement = data.get('placement');
            const visible = data.get('visible');
            let classArr = [prefixCls, `${prefixCls}-${placement}`];

            className && classArr.push(className);
            !!visible && classArr.push(`${prefixCls}-open`);

            return classArr;
        },
        wrapStyle() {
            const data = this.data;
            const placement = data.get('placement');
            const visible = data.get('visible');
            const isHorizontal = placement === 'left' || placement === 'right';
            const placementName = `translate${isHorizontal ? 'X' : 'Y'}`;
            const placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';

            const width = isHorizontal && data.get('width');
            const height = !isHorizontal && data.get('height');
            const transform = visible ? '' : `${placementName}(${placementPos})`;

            return {
                transform,
                msTransform: transform,
                width: isNumber(width) ? `${width}px` : width,
                height: isNumber(height) ? `${height}px` : height
            };
        }
    },
    filters,
    initData() {
        return {
            closable: true,
            destroyOnClose: false,
            getContainer: 'body',
            mask: true,
            maskClosable: true,
            maskStyle: {},
            width: 256,
            height: 256,
            placement: 'right'
        };
    },
    onMaskClick(e) {
        if (!this.data.get('maskClosable')) {
            return;
        }
        this.close(e);
    },
    close(e) {
        if (this.data.get('visible') !== undefined) {
            this.fire('close', e);
        }
        this.data.set('visible', false);
    }
});
