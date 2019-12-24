/**
 * @file 组件 track
 * @author zhangtingting12 <zhangtingting12@baidu.com>
 */

import san from 'san';

export default san.defineComponent({
    template: `
        <div class="slick-track"
            style="opacity: 1;{{trackStyle}}"
            on-transitionend="animationEnd"
        >
            <slot/>
        </div>
    `,

    initData() {
        return {
            clientHeight: 0
        };
    },

    inited() {
        this.slickTracks = [];
        this.slickDots = [];
    },

    disposed() {
        this.slickTracks = null;
        this.slickDots = null;
    },

    computed: {
        trackStyle() {
            const vertical = this.data.get('vertical');
            const count = this.data.get('tracksCount');
            const easing = this.data.get('easing');
            const speed = this.data.get('speed');
            const slickIndex = this.data.get('slickIndex');
            const clientHeight = this.data.get('clientHeight');
            const clientWidth = this.data.get('clientWidth');

            let style = this.data.get('animating')
                ? `transition:transform ${speed}ms ${easing} 0s;`
                : '';

            if (vertical) {
                if (clientHeight) {
                    style += `
                        transform: translate3d(0px, -${clientHeight * slickIndex}px, 0px);
                        height: ${clientHeight * count}px;
                    `;
                }
            }
            else {
                style += `
                    width: ${clientWidth * count}px;
                    transform: translate3d(-${clientWidth * slickIndex}px, 0px, 0px);
                `;
            }

            return style;
        }
    },

    attached() {
        let clientHeight = this.data.get('clientHeight');

        let children = this.el.children;
        let len = children.length;

        let postNode;
        let preNode;

        for (let i = 0; i < len; i++) {
            let node = children[i];

            let wrapper = document.createElement('div');
            wrapper.className = 'slick-slide';
            wrapper.style.outline = 'none';
            wrapper.tabIndex = -1;

            let cNode = node.cloneNode(true);
            cNode.style = 'width: 100%; display: inline-block;';
            wrapper.appendChild(cNode);

            this.el.replaceChild(wrapper, node);
            this.slickTracks.push(wrapper);
            this.slickDots.push(i);


            if (!i) {
                postNode = wrapper.cloneNode(true);
            }

            if (i === children.length - 1) {
                preNode = wrapper.cloneNode(true);
                this.el.insertBefore(preNode, this.slickTracks[0]);
                this.el.appendChild(postNode);
                this.slickTracks.unshift(preNode);
                this.slickTracks.push(postNode);
            }

            clientHeight = clientHeight || wrapper.clientHeight;
        }

        this.data.set('clientHeight', clientHeight);
        this.data.set('tracksCount', len + 2);

        this.watch('clientWidth', value => {
            this.slickTracks.forEach(trackEl => {
                trackEl.style.width = value + 'px';
            });
        });

        this.fire('init', {
            slickDots: this.slickDots,
            slickTracks: this.slickTracks,
            clientHeight
        });
    },

    animationEnd() {
        this.fire('transitionend');
    }
});
