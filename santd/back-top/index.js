/**
 * @file 组件 back-top
 * @author raowenjuan <raowenjuan@baidu.com>
 */

import './style/index.less';
import san, {DataTypes} from 'san';
import {classCreator} from 'santd/core/util';

const cc = classCreator('back-top');
export default san.defineComponent({
    getDefaultTarget() {
        return window;
    },
    getCurrentScrollTop() {
        let getTarget = this.data.get('target') || this.getDefaultTarget;
        let targetNode = getTarget();
        if (targetNode === window) {
            return window.pageYOffset
                || document.body.scrollTop
                || document.documentElement.scrollTop;
        }
        return targetNode.scrollTop;
    },
    setScrollTop(value) {
        let getTarget = this.data.get('target') || this.getDefaultTarget;
        let targetNode = getTarget();
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
            target: '',
            visible: false,
            hasSlot: false
        };
    },
    inited() {
        if (this.sourceSlots.noname && this.sourceSlots.noname.length) {
            this.data.set('hasSlot', true);
        }
    },
    handleScroll() {
        let scrollTop = this.getCurrentScrollTop();
        this.data.set('visible', scrollTop > this.data.get('visibilityHeight'));
    },
    attached() {
        let $this = this;
        window.addEventListener('scroll', function () {
            $this.handleScroll();
        });
    },
    template: `<div>
            <div s-if="{{visible}}" class="${cc()}" on-click="scrollToTop($event)">
                <div class="${cc()}-content" data-hasSlot="{{hasSlot}}">
                    <div class="${cc()}-icon" s-if="{{!hasSlot}}"></div>
                    <slot></slot>
                </div>
            </div>
        </div>
    `
});
