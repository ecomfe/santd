/**
 * @file Santd icon file
 * @author mayihui@baidu.com
 **/
import Base from 'santd/base';
import {getSecondaryColor, isIconDefinition, MiniMap, withSuffix} from './utils';
import {
    InternalIconProps as Props,
    InternalIconState as State,
    InternalIconComputed as Computed,
    DoubleColorIcon
} from './interface';

let definitions = new MiniMap();
let twoToneColorPalette = {
    primaryColor: '#333',
    secondaryColor: '#E6E6E6'
};

export default class Icon extends Base<State, Props, Computed> {
    static computed: Computed = {
        target(this: Icon) {
            let target;
            const primaryColor = this.data.get('primaryColor');
            const secondaryColor = this.data.get('secondaryColor');
            const type = this.data.get('type');
            let colors: DoubleColorIcon = twoToneColorPalette;
            if (primaryColor) {
                colors = {
                    primaryColor,
                    secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
                };
            }

            if (isIconDefinition(type)) {
                target = type;
            }
            else if (typeof type === 'string') {
                target = Icon.get(type, colors);
                if (!target) {
                    return null;
                }
            }
            if (!target) {
                return null;
            }
            if (target && typeof target.icon === 'function') {
                target = {
                    ...target,
                    icon: target.icon(colors.primaryColor, colors.secondaryColor)
                };
            }
            return target;
        }
    }

    static template = `
        <svg
            key="svg-{{target.name}}"
            data-icon="{{target.name}}"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            viewBox="{{target.icon.attrs.viewBox || '0 0 1024 1024'}}"
        >
            <slot />
            <path
                s-for="p, index in target.icon.children"
                key="svg-{{target.name}}-path-{{index}}"
                s-bind="{{p.attrs}}"
            >
            </path>
        </svg>
    `

    static add(icons: Array<{name: string, theme: string}>) {
        icons.forEach(icon => {
            definitions.set(withSuffix(icon.name, icon.theme), icon);
        });
    }

    static clear() {
        definitions.clear();
    }

    static get(key: string, colors: DoubleColorIcon) {
        if (key) {
            let target = definitions.get(key);
            if (target && typeof target.icon === 'function') {
                target = {
                    ...target,
                    icon: target.icon(colors.primaryColor, colors.secondaryColor)
                };
            }
            return target;
        }
    }

    static setTwoToneColors(twoToneColorPaletteSetter: DoubleColorIcon) {
        twoToneColorPalette.primaryColor = twoToneColorPaletteSetter.primaryColor;
        twoToneColorPalette.secondaryColor = twoToneColorPaletteSetter.secondaryColor
            || getSecondaryColor(twoToneColorPaletteSetter.primaryColor);
    }

    static getTwoToneColors() {
        return {
            ...twoToneColorPalette
        };
    }
}
