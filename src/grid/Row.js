/**
 * @file Santd row file
 **/
import san, {DataTypes} from 'san';

import Col from './Col';
import {classCreator} from '../core/util';

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

function loopCMPT(list, gutter) {
    list && list.length && list.forEach(item => {
        if (item instanceof Col) {
            item.data.set('colStyle', `padding-left:${gutter}px;padding-right:${gutter}px;`);
        }
        loopCMPT(item.children, gutter);
    });
}


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
        this._calcStyles = () => {
            let gutter = +this.getGutter();
            if (gutter) {
                gutter = gutter / -2;
                this.data.set('styles', `margin-left: ${gutter}px; margin-right:${gutter}px;`);
            }
        };

        this._calcStyles();
        this.watch('gutter', this._calcStyles);

    },

    getGutter() {
        let gutter = this.data.get('gutter');
        if (typeof gutter === 'object') {
            let screens = this.data.get('screens');

            for (let i = 0; i <= responsiveArray.length; i++) {
                let breakpoint = responsiveArray[i];
                if (screens[breakpoint] && gutter[breakpoint] != null) {
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
                loopCMPT(slots, gutter);
            }
        }

        this.nextTick(() => {
            responsiveArray.forEach(screen =>
                enquire.register(responsiveMap[screen], {
                    match: () => {
                        let gutter = +this.data.get('gutter');

                        if (!isNaN(gutter)) {
                            this.data.merge('screens', {[screen]: true});
                        }
                    },
                    unmatch: () => {
                        let gutter = +this.data.get('gutter');
                        if (!isNaN(+gutter)) {
                            this.data.merge('screens', {[screen]: false});
                        }
                    },
                    // Keep a empty destory to avoid triggering unmatch when unregister
                    destroy() {}
                })
            );
        });
    },

    disposed() {
        responsiveArray.forEach(screen => enquire.unregister(responsiveMap[screen]));
    },

    initData() {
        return {
            screens: {},
            type: 'normal',
            gutter: 0
        };
    },

    template: `
        <div class="{{classes}}" style="{{styles}}">
            <slot />
        </div>
    `
});
