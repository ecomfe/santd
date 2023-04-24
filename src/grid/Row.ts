/**
 * @file Santd row file
 **/
import {Component, NodeType} from 'san';
import Base from 'santd/base';
import {classCreator} from '../core/util';
import Col from './Col';
import type * as I from './interface';


const cc = classCreator('row');
const baseClass = cc();


let enquire: Enquire = null;
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: string) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = require('enquire.js');
}

const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
};

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'] as const;

function isTextNode(node: I.LoopNode): node is I.TextNode {
    return node.nodeType === NodeType.TEXT;
}

function loopCMPT(list: I.LoopNode[]| undefined, gutter: number) {
    list && list.length && list.forEach(item => {
        if (item instanceof Col) {
            // TODO: slotNode 不存在 data 属性，所以强制指定
            (item as Component).data.set('colStyle', `padding-left:${gutter}px;padding-right:${gutter}px;`);
        }
        !isTextNode(item) && loopCMPT(item.children, gutter);
    });
}

export default class Row extends Base<I.RowState, I.RowProps> {
    static template = /* html */`
        <div class="{{classes}} row-hj" style="{{styles}}">
            <slot />
        </div>
    `

    static computed: I.RowComputed = {
        classes(this: Row) {
            const arr = [baseClass];

            const type = this.data.get('type');
            const align = this.data.get('align');
            const justify = this.data.get('justify');

            if (type === 'flex') {
                arr.push(cc(type));
                align && arr.push(cc(`${type}-${align}`));
                justify && arr.push(cc(`${type}-${justify}`));
            }

            return arr;
        }
    }

    private calcStyles: I.WatchFunType | undefined = undefined;

    initData(): I.RowState {
        return {
            screens: {},
            type: 'normal',
            gutter: 0
        };
    }

    inited() {
        this.calcStyles = () => {
            let gutter = this.getGutter();
            if (gutter) {
                gutter = +gutter / -2;
                this.data.set('styles', `margin-left: ${gutter}px; margin-right:${gutter}px;`);
            }
        };

        this.calcStyles();
        this.watch('gutter', this.calcStyles);

    }

    attached() {
        let gutter = this.getGutter();
        if (gutter) {
            const slots = this.slot() as I.SlotNode[];

            if (slots && slots.length) {
                gutter = +gutter / 2;
                loopCMPT(slots, gutter);
            }
        }

        this.nextTick(() => {
            responsiveArray.forEach(screen =>
                enquire?.register(responsiveMap[screen], {
                    match: () => {
                        const gutter = +this.data.get('gutter');

                        if (!isNaN(gutter)) {
                            this.data.merge('screens', {[screen]: true});
                        }
                    },
                    unmatch: () => {
                        const gutter = +this.data.get('gutter');
                        if (!isNaN(+gutter)) {
                            this.data.merge('screens', {[screen]: false});
                        }
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy() {}
                })
            );
        });
    }

    getGutter() {
        const gutter = this.data.get('gutter');
        if (typeof gutter === 'object') {
            const screens = this.data.get('screens');

            for (let i = 0; i <= responsiveArray.length; i++) {
                const breakpoint = responsiveArray[i];
                if (screens[breakpoint] && gutter[breakpoint] != null) {
                    return gutter[breakpoint];
                }
            }
        }

        return gutter;
    }

    disposed() {
        responsiveArray.forEach(screen => enquire?.unregister(responsiveMap[screen]));
    }
}
