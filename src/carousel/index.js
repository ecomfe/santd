/**
 * @file 组件 carousel
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import Track from './Track';

const prefixCls = classCreator('carousel')();

export default san.defineComponent({
    template: `
        <div class="${prefixCls} {{vertical ? '${prefixCls}-vertical' : ''}}">
            <div class="slick-slider slick-initialized {{vertical ? 'slick-vertical' : ''}}" style="opacity:{{showCompo ? '1' : '0'}}">
                <div class="slick-list"
                    style="{{vertical && clientHeight ? 'height:' + clientHeight + 'px' : ''}}">
                    <s-track
                        clientWidth="{{clientWidth}}"
                        vertical="{{vertical}}"
                        slickIndex="{{slickIndex}}"
                        speed="{{speed}}"
                        easing="{{easing}}"
                        animating="{{animating}}"
                        on-init="handleInit"
                        on-transitionend="animationEnd"
                    ><slot />
                    </s-track>
                </div>
                <ul class="slick-dots slick-dots-{{dotPosition}}" style="display: block;" s-if="dots">
                    <li s-for="dot in slickDots" class="{{dot === curIndex ? 'slick-active' : ''}}">
                        <button on-click="handleChange(dot)">{{dot}}</button>
                    </li>
                </ul>
            </div>
        </div>
    `,
    initData() {
        return {
            clientWidth: 0,
            clientHeight: 0,
            curIndex: 0,
            slickIndex: 1,
            slickDots: [],
            dontAnimate: false,
            animating: false,
            dots: true,
            easing: 'linear',
            dotPosition: 'bottom',
            effect: 'scrollx',
            autoplay: false,
            autoplaySpeed: 3000,
            speed: 500
        };
    },
    components: {
        's-track': Track
    },
    computed: {
        vertical() {
            const dotPosition = this.data.get('dotPosition');
            return dotPosition === 'left' || dotPosition === 'right';
        }
    },

    next() {
        let {curIndex, slickDots} = this.data.get();
        this.handleChange((curIndex + 1) % slickDots.length);
    },

    prev() {
        let {curIndex, slickDots} = this.data.get();
        curIndex--;
        this.handleChange(curIndex > -1 ? curIndex : slickDots.length - 1);
    },

    goTo(slideNumber = 0) {
        const len = this.data.get('slickDots').length;
        const index = Math.min(Math.max(0, slideNumber), len - 1);
        this.handleChange(index);
    },

    handleInit(e) {
        this.data.set('slickDots', e.slickDots);
        setTimeout(() => {
            this.data.set('clientHeight', e.clientHeight);
            this.data.set('showCompo', true);
        }, 0);
    },

    attached() {
        let clientWidth = this.el.clientWidth;
        this.data.set('clientWidth', clientWidth);

        const autoplay = this.data.get('autoplay');
        const autoplaySpeed = this.data.get('autoplaySpeed');
        if (autoplay && !this.autoplayTimer) {
            this.autoplayTimer = setInterval(() => {
                this.handleChange(this.data.get('curIndex') + 1);
            }, autoplaySpeed);
        }
    },
    detached() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    },

    handleChange(index) {
        let len = this.data.get('slickDots').length;
        let curIndex = this.data.get('curIndex');
        let slickIndex = index + 1;

        if (index >= len) {
            index = 0;
            setTimeout(() => {
                this.data.set('slickIndex', 1);
            }, this.data.get('speed') * 2);
        }

        this.fire('beforeChange', {from: curIndex, to: index});

        this.data.set('curIndex', index);
        this.data.set('slickIndex', slickIndex);
        this.data.set('animating', true);

        this.fire('afterChange', index);
    },

    animationEnd() {
        this.data.set('animating', false);
    }
});
