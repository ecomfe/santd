/**
 * @file 组件 back-top
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {on, off} from '../core/util/dom';
import {classCreator} from '../core/util';

const prefixCls = classCreator('back-top')();

export default san.defineComponent({
    dataTypes: {
        visibilityHeight: DataTypes.number,
        target: DataTypes.func
    },
    
    getCurrentScrollTop() {
        let targetNode = this.data.get('target')();
        if (targetNode === window) {
            return window.pageYOffset
                || document.body.scrollTop
                || document.documentElement.scrollTop;
        }
        return targetNode.scrollTop;
    },

    setScrollTop(value) {
        let targetNode = this.data.get('target')();
        if (targetNode === window) {
            document.body.scrollTop = value;
            document.documentElement.scrollTop = value;
        }
        else {
            targetNode.scrollTop = value;
        }
    },

    scrollToTop(e) {
        this.setScrollTop(0);
        this.fire('click', e);
    },

    initData() {
        return {
            visibilityHeight: 400,
            target() {
                return window;
            },
            visible: false,
            hasSlot: false
        };
    },

    handleScroll() {
        const scrollTop = this.getCurrentScrollTop();
        this.data.set('visible', scrollTop > this.data.get('visibilityHeight'));
    },

    attached() {
        this._scroll = this.handleScroll.bind(this);
        on(window, 'scroll', this._scroll);
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            this.data.set('hasSlot', true);
        }
        this.handleScroll();
    },

    disposed() {
        off(window, 'scroll', this._scroll);
        this._scroll = null;
    },

    template: `
        <div>
            <div s-if="{{visible}}" class="${prefixCls}" on-click="scrollToTop($event)">
                <div class="${prefixCls}-content" data-hasSlot="{{hasSlot}}">
                    <div class="${prefixCls}-icon" s-if="{{!hasSlot}}"></div>
                    <slot/>
                </div>
            </div>
        </div>
    `
});