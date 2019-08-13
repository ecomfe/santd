/**
 * @file 组件 carousel
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator} from '../core/util';
import Track from './src/track';

const prefix = classCreator('carousel')();

export default san.defineComponent({
    template: `
    	<div class="{{cls}}">
            <div class="{{slickCls}}" style="{{showCompo ? 'opacity: 1' : 'opacity: 0'}}">
                <div class="slick-list"
                    style="{{listStyle}}">
                    <s-track
                        clientWidth="{{clientWidth}}"
                        vertical="{{vertical}}"
                        slickIndex="{{slickIndex}}"
                        speed="{{speed}}"
                        easing="{{easing}}"
                        animating="{{animating}}"
                        on-init="handleInit"
                        on-transitionend="animationEnd"
                    ><slot></slot>
                    </s-track>
                </div>
                <ul class="{{dotsStyle}}" style="display: block;" s-if="dots">
                    <li class="" s-for="dot, index in slickDots"
                        class="{{dot === curIndex ? 'slick-active' : ''}}">
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
            slickTracks: [],
            dontAnimate: false,
            animating: false,
            // vertical: false,
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
        cls() {
            const vertical = this.data.get('vertical');
            let classArr = [prefix];
            vertical && classArr.push(`${prefix}-vertical`);
            return classArr;
        },
        listStyle() {
            let vertical = this.data.get('vertical');
            let clientHeight = this.data.get('clientHeight');
            return (vertical && clientHeight) ? {
                height: `${clientHeight}px`
            } : '';
        },
        slickCls() {
            const vertical = this.data.get('vertical');
            let classArr = ['slick-slider', 'slick-initialized'];
            vertical && classArr.push('slick-vertical');
            return classArr;
        },
        vertical() {
            const dotPosition = this.data.get('dotPosition');
            return dotPosition === 'left' || dotPosition === 'right';
        },
        dotsStyle() {
            const dotPosition = this.data.get('dotPosition');
            return ['slick-dots', `slick-dots-${dotPosition}`];
        }
    },
    next() {
        let {curIndex, slickDots} = this.data.get();
        curIndex = (curIndex + 1) % slickDots.length;
        this.handleChange(curIndex);
    },
    prev() {
        let {curIndex, slickDots} = this.data.get();
        curIndex--;
        curIndex = curIndex > -1 ? curIndex : slickDots.length - 1;
        this.handleChange(curIndex);
    },
    goTo(slideNumber = 0) {
        const len = this.data.get('slickDots').length;
        const index = Math.min(Math.max(0, slideNumber), len - 1);
        this.handleChange(index);
    },
    inited() {
        this.autoplayTimer = null;
    },
    handleInit(e) {
        this.data.set('slickDots', e.slickDots);
        this.data.set('slickTracks', e.slickTracks);
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
            this.autoplayTimer = window.setInterval(() => {
                let curIndex = this.data.get('curIndex');
                let isLastOne = false;
                ++curIndex;
                if (curIndex >= this.data.get('slickDots').length) {
                    curIndex = 0;
                    isLastOne = true;
                }
                this.handleChange.bind(this)(curIndex, isLastOne);
            }, autoplaySpeed);
        }
    },
    detached() {
        this.autoplayTimer && clearInterval(this.autoplayTimer);
        this.autoplayTimer = null;
    },
    handleChange(index, isLastOne = false) {
        const curIndex = this.data.get('curIndex');
        this.fire('beforeChange', {from: curIndex, to: index});
        this.data.set('curIndex', index);
        this.fire('afterChange', index);
        this.data.set('animating', true);
        this.setSlickIndex(isLastOne);
    },
    animationEnd() {
        this.data.set('animating', false);
    },
    setSlickIndex(isLastOne) {
        const curIndex = this.data.get('curIndex');
        let sindex = curIndex + 1;
        if (isLastOne) {
            const {speed, slickDots} = this.data.get();
            setTimeout(() => {
                this.data.set('slickIndex', curIndex + 1);
            }, speed * 2);
            sindex = slickDots.length + 1;
        }
        this.data.set('slickIndex', sindex);
    }
});
