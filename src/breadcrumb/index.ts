/**
* @file 分页组件
*/


import Base from 'santd/base';
import {classCreator} from '../core/util';
import BreadcrumbItem, {TItem} from './Item';
import {Route, Params, BreadcrumbState, BreadcrumbProps} from './interface';
import './style/index';
const prefixCls = classCreator('breadcrumb')();

function getPath(path: string, params: {[key: string]: string} = {}) {
    path = (path || '').replace(/^\//, '');
    Object.keys(params).forEach(key => {
        path = path.replace(`:${key}`, params[key]);
    });
    return path;
}
type Message = {
    santd_breadcrumb_add: (this: Breadcrumb, payload: {value: any}) => void;
};
class Breadcrumb extends Base<BreadcrumbState, BreadcrumbProps> {
    static components = {
        's-breadcrumb-item': BreadcrumbItem
    }

    initData(): BreadcrumbState {
        return {
            separator: '/',
            paths: []
        };
    }

    getPaths(path: string, params: Params): string[] {
        let paths = this.data.get('paths');
        const result = getPath(path, params);

        result && (paths.push(result));
        return paths;
    }

    getHref(paths: string[]): string {
        return `#/${paths.join('/')}`;
    }

    getBreadcrumbName(route: Route, params: Params = {}): string | null {
        if (!route.breadcrumbName) {
            return null;
        }
        const paramsKeys = Object.keys(params).join('|');
        const name = route.breadcrumbName.replace(
            new RegExp(`:(${paramsKeys})`, 'g'),
            (replacement: string, key: string) => params[key] || replacement,
        );
        return name;
    }
    static Item: TItem;
    static messages: Message = {
        santd_breadcrumb_add(payload) {
            const separator = this.data.get('separator');
            if (separator) {
                payload.value.data.set('separator', separator);
            }
        }
    }

    static template =`
        <div class="${prefixCls}">
            <slot name="item" 
                s-if="routes && routes.length"
                s-for="route, index in routes"
                var-separator="separator"
                var-index="index"
                var-route="route"
                var-params="params"
                var-paths="getPaths(route.path, params)"
            >
                <s-breadcrumb-item separator="{{separator}}" href="{{routes.length - 1 > index ? getHref(paths) : ''}}">
                    {{getBreadcrumbName(route, params)}}
                </s-breadcrumb-item>
            </slot>
            <slot s-else />
        </div>
    `
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;

export type TBreadcrumb = typeof Breadcrumb;