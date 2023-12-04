/**
 * @file 组件 notification/Notice
 * @author baozhixin <baozhixin@baidu.com>
 */

import filters from '../modal/Dialog';
import * as I from './interface';
import Base from 'santd/base';

export default class Notice extends Base<I.NoticeState, I.NoticeProps, I.NoticeComputed> {
    static template = /* html */ `
        <div class="{{noticeClass}}"
            style="{{style | css}}"
            on-click="handleClick"
            on-mouseenter="clearCloseTimer"
            on-mouseleave="startCloseTimer"
        >
            <div class="{{prefixCls}}-notice-content" s-ref="content"><slot/></div>
            <a s-if="closable" on-click="handleClose" class="{{prefixCls}}-notice-close" tabIndex="0">
                <slot name="close-icon">
                    <span class="{{prefixCls}}-notice-close-x">关闭</span>
                </slot>
            </a>
        </div>
    `;
    static computed = {
        noticeClass(this: Notice) {
            const data = this.data;
            const closable = data.get('closable');
            const componentClass = data.get('prefixCls') + '-notice';
            let classArr = [componentClass];
            closable && classArr.push(`${componentClass}-closable`);
            return classArr;
        }
    };
    filters = filters;
    initData(): I.NoticeState {
        return {
            duration: 1.5,
            style: {
                right: '50%'
            }
        };
    };
    attached(): void {
        this.startCloseTimer();
        this.watch('duration', () => {
            this.startCloseTimer();
        });
    };
    updated(): void  {
        if (this.data.get('update')) {
            this.startCloseTimer();
        }
    };
    handleClick(e?: MouseEvent): void  {
        e!.preventDefault();
        this.fire('click', e);
    };
    handleClose(e?: MouseEvent): void  {
        e && (e.preventDefault(), e.stopPropagation());
        this.clearCloseTimer();
        this.fire('close', e);
    };
    clearCloseTimer(): void  {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    };
    closeTimer: null | NodeJS.Timeout = null;
    startCloseTimer(): void  {
        const duration = this.data.get('duration');
        this.clearCloseTimer();
        if (duration) {
            this.closeTimer = setTimeout(() => {
                this.handleClose();
            }, duration * 1e3);
        }
    };
};
