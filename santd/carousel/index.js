/**
 * @file 组件 carousel
 * @author chenkai13 <chenkai13@baidu.com>
 */

import './style/index.less';
import san from 'san';
import {classCreator, getComponentChildren} from 'santd/core/util';
import classNames from 'classnames';

const cc = classCreator('carousel');
const prefix = cc();

export default san.defineComponent({
    template: `
    	<div class="{{cls}}">
            <div class="{{slickCls}}" style="{{showCompo ? 'opacity: 1' : 'opacity: 0'}}">
                <div class="slick-list"
                    style="{{listStyle}}">
                    <div class="slick-track" style="{{trackStyle}}" s-ref="track">
                    </div>
                </div>
                <ul class="slick-dots" style="display: block;" s-if="dots">
                    <li class="" s-for="dot, index in slickDots"
                        class="{{index === curIndex ? 'slick-active' : ''}}">
                        <button on-click="handleChange(index)">{{dot}}</button>
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
            slickDots: [],
            vertical: false,
            dots: true,
            easing: 'ease',
            autoplay: false
        };
    },
    computed: {
        cls() {
            let vertical = this.data.get('vertical');
            return classNames(prefix, {
                [`${prefix}-vertical`]: vertical
            });
        },
        listStyle() {
            let vertical = this.data.get('vertical');
            let clientHeight = this.data.get('clientHeight');
            if (vertical && clientHeight) {
                let slickDots = this.data.get('slickDots');
                let count = slickDots.length;
                return {
                    height: `${clientHeight / count}px`
                };
            }
            return '';
        },
        slickCls() {
            let vertical = this.data.get('vertical');
            return classNames('slick-slider', {
                'slick-initialized': true,
                'slick-vertical': vertical
            });
        },
        trackStyle() {
            let vertical = this.data.get('vertical');
            let slickDots = this.data.get('slickDots');
            let easing = this.data.get('easing');
            let count = slickDots.length;
            if (vertical) {
                let clientHeight = this.data.get('clientHeight');
                if (clientHeight) {
                    let curIndex = this.data.get('curIndex');
                    return {
                        opacity: 1,
                        transform: `translate3d(0px, -${clientHeight / count * curIndex}px, 0px)`,
                        transition: `transform 500ms ${easing} 0s`
                    };
                }
                return '';
            } else {
                let clientWidth = this.data.get('clientWidth');
                let curIndex = this.data.get('curIndex');
                return {
                    width: `${clientWidth * count}px`,
                    opacity: 1,
                    transform: `translate3d(-${clientWidth * curIndex}px, 0px, 0px)`,
                    transition: `transform 500ms ${easing} 0s`
                };
            }
        }
    },
    getSlotDom(node) {
        let res = '';
        if (node.tagName && node.hotspot.sourceNode) {
            res = node.hotspot.sourceNode;
            if (node.children) {
                node.children.forEach(child => {
                    let cdom = this.getSlotDom(child);
                    if (res && cdom) {
                        if (cdom instanceof HTMLElement) {
                            res.appendChild(cdom);
                        } else {
                            res.innerHTML += cdom;
                        }
                    }
                });
            }
        } else if (node.textExpr && node.textExpr.value) {
            res = node.textExpr.value;
        }
        return res;
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
        this.handleChange(slideNumber);
    },
    attached() {
        let clientWidth = this.el.clientWidth;
        this.data.set('clientWidth', clientWidth);
        let slist = getComponentChildren(this.sourceSlots.noname,
            item => item.tagName, 1);
        let slickDots = [];
        slist.forEach((item, index) => {
            let node = this.getSlotDom(item);
            let wrapper = document.createElement('div');
            wrapper.style = `outline: none; width: ${clientWidth}px;`;
            wrapper.className = 'slick-slide';
            node.style = 'width: 100%; display: inline-block;';
            wrapper.appendChild(node);
            this.ref('track').appendChild(wrapper);
            slickDots.push(index);
        });
        this.data.set('slickDots', slickDots);
        setTimeout(() => {
            this.data.set('clientHeight', this.el.clientHeight);
            this.data.set('showCompo', true);
        }, 0);

        const autoplay = this.data.get('autoplay');
        if (autoplay) {
            window.setInterval(() => {
                let curIndex = this.data.get('curIndex');
                ++curIndex;
                if (curIndex >= this.data.get('slickDots').length) {
                    curIndex = 0;
                }
                this.handleChange.bind(this)(curIndex);
            }, 3000);
        }
    },
    handleChange(index) {
        let curIndex = this.data.get('curIndex');
        this.fire('beforeChange', {from: curIndex, to: index});
        this.data.set('curIndex', index);
        this.fire('afterChange', index);
    }
});
