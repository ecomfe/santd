/**
 * @file image 预览组件
 * @author liulu36
 */
import './style/index.less';
import Base from 'santd/base';

import Icon from '../icon';
import Modal from '../modal';
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
import {
    IPreviewProps,
    OriginType,
    Positon
} from './interface';
interface PreviewComputed {
    previewGroupCount: ((this: Preview) => number) | number;
    showLeftOrRightSwitches: (this: Preview) => (boolean | undefined);
    previewUrlsKeys: ((this: Preview) => string[]) | string[];
    currentPreviewIndex: ((this: Preview) => number) | number;
    combinationSrc: (this: Preview) => string;
    disabledZoomOut: (this: Preview) => boolean;
    wrapClassName: (this: Preview) => string;
}

export default class Preview extends Base<IPreviewProps, PreviewComputed> {
    removeListeners?: () => void;
    originPosition?: OriginType;
    frame?: number | null;
    latestState?: Positon;
    onMouseMove?: (e: MouseEvent) => any;
    onMouseUp?: (e: MouseEvent) => any;
    onWheelMove?: (e: WheelEvent) => any;
    static template = `
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
    `;

    static components = {
        'std-modal': Modal,
        's-icon': Icon
    };
    static messages = {

    };
    initData():IPreviewProps {
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
    }
    static computed: PreviewComputed = {
        previewGroupCount() {
            const previewUrls = this.data.get('previewUrls');
            return Object.keys(previewUrls).length;
        },
        showLeftOrRightSwitches() {
            const isPreviewGroup = this.data.get('isPreviewGroup');
            const previewGroupCount = this.data.get('previewGroupCount') as number;
            return isPreviewGroup && previewGroupCount > 1;
        },
        previewUrlsKeys() {
            const previewUrls = this.data.get('previewUrls');
            return Object.keys(previewUrls);
        },
        currentPreviewIndex() {
            const previewUrlsKeys = this.data.get('previewUrlsKeys') as string[];
            const current = this.data.get('current');
            return previewUrlsKeys?.indexOf(String(current));
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
    };
    inited() {
        this.removeListeners = () => {};
        this.originPosition = {
            originX: 0,
            originY: 0,
            deltaX: 0,
            deltaY: 0
        };
        this.onMouseUp = () => {
            const {visible, isMoving, scale = 0, rotate = 0} = this.data.get();
            if (visible && isMoving) {
                const imgRef: unknown = this.ref('imgRef');
                const width = (imgRef as HTMLElement).offsetWidth * scale;
                const height = (imgRef as HTMLElement).offsetHeight * scale;
                const {left, top} = getOffset(imgRef);
                const isRotate = rotate % 180 !== 0;

                this.data.set('isMoving', false);

                // 缩放时根据情况判断是否需要还原坐标
                const fixState = getFixScaleEleTransPosition(
                    isRotate ? height : width,
                    isRotate ? width : height,
                    left,
                    top,
                ) as Positon;
                if (fixState) {
                    this.setFramePosition(fixState);
                }
            }
        };
        this.onMouseMove = event => {
            const {visible, isMoving} = this.data.get();
            if (visible && isMoving && this.originPosition) {
                this.setFramePosition({
                    x: event.pageX - this.originPosition.deltaX,
                    y: event.pageY - this.originPosition.deltaY
                });
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
    }
    attached() {
        this.frame && caf(this.frame);
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
    }
    setFramePosition(newState: Positon) {
        // 帧动画优化
        if (!this.frame) {
            this.frame = raf(() => {
                const position = this.data.get('position');
                const memoState = {...position, ...this.latestState};
                this.data.merge('position', memoState);
                this.frame = null;
            }) as number;
        }
        this.latestState = newState;
    }
    detached() {
        this.removeListeners && this.removeListeners();
    }
    onMaskClick(e: Event) {
        if (e.target === e.currentTarget) {
            this.fire('close');
        }
    }
    onClose() {
        this.fire('close');
    }
    zoomIn() {
        const scale = this.data.get('scale');
        this.data.set('scale', scale + 1);
        this.setFramePosition(initialPosition);
    }
    zoomOut() {
        const scale = this.data.get('scale');
        if (scale > 1) {
            this.data.set('scale', scale - 1);
        }
        this.setFramePosition(initialPosition);
    }
    rotateRight() {
        const rotate = this.data.get('rotate');
        this.data.set('rotate', rotate + 90);
    }
    rotateLeft() {
        const rotate = this.data.get('rotate');
        this.data.set('rotate', rotate - 90);
    }
    onMouseDown(event: MouseEvent) {
        // Only allow main button
        if (event.button !== 0) {
            return;
        }
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const {position = {
            x: 0,
            y: 0,
        }} = this.data.get();
        if (this.originPosition) {
            this.originPosition.deltaX = event.pageX - position!.x;
            this.originPosition.deltaY = event.pageY - position!.y;
            this.originPosition.originX = position!.x as number;
            this.originPosition.originY = position!.y as number;
        }

        this.data.set('isMoving', true);
    }
    onMovingEvent() {
        this.removeListeners && this.removeListeners();

        window.addEventListener('mouseup', this.onMouseUp as (e: MouseEvent) => any, false);
        window.addEventListener('mousemove', this.onMouseMove as (e: MouseEvent) => any, false);
        window.addEventListener('wheel', this.onWheelMove as (e: MouseEvent) => any, {
            passive: false
        });

        this.removeListeners = () => {
            window.removeEventListener('mouseup', this.onMouseUp as (e: MouseEvent) => any);
            window.removeEventListener('mousemove', this.onMouseMove as (e: MouseEvent) => any);
            window.removeEventListener('wheel', this.onWheelMove as (e: MouseEvent) => any);
        };
    }
    onAfterClose() {
        this.data.assign({
            scale: 1,
            rotate: 0
        });
        this.setFramePosition(initialPosition);
    }
    onSwitchLeft(event: Event) {
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const currentPreviewIndex = this.data.get('currentPreviewIndex') as number;
        const previewUrlsKeys = this.data.get('previewUrlsKeys') as string[];
        if (currentPreviewIndex > 0) {
            this.dispatch('santd_image_preview_set_current', previewUrlsKeys[currentPreviewIndex - 1]);
        }
    }
    onSwitchRight(event: Event) {
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        const currentPreviewIndex = this.data.get('currentPreviewIndex') as number;
        const previewUrlsKeys = this.data.get('previewUrlsKeys') as string[];
        const previewGroupCount = this.data.get('previewGroupCount') as number;
        if (currentPreviewIndex < previewGroupCount - 1) {
            this.dispatch('santd_image_preview_set_current', previewUrlsKeys[currentPreviewIndex + 1]);
        }
    }
};
