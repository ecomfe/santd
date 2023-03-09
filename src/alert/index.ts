/**
 * @file 组件 alert
 * @author baozhixin <baozhixin@baidu.com>
 * @borrows https://ant.design/components/alert-cn/
 */

import './style/index.less';
import {classCreator} from '../core/util';
import {addClass} from '../core/util/dom';
import Icon from '../icon';
import Base from 'santd/base';
import type * as I from './interface';

const prefixCls = classCreator('alert')();
const iconMap = {
    success: 'check-circle',
    info: 'info-circle',
    error: 'close-circle',
    warning: 'exclamation-circle'
};

export default class Alert extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div class="{{classes}}" on-animationend="animationEnd" style="{{elStyle}}">
            <slot s-if="{{showIcon}}" name="icon">
                <s-icon
                    class="${prefixCls}-icon"
                    type="{{icon || iconMap[type] || 'smile'}}"
                    theme="{{description ? 'outlined' : 'filled'}}"
                />
            </slot>
            <span class="${prefixCls}-message">{{message}}</span>
            <span class="${prefixCls}-description">{{description}}</span>
            <a s-if="{{closable}}" on-click="handleClose" class="${prefixCls}-close-icon">
                {{closeText}}
                <s-icon s-if="{{!closeText}}" type="close" />
            </a>
        </div>
    `;

    static components = {
        's-icon': Icon
    };

    static computed: I.Computed = {
        classes(this: Alert) {
            const data = this.data;
            const type = data.get('type');
            const closing = data.get('closing');
            const closable = data.get('closable');
            const description = data.get('description');
            const showIcon = data.get('showIcon');
            const banner = data.get('banner');

            let classArr = [prefixCls, `${prefixCls}-${type}`];
            !closing && classArr.push(`${prefixCls}-close`, `${prefixCls}-slide-up-leave`);
            description && classArr.push(`${prefixCls}-with-description`);
            !showIcon && classArr.push(`${prefixCls}-no-icon`);
            banner && classArr.push(`${prefixCls}-banner`);
            closable && classArr.push(`${prefixCls}-closable`);

            return classArr;
        }
    };

    initData(): I.State {
        return {
            closing: true,
            iconMap
        };
    };

    inited(): void {
        const data = this.data;
        let type = data.get('type');

        // 有closeText时可关闭
        data.get('closeText') && data.set('closable', true);

        // banner模式
        if (data.get('banner')) {
            // 默认显示icon
            false !== data.get('showIcon') && data.set('showIcon', true);
            // 默认类型warning
            undefined === type && data.set('type', type = 'warning');
        }

        // 默认类型info
        undefined === type && data.set('type', 'info');
    };

    attached(): void {
        const customIcon = this.slot('icon')[0];
        if (customIcon && customIcon.isInserted) {
            // @ts-ignore
            customIcon.children.forEach(item => {
                addClass(item.el, `${prefixCls}-icon`); // 自定义icon添加class
            });
        }

        // 确定有关闭按钮时添加高度，保证动画效果
        if (this.data.get('closable') && this.el) {
            // @ts-ignore
            this.data.set('elStyle', `height: ${this.el.offsetHeight}px`);
        }
    };

    handleClose(e: Event): void {
        e.preventDefault();
        this.data.set('closing', false);
        this.fire('close', e);
    };

    animationEnd(): void {
        this.data.set('closing', true);
        this.fire('afterClose');
        this.el && this.el.remove();
    };
};
