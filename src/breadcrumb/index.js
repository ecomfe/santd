/**
* @file 分页组件
*/


import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import BreadcrumbItem from './item';
import './style/index';
const prefixCls = classCreator('breadcrumb')();


const Breadcrumb = san.defineComponent({
    components: {
        's-breadcrumb-item': BreadcrumbItem
    },

    dataTypes: {
        separator: DataTypes.string,
        routes: DataTypes.instanceOf(Array)
    },

    initData() {
        return {
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
        <div class="${prefixCls} {{className}}">
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

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;