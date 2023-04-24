/**
 * @file Santd col file
 **/
import {classCreator} from '../core/util';
import Row from './Row';
import Base from 'santd/base';
import type * as I from './interface';

const cc = classCreator('col');
const baseClass = cc();
const SUPPORT_PROPS = ['order', 'offset', 'pull', 'push'] as const;
const SUPPORT_SCREENS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

function isSizePropsDefined(value: I.ColSize, key: keyof I.ColSize): value is Required<I.ColSize> {
    return value[key] !== undefined;
}

export default class Col extends Base<{}, I.ColProps, I.ColComputed> {
    static template = /* html */`
        <div class="{{classes}}" style="{{colStyle}}">
            <slot />
        </div>
    `;

    parent!: Base;

    static computed: I.ColComputed =  {
        classes(this: Col) {
            let arr = [baseClass];
            let data = this.data;

            const span = data.get('span');
            span && arr.push(cc(span));

            for (let i = 0; i < SUPPORT_PROPS.length; i++) {
                let key = SUPPORT_PROPS[i];
                let value = data.get(key);
                value && arr.push(cc(`${key}-${value}`));
            }

            for (let i = 0; i < SUPPORT_SCREENS.length; i++) {
                let size = SUPPORT_SCREENS[i];
                let value = data.get(size);
                if (value === undefined) {
                    continue;
                }

                let sizeProps = typeof value === 'object'
                    ? (value || {})
                    : {span: +value};
                sizeProps.span !== undefined && arr.push(cc(`${size}-${sizeProps.span}`));

                for (let j = 0; j < SUPPORT_PROPS.length; j++) {
                    let key = SUPPORT_PROPS[j];
                    if (sizeProps[key] || isSizePropsDefined(sizeProps, key) && +sizeProps[key] === 0) {
                        arr.push(cc(`${size}-${key}-${sizeProps[key]}`));
                    }
                }
            }

            return arr;
        }
    };

    attached(): void {
        // TODO： parentComponent? 没看到 parent 属性
        let parent = this.parent;
        while (parent && !(parent instanceof Row)) {
            parent = parent.parent;
        }

        if (parent && parent.data) {
            let gutter = this.getGutter(parent.data);

            if (gutter) {
                gutter = +gutter / 2;
                this.data.set('colStyle', `padding-left:${gutter};padding-right:${gutter};`);
            }
        }
    };

    getGutter(data: Row['data']) {
        let gutter = data.get('gutter');

        if (typeof gutter === 'object') {
            let screens = data.get('screens');

            for (let i = 0; i < SUPPORT_SCREENS.length; i++) {
                const breakpoint = SUPPORT_SCREENS[i];

                if (screens[breakpoint] && gutter[breakpoint] != null) {
                    return gutter[breakpoint];
                }
            }
        }

        return gutter;
    };
}
