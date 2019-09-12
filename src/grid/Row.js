/**
 * @file Santd row file
 **/
import san, {DataTypes} from 'san';

import Col from './Col';
import {classCreator, type} from '../core/util';

const cc = classCreator('row');
const baseClass = cc();


let enquire = null;
// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
    const matchMediaPolyfill = mediaQuery => {
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

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export default san.defineComponent({
    dataTypes: {
        type: DataTypes.oneOf(['normal', 'flex']),
        align: DataTypes.oneOf(['top', 'middle', 'bottom']),
        gutter: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        justify: DataTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between'])
    },

    computed: {
        classes() {
            let arr = [baseClass];

            let type = this.data.get('type');
            let align = this.data.get('align');
            let justify = this.data.get('justify');

            if (type === 'flex') {
                arr.push(cc(type));
                align && arr.push(cc(`${type}-${align}`));
                justify && arr.push(cc(`${type}-${justify}`));
            }

            return arr;
        }
    },

    inited() {
        let gutter = +this.getGutter();
        if (gutter) {
            gutter = gutter / -2;
            this.data.set('rowStyle', `margin-left: ${gutter}px; margin-right:${gutter}px;`);
        }

        this.watch('gutter', val => {
            let gutter = +this.getGutter();
            if (gutter) {
                gutter = gutter / -2;
                this.data.set('rowStyle', `margin-left: ${gutter}px; margin-right:${gutter}px;`);
            }
        });
    },

    getGutter() {
        const data = this.data;
        let gutter = data.get('gutter');
        if (typeof gutter === 'object') {
            let screens = data.get('screens');
            // console.log(screens);
            for (let i = 0; i <= responsiveArray.length; i++) {
                const breakpoint = responsiveArray[i];
                if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
                    return gutter[breakpoint];
                }
            }
        }

        return gutter;
    },

    attached() {
        let gutter = +this.getGutter();
        if (gutter) {
            const slots = this.slot();
            if (slots && slots.length) {
                gutter = gutter / 2;
                const loopCMPT = list => {
                    list && list.length && list.forEach(item => {
                        if (item instanceof Col) {
                            item.data.set('colStyle', {
                                'padding-left': gutter + 'px',
                                'padding-right': gutter + 'px'
                            });
                        }
                        loopCMPT(item.children);
                    });
                };
                loopCMPT(slots);
            }
        }

        this.nextTick(() => {
            Object.keys(responsiveMap).map(screen =>
                enquire.register(responsiveMap[screen], {
                    match: () => {
                        const data = this.data;

                        let gutter = data.get('gutter');

                        if (type(gutter, 'number') || (type(gutter, 'string') && !isNaN(+gutter))) {
                            let obj = {};
                            obj[screen] = true;
                            data.merge('screens', obj);
                        }
                    },
                    unmatch: () => {
                        const data = this.data;
                        let gutter = data.get('gutter');
                        if (type(gutter, 'number') || (type(gutter, 'string') && !isNaN(+gutter))) {
                            let obj = {};
                            obj[screen] = false;
                            data.merge('screens', obj);
                        }
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy() {}
                })
            );
        });
    },

    disposed() {
        Object.keys(responsiveMap).map(screen => enquire.unregister(responsiveMap[screen]));
    },

    initData() {
        return {
            screens: {},
            type: 'normal',
            gutter: 0
        };
    },

    template: `
        <div class="{{classes}}" style="{{rowStyle}}">
            <slot />
        </div>
    `
});