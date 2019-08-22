/**
* @file breadcrumb 面包屑组件
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import breadcrumbItem from './breadcrumbItem';
import './style/index';
const prefixCls = classCreator('breadcrumb')();

function getPath(path, params = {}) {
    path = (path || '').replace(/^\//, '');
    Object.keys(params).forEach(key => {
        path = path.replace(`:${key}`, params[key]);
    });
    return path;
}

const defaultItemRender = san.defineComponent({
    computed: {
        isLastItem() {
            const routes = this.data.get('routes');
            const route = this.data.get('route');

            return routes.indexOf(route) === routes.length - 1;
        }
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
    template: `<span>
        <span s-if="{{isLastItem}}">{{getBreadcrumbName(route, params)}}</span>
        <a s-else href="{{getHref(paths)}}">{{getBreadcrumbName(route, params)}}</a>
    </span>`
});

export default san.defineComponent({
    components: {
        's-breadcrumb-item': breadcrumbItem
    },
    dataTypes: {
        prefixCls: DataTypes.string,
        separator: DataTypes.string,
        routes: DataTypes.instanceOf(Array)
    },
    initData() {
        return {
            prefixCls,
            separator: '/',
            paths: []
        };
    },
    computed: {
        injectItemRender() {
            const instance = this.data.get('instance');
            const itemRender = this.data.get('itemRender') || defaultItemRender;
            if (instance) {
                instance.components.itemrender = itemRender;
            }
        }
    },
    getPaths(path, params) {
        let paths = this.data.get('paths');
        const result = getPath(path, params);

        result && (paths.push(result));
        return paths;
    },
    inited() {
        this.data.set('instance', this);
    },
    messages: {
        santd_breadcrumb_add(payload) {
            const item = payload.value;
            const separator = this.data.get('separator');
            if (separator) {
                item.data.set('separator', separator);
            }
        }
    },
    template: `
        <div class="{{prefixCls}} {{className}}">
            <s-breadcrumb-item
                s-if="routes && routes.length"
                s-for="route, index in routes"
                separator="{{separator}}"
            >
                <itemrender
                    route="{{route}}"
                    params="{{params}}"
                    routes="{{routes}}"
                    paths="{{getPaths(route.path, params)}}"
                />
            </s-breadcrumb-item>
            <slot s-else></slot>
        </div>
    `
});
