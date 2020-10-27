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
import KeyCode from '../core/util/keyCode';
import isNumber from 'lodash/isNumber';
import Icon from '../icon';
import filters from '../modal/Dialog';

const prefixCls = classCreator('drawer')();
const placementType = DataTypes.oneOf(['top', 'right', 'bottom', 'left']);
const styleType = DataTypes.oneOfType([DataTypes.string, DataTypes.object]);

export default san.defineComponent({
    template: `
        <div
            class="${prefixCls} ${prefixCls}-{{placement}} {{visible ? '${prefixCls}-open' : ''}} {{className}}"
            style="z-index:{{zIndex}};"
        >
            <div s-if="{{mask}}" class="${prefixCls}-mask" style="{{maskStyle}}" on-click="onMaskClick"></div>
            <div class="${prefixCls}-content-wrapper" style="{{wrapStyle}}" on-keydown="onKeyDown">
                <div s-ref="sentinel" tabindex="0" style="width:0px;height:0px;overflow:hidden;"></div>
                <div class="${prefixCls}-content">
                    <div class="${prefixCls}-wrapper-body" style="{{drawerStyle}}">
                        <div s-if="{{title}}" class="${prefixCls}-header" style="{{headerStyle}}">
                            <div class="${prefixCls}-title">{{title}}</div>
                        </div>
                        <div s-if="{{closable}}" class="${prefixCls}-close-wrapper" on-click="close">
                            <slot name="closeIcon" />
                            <button
                                s-if="showCloseBtn"
                                aria-label="Close"
                                class="${prefixCls}-close"
                            >
                                <span class="${prefixCls}-close-x">
                                    <s-icon type="close" />
                                </span>
                            </button>
                        </div>
                        <div class="${prefixCls}-body" style="{{bodyStyle}}">
                            <slot />
                        </div>
                        <div class="${prefixCls}-footer" style="{{footerStyle}}">
                            <slot name="footer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    dataTypes: {
        bodyStyle: styleType, // 原来的参数是style，但是san会把样式添加到根节点，所以改为了bodyStyle
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
        zIndex: DataTypes.number,
        keyboard: DataTypes.bool,
        closeIcon: DataTypes.any,
        footer: DataTypes.any,
        footerStyle: styleType,
        drawerStyle: styleType,
        headerStyle: styleType,
        afterVisibleChange: DataTypes.func,
        className: DataTypes.string
    },

    components: {
        's-icon': Icon
    },

    computed: {
        wrapStyle() {
            const placement = this.data.get('placement');
            const isHorizontal = placement === 'left' || placement === 'right';
            const placementName = `translate${isHorizontal ? 'X' : 'Y'}`;
            const placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';

            const width = isHorizontal && this.data.get('width');
            const height = !isHorizontal && this.data.get('height');
            const transform = this.data.get('visible') ? '' : `${placementName}(${placementPos})`;

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
            placement: 'right',
            keyboard: true,
            showCloseBtn: false
        };
    },

    inited() {
        this.watch('visible', val => {
            if (val) {
                this.nextTick(() => {
                    // wrapper内的元素聚焦之后，wrapper才能生效keydown事件监听
                    const sentinel = this.ref('sentinel');
                    !(this.slot('closeIcon')[0] && this.slot('closeIcon')[0].children.length)
                        && this.data.set('showCloseBtn', true);
                    sentinel && sentinel.focus();
                });
            }

            // 切换抽屉时动画结束后的回调
            setTimeout(() => {
                this.fire('afterVisibleChange', val);
            }, 300);
        });
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
    },

    onKeyDown(e) {
        if (this.data.get('keyboard') && e.keyCode === KeyCode.ESC) {
            e.stopPropagation();
            this.close(e);
        }
    }
});
