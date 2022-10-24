/**
 * @file image 预览组件
 * @author liulu36
 */
import './style/index.less';
import san from 'san';

import {Modal, Icon} from 'santd';
import {getOffset} from './dom/css';
import getFixScaleEleTransPosition from './getFixScaleEleTransPosition';
import {classCreator} from '../core/util';
import getRequestAnimationFrame, {cancelRequestAnimationFrame as caf} from '../core/util/getRequestAnimationFrame';

const raf = getRequestAnimationFrame();

const prefixCls = classCreator('image-preview')();

const initialPosition = {
    x: 0,
    y: 0
};

export default san.defineComponent({
    template: `
        <div class="${prefixCls}">
            <std-modal
                width="auto"
                modalStyle="{{modalStyle}}"
                transitionName="zoom"
                maskTransitionName="fade"
                wrapClassName="${prefixCls}-wrap {{wrapClassName}}"
                closable="{{false}}"
                keyboard
                on-cancel="onClose"
                on-afterClose="onAfterClose"
                visible="{{visible}}"
                bodyStyle="{{modalBodyStyle}}"
                hasFooter={{false}}>
                <div
                    s-if="{{isPreviewGroup}}"
                    class="${prefixCls}-progress">
                    {{currentPreviewIndex + 1}} / {{previewGroupCount}}
                </div>
                <div class="${prefixCls}-operations">
                    <div
                        class="${prefixCls}-operations-operation"
                        on-click="onClose"
                    >
                        <s-icon class="${prefixCls}-operations-icon" type="close" />
                    </div>
                    <div
                        class="${prefixCls}-operations-operation"
                        on-click="zoomIn"
                    >
                        <s-icon class="${prefixCls}-operations-icon" type="zoom-in" />
                    </div>
                    <div
                        class="${prefixCls}-operations-operation
                            {{disabledZoomOut ? '${prefixCls}-operations-operation-disabled' : ''}}"
                        on-click="zoomOut"
                    >
                        <s-icon class="${prefixCls}-operations-icon" type="zoom-out" />
                    </div>
                    <div
                        class="${prefixCls}-operations-operation"
                        on-click="rotateRight"
                    >
                        <s-icon class="${prefixCls}-operations-icon" type="rotate-right" />
                    </div>
                    <div
                        class="${prefixCls}-operations-operation"
                        on-click="rotateLeft"
                    >
                        <s-icon class="${prefixCls}-operations-icon" type="rotate-left" />
                    </div>
                </div>
                <div
                    class="${prefixCls}-img-wrapper"
                    on-click="onMaskClick"
                    style="transform: translate3d({{position.x}}px, {{position.y}}px, 0)"
                >
                    <img
                        s-ref="imgRef"
                        style="transform: scale3d({{scale}}, {{scale}}, 1) rotate({{rotate}}deg)"
                        class="${prefixCls}-img"
                        on-mousedown="onMouseDown"
                        src="{{combinationSrc}}"
                    />
                </div>
                <div
                    s-if="{{showLeftOrRightSwitches}}"
                    on-click="onSwitchLeft"
                    class="${prefixCls}-switch-left {{currentPreviewIndex > 0 ? '' : '${prefixCls}-switch-left-disabled'}}">
                    <s-icon type="left" />
                </div>
                <div
                    s-if="{{showLeftOrRightSwitches}}"
                    on-click="onSwitchRight"
                    class="${prefixCls}-switch-right {{currentPreviewIndex < previewGroupCount - 1 ? '' : '${prefixCls}-switch-right-disabled'}}">
                    <s-icon type="right" />
                </div>
            </std-modal>
        </div>
    `,

    components: {
        'std-modal': Modal,
        's-icon': Icon
    },
    messages: {

    },
    initData() {
        const position = {...initialPosition};
        return {
            scale: 1,
            rotate: 0,
            isMoving: false,
            position,
            modalBodyStyle: {
                position: 'fixed',
                inset: 0,
                overflow: 'hidden'
            },
            modalStyle: 'height: 100%; potions: static; top: 0;',
            previewUrls: {},
            lastWheelZoomDirection: {wheelDirection: 0}
        };
    },
    computed: {
        previewGroupCount() {
            const previewUrls = this.data.get('previewUrls');
            return Object.keys(previewUrls).length;
        },
        showLeftOrRightSwitches() {
            const isPreviewGroup = this.data.get('isPreviewGroup');
            const previewGroupCount = this.data.get('previewGroupCount');
            return isPreviewGroup && previewGroupCount > 1;
        },
        previewUrlsKeys() {
            const previewUrls = this.data.get('previewUrls');
            return Object.keys(previewUrls);
        },
        currentPreviewIndex() {
            const previewUrlsKeys = this.data.get('previewUrlsKeys');
            const current = this.data.get('current');
            return previewUrlsKeys.indexOf(String(current));
        },
        combinationSrc() {
            const isPreviewGroup = this.data.get('isPreviewGroup');
            const current = this.data.get('current');
            const src = this.data.get('src');
            const previewUrls = this.data.get('previewUrls');
            return isPreviewGroup ? previewUrls[current] : src;
        },
        disabledZoomOut() {
            return this.data.get('scale') === 1;
        },
        wrapClassName() {
            const isMoving = this.data.get('isMoving');
            return isMoving ? `${prefixCls}-moving` : '';
        }
    },
    inited() {
        this.removeListeners = () => { };
        this.originPosition = {
            originX: 0,
            originY: 0,
            deltaX: 0,
            deltaY: 0
        };
        this.onMouseUp = () => {
            const {visible, isMoving, scale, rotate} = this.data.get();
            if (visible && isMoving) {
                const imgRef = this.ref('imgRef');
                const width = imgRef.offsetWidth * scale;
                const height = imgRef.offsetHeight * scale;
                const {left, top} = getOffset(imgRef);
                const isRotate = rotate % 180 !== 0;

                this.data.set('isMoving', false);

                // 缩放时根据情况判断是否需要还原坐标
                const fixState = getFixScaleEleTransPosition(
                    isRotate ? height : width,
                    isRotate ? width : height,
                    left,
                    top,
                );
                if (fixState) {
                    this.setFramePosition(fixState);
                }
            }
        };
        this.onMouseMove = event => {
            const {visible, isMoving} = this.data.get();
            if (visible && isMoving) {
                this.setFramePosition({
                    x: event.pageX - this.originPosition.deltaX,
                    y: event.pageY - this.originPosition.deltaY
                }, event);
            }
        };
        this.onWheelMove = event => {
            const visible = this.data.get('visible');
            if (!visible) {
                return;
            }
            event.preventDefault();
            const wheelDirection = event.deltaY;
            this.data.set('lastWheelZoomDirection', {wheelDirection});
        };
    },
    attached() {
        this.frame & caf(this.frame);
        this.onMovingEvent();
        this.watch('isMoving', () => {
            this.onMovingEvent();
        });
        this.watch('visible', () => {
            this.onMovingEvent();
        });
        this.watch('lastWheelZoomDirection', lastWheelZoomDirection => {
            const {wheelDirection} = lastWheelZoomDirection;
            if (wheelDirection > 0) {
                this.zoomOut();
            } else if (wheelDirection < 0) {
                this.zoomIn();
            }
        });
    },
    setFramePosition(newState) {
        // 帧动画优化
        if (!this.frame) {
            this.frame = raf(() => {
                const position = this.data.get('position');
                const memoState = {...position, ...this.latestState};
                this.data.merge('position', memoState);
                this.frame = null;
            });
        }
        this.latestState = newState;
    },
    detached() {
        this.removeListeners();
    },
    onMaskClick(e) {
        if (e.target === e.currentTarget) {
            this.fire('close');
        }
    },
    onClose() {
        this.fire('close');
    },
    zoomIn() {
        const scale = this.data.get('scale');
        this.data.set('scale', scale + 1);
        this.setFramePosition(initialPosition);
    },
    zoomOut() {
        const scale = this.data.get('scale');
        if (scale > 1) {
            this.data.set('scale', scale - 1);
        }
        this.setFramePosition(initialPosition);
    },
    rotateRight() {
        const rotate = this.data.get('rotate');
        this.data.set('rotate', rotate + 90);
    },
    rotateLeft() {
        const rotate = this.data.get('rotate');
        this.data.set('rotate', rotate - 90);
    },
    onMouseDown(event) {
        // Only allow main button
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const {position} = this.data.get();
        this.originPosition.deltaX = event.pageX - position.x;
        this.originPosition.deltaY = event.pageY - position.y;
        this.originPosition.originX = position.x;
        this.originPosition.originY = position.y;

        this.data.set('isMoving', true);
    },
    onMovingEvent() {
        this.removeListeners();

        window.addEventListener('mouseup', this.onMouseUp, false);
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('wheel', this.onWheelMove, {
            passive: false
        });

        this.removeListeners = () => {
            window.removeEventListener('mouseup', this.onMouseUp);
            window.removeEventListener('mousemove', this.onMouseUp);
            window.removeEventListener('wheel', this.onWheelMove);
        };
    },
    onAfterClose() {
        this.data.assign({
            scale: 1,
            rotate: 0
        });
        this.setFramePosition(initialPosition);
    },
    onSwitchLeft(event) {
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const currentPreviewIndex = this.data.get('currentPreviewIndex');
        const previewUrlsKeys = this.data.get('previewUrlsKeys');
        if (currentPreviewIndex > 0) {
            this.dispatch('santd_image_preview_set_current', previewUrlsKeys[String(currentPreviewIndex - 1)]);
        }
    },
    onSwitchRight(event) {
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const currentPreviewIndex = this.data.get('currentPreviewIndex');
        const previewUrlsKeys = this.data.get('previewUrlsKeys');
        const previewGroupCount = this.data.get('previewGroupCount');
        if (currentPreviewIndex < previewGroupCount - 1) {
            this.dispatch('santd_image_preview_set_current', previewUrlsKeys[String(currentPreviewIndex + 1)]);
        }
    }
});
