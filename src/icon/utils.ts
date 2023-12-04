/**
 * @file Santd icon util file
 * @author mayihui@baidu.com
 **/
import generate from './generate';

export function isIconDefinition(target: any) {
    return (
        typeof target === 'object'
            && typeof target.name === 'string'
            && typeof target.theme === 'string'
            && (typeof target.icon === 'object' || typeof target.icon === 'function')
    );
}

export function normalizeAttrs(attrs: Record<string, any> = {}) {
    return Object.keys(attrs).reduce((acc: Record<string, any>, key) => {
        const val = attrs[key];
        switch (key) {
            case 'class':
                acc.className = val;
                delete acc.class;
                break;
            default:
                acc[key] = val;
        }
        return acc;
    }, {});
}

export class MiniMap {
    collection: Record<string, any>

    constructor() {
        this.collection = {};
    }
    get size() {
        return Object.keys(this.collection).length;
    }
    clear() {
        this.collection = {};
    }
    delete(key: string) {
        return delete this.collection[key];
    }
    get(key: string) {
        return this.collection[key];
    }
    has(key: string) {
        return Boolean(this.collection[key]);
    }
    set(key: string, value: any) {
        this.collection[key] = value;
        return this;
    }
}

export function getSecondaryColor(primaryColor: string) {
    // choose the second color
    return generate(primaryColor)[0];
}

export function withSuffix(name: string, theme: string) {
    switch (theme) {
        case 'filled':
            return `${name}-fill`;
        case 'outlined':
            return `${name}-o`;
        case 'twotone':
            return `${name}-twotone`;
        default:
            throw new TypeError(`Unknown theme type: ${theme}, name: ${name}`);
    }
}

export const svgBaseProps = {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    ['aria-hidden']: 'true',
    focusable: 'false'
};

const fillTester = /-fill$/;
const outlineTester = /-o$/;
const twoToneTester = /-twotone$/;

export function getThemeFromTypeName(type: string) {
    let result = null;
    if (fillTester.test(type)) {
        result = 'filled';
    }
    else if (outlineTester.test(type)) {
        result = 'outlined';
    }
    else if (twoToneTester.test(type)) {
        result = 'twoTone';
    }
    return result;
}

export function removeTypeTheme(type: string) {
    return type
        .replace(fillTester, '')
        .replace(outlineTester, '')
        .replace(twoToneTester, '');
}

export function withThemeSuffix(type: string, theme: string) {
    let result = type;
    if (theme === 'filled') {
        result += '-fill';
    }
    else if (theme === 'outlined') {
        result += '-o';
    }
    else if (theme === 'twoTone') {
        result += '-twotone';
    }
    else {
        console.warn(false, 'Icon', `This icon '${type}' has unknown theme '${theme}'`);
    }
    return result;
}

// For alias or compatibility
export function alias(type: string) {
    switch (type) {
        case 'cross':
            return 'close';
        default:
    }
    return type;
}
