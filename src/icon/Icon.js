/**
 * @file Santd icon file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import {getSecondaryColor, isIconDefinition, MiniMap, withSuffix} from './utils';

let definitions = new MiniMap();
let twoToneColorPalette = {
    primaryColor: '#333',
    secondaryColor: '#E6E6E6'
};

const icon = san.defineComponent({
    computed: {
        target() {
            let target;
            const primaryColor = this.data.get('primaryColor');
            const secondaryColor = this.data.get('secondaryColor');
            const type = this.data.get('type');
            let colors = twoToneColorPalette;
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
                target = icon.get(type, colors);
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
    },
    template: `
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
});

icon.add = function (icons) {
    icons.forEach(icon => {
        definitions.set(withSuffix(icon.name, icon.theme), icon);
    });
};

icon.clear = function () {
    definitions.clear();
};

icon.get = function (key, colors) {
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
};

icon.setTwoToneColors = function (twoToneColorPaletteSetter) {
    twoToneColorPalette.primaryColor = twoToneColorPaletteSetter.primaryColor;
    twoToneColorPalette.secondaryColor = twoToneColorPaletteSetter.secondaryColor
        || getSecondaryColor(twoToneColorPaletteSetter.primaryColor);
};

icon.getTwoToneColors = function () {
    return {
        ...twoToneColorPalette
    };
};

export default icon;
