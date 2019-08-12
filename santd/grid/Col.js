/**
 * @file Santd col file
 **/
import san, {DataTypes} from 'san';
import {classCreator, type} from '../core/util';
import Row from './Row.js';

const cc = classCreator('col');
const SUPPORT_PROPS = ['order', 'offset', 'pull', 'push'];
const SUPPORT_SCREENS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export default san.defineComponent({

    dataTypes: {
        span: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        order: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        offset: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        push: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        pull: DataTypes.oneOfType([DataTypes.string, DataTypes.number]),
        xs: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        sm: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        md: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        lg: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        xl: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object]),
        xxl: DataTypes.oneOfType([DataTypes.number, DataTypes.string, DataTypes.object])
    },
    computed: {
        styleClass() {
            let arr = [];
            let data = this.data;
            let span = data.get('span');
            arr.push(cc());
            if (span !== undefined) {
                arr.push(cc(span + ''));
            }

            SUPPORT_PROPS.forEach(key => {
                let value = data.get(key);
                if (value) {
                    arr.push(cc(`${key}-${value}`));
                }

            });

            SUPPORT_SCREENS.forEach(size => {
                let value = data.get(size);
                if (!value) {
                    return;
                }

                let sizeProps = {};
                if (type(value, 'number') || type(value, 'string')) {
                    // console.log(typeof value);
                    sizeProps.span = +value;
                }
                else {
                    sizeProps = value || {};
                }
                if (sizeProps.span) {
                    arr.push(cc(`${size}-${sizeProps.span}`));
                }

                SUPPORT_PROPS.forEach(key => {
                    if (sizeProps[key] || +sizeProps[key] === 0) {
                        arr.push(cc(`${size}-${key}-${sizeProps[key]}`));
                    }

                });

            });
            this.data.get('className') && arr.push(this.data.get('className'));

            return arr;
        }
    },
    getGutter(data) {
        let gutter = data.get('gutter');
        if (typeof gutter === 'object') {
            let screens = data.get('screens');
            for (let i = 0; i <= SUPPORT_SCREENS.length; i++) {
                const breakpoint = SUPPORT_SCREENS[i];
                if (screens[breakpoint] && gutter[breakpoint] !== undefined) {
                    return gutter[breakpoint];
                }
            }
        }

        return gutter;
    },
    attached() {
        let parent = this.parent;
        while (parent && !(parent instanceof Row)) {
            parent = parent.parent;
        }
        if (parent && parent.data) {
            let gutter = +this.getGutter(parent.data);
            if (gutter) {
                gutter = gutter / 2;
                this.data.set('colStyle', {
                    'padding-left': gutter + 'px',
                    'padding-right': gutter + 'px'
                });
            }
        }
    },
    initData() {
        return {
            colStyle: {}
        };
    },
    template: `
        <div class="{{styleClass}}" style="{{colStyle}}">
            <slot></slot>
        </div>
    `
});
