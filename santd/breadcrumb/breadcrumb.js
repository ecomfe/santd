/**
* @file breadcrumb 面包屑组件
* @author fuqiangqiang@baidu.com
*/
import san, {DataTypes} from 'san';
import {classCreator} from '../core/util';
import classNames from 'classnames';
import breadcrumbList from './breadcrumbList';
import './style/index';
const prefixCls = classCreator('breadcrumb')();

export default san.defineComponent({
    components: {
        's-breadcrumb-list': breadcrumbList
    },
    dataTypes: {
        separator: DataTypes.string,
        routes: DataTypes.instanceOf(Array)
    },
    computed: {
        classes() {
            return classNames({
                [`${prefixCls}`]: true
            });
        },
        newRouteComponts() {
            const itemRender = this.data.get('itemRender');
            const routes = this.data.get('routes');
            return routes && itemRender ? routes.map(route => {
                return itemRender(route);
            }) : [];
        }
    },
    messages: {
        addBreadcrumbItem(payload) {
            const item = payload.value;
            const separator = this.data.get('separator');
            if (separator) {
                item.data.set('separator', separator);
            }
        }
    },
    template: `
        <div class="{{classes}}">
            <span s-if="routes" s-for="route,index in routes">
                <s-breadcrumb-list
                    index="{{index}}"
                    route="{{route}}"
                    itemRender="{{itemRender}}"
                    params="{{params}}"
                    allLen="{{routes.length}}"
                ></s-breadcrumb-list>
                <span class="${prefixCls}-separator">/</span>
            </span>
            <slot s-else></slot>
        </div>
    `
});
