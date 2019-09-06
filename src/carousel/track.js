/**
 * @file 组件 track
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="slick-track"
            style="{{trackStyle}}"
            on-transitionend="animationEnd"
        >
            <slot></slot>
        </div>
    `,
    initData() {
        return {
            slickTracks: [],
            slickDots: [],
            clientHeight: 0
        };
    },
    computed: {
        width() {
            let clientWidth = this.data.get('clientWidth');
            let slickTracks = this.data.get('slickTracks');
            slickTracks.forEach(item => {
                item.style.width = clientWidth + 'px';
            });
        },
        trackStyle() {
            const vertical = this.data.get('vertical');
            const count = this.data.get('slickTracks').length;
            const easing = this.data.get('easing');
            const animating = this.data.get('animating');
            const speed = this.data.get('speed');
            const slickIndex = this.data.get('slickIndex');
            const clientHeight = this.data.get('clientHeight');
            const clientWidth = this.data.get('clientWidth');

            let style = {opacity: 1};
            if (vertical) {
                if (clientHeight) {
                    style = {
                        ...style,
                        transform: `translate3d(0px, -${clientHeight * slickIndex}px, 0px)`,
                        height: `${clientHeight * count}px`
                    };
                }
            }
            else {
                style = {
                    ...style,
                    width: `${clientWidth * count}px`,
                    transform: `translate3d(-${clientWidth * slickIndex}px, 0px, 0px)`
                };
            }
            animating && (style.transition = `transform ${speed}ms ${easing} 0s`);
            return style;
        }
    },
    attached() {
        let {slickTracks, slickDots, clientHeight} = this.data.get();
        const children = this.el.children;
        let postNode = '';
        let preNode = '';
        Array.prototype.forEach.call(children, (node, index) => {
            let wrapper = document.createElement('div');
            wrapper.className = 'slick-slide';
            wrapper.style = 'outline: none;';
            wrapper.tabIndex = -1;
            let cNode = node.cloneNode(true);
            cNode.style = 'width: 100%; display: inline-block;';
            wrapper.appendChild(cNode);
            this.el.replaceChild(wrapper, node);
            slickTracks.push(wrapper);
            slickDots.push(index);
            if (index === 0) {
                postNode = wrapper.cloneNode(true);
            }
            if (index === children.length - 1) {
                preNode = wrapper.cloneNode(true);
                this.el.insertBefore(preNode, slickTracks[0]);
                this.el.appendChild(postNode);
                slickTracks.unshift(preNode);
                slickTracks.push(postNode);
            }
            clientHeight = clientHeight || wrapper.clientHeight;
        });
        this.data.set('slickDots', slickDots);
        this.data.set('slickTracks', slickTracks);
        this.data.set('clientHeight', clientHeight);
        this.fire('init', {slickDots, slickTracks, clientHeight});
    },
    animationEnd() {
        this.fire('transitionend');
    }
});
