/**
* @file 分页组件
*/


import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import BreadcrumbItem from './Item';
import './style/index';
const prefixCls = classCreator('breadcrumb')();

function getPath(path, params = {}) {
    path = (path || '').replace(/^\//, '');
    Object.keys(params).forEach(key => {
        path = path.replace(`:${key}`, params[key]);
    });
    return path;
}

const Breadcrumb = san.defineComponent({
    components: {
        's-breadcrumb-item': BreadcrumbItem
    },

    dataTypes: {
        separator: DataTypes.string,
        routes: DataTypes.array
    },

    initData() {
        return {
            separator: '/',
            paths: []
        };
    },


    getPaths(path, params) {
        let paths = this.data.get('paths');
        const result = getPath(path, params);

        result && (paths.push(result));
        return paths;
    },

    getHref(paths) {
        return `#/${paths.join('/')}`;
    },

    getBreadcrumbName(route, params = {}) {
        if (!route.breadcrumbName) {
            return null;
        }
        const paramsKeys = Object.keys(params).join('|');
        const name = route.breadcrumbName.replace(
            new RegExp(`:(${paramsKeys})`, 'g'),
            (replacement, key) => params[key] || replacement,
        );
        return name;
    },

    messages: {
        santd_breadcrumb_add(payload) {
            const separator = this.data.get('separator');
            if (separator) {
                payload.value.data.set('separator', separator);
            }
        }
    },

    template: `
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
});

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;