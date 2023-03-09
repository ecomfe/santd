/**
 * @file 组件 back-top
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import Base from 'santd/base';
import './style/index.less';
import {on, off} from '../core/util/dom';
import {classCreator} from '../core/util';
import type * as I from './interface';

const prefixCls = classCreator('back-top')();

export default class BackTop extends Base<I.State, I.Props, I.Computed> {
    static template = /* html */ `
        <div>
            <div s-if="{{visible}}" class="${prefixCls}" on-click="scrollToTop($event)">
                <div class="${prefixCls}-content" data-hasSlot="{{hasSlot}}">
                    <div class="${prefixCls}-icon" s-if="{{!hasSlot}}"></div>
                    <slot/>
                </div>
            </div>
        </div>
    `;

    getCurrentScrollTop(): number {
        let targetNode = this.data.get('target')();
        if (targetNode === window) {
            return window.pageYOffset
                || document.body.scrollTop
                || document.documentElement.scrollTop;
        }
        return targetNode.scrollTop;
    };

    setScrollTop(value: number): void{
        let targetNode = this.data.get('target')();
        if (targetNode === window) {
            document.body.scrollTop = value;
            document.documentElement.scrollTop = value;
        }
        else {
            targetNode.scrollTop = value;
        }
    };

    scrollToTop(e: Event) {
        this.setScrollTop(0);
        this.fire('click', e);
    };

    handleScroll(): void {
        const scrollTop = this.getCurrentScrollTop();
        this.data.set('visible', scrollTop > this.data.get('visibilityHeight'));
    };

    _scroll!: null | (() => void);
    
    inited(): void {
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            this.data.set('hasSlot', true);
        }
    };

    attached(): void {
        this._scroll = this.handleScroll.bind(this);
        let node = this.data.get('target')();
        on(node, 'scroll', this._scroll);

        this.handleScroll();
    };

    disposed(): void {
        let node = this.data.get('target')();
        off(node, 'scroll', this._scroll);
        this._scroll = null;
    };

    initData(): I.State {
        return {
            visibilityHeight: 400,
            target() {
                return window;
            },
            visible: false
        };
    };
};