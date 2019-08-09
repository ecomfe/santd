/**
* @file 面包屑组件的每一项
* @author fuqiangqiang@baidu.com
*/

import san, {DataTypes} from 'san';

const defaultItem = function () {
    return san.defineComponent({
        template: `
            <span>
                <span s-if="route.index === route.allLen-1">{{route.breadcrumbName}}</span>
                <a s-else href="#{{route.path}}">{{route.breadcrumbName}}</a>
            </span>
        `
    });
};

export default san.defineComponent({
    dataTypes: {
        href: DataTypes.string,
        route: DataTypes.instanceOf(Object),
        index: DataTypes.number,
        params: DataTypes.instanceOf(Object)
    },
    attached() {
        let itemRender = this.data.get('itemRender');
        const {route, index, params, allLen} = this.data.get();
        let renderer;
        itemRender = itemRender ? itemRender : defaultItem;
        if (route && itemRender) {
            if (params) {
                route.path = route.path || '';
                let path = route.path.replace(/^\//, '');
                Object.keys(params).forEach(key => {
                    path = path.replace(`:${key}`, params[key]);
                });
                route.path = path;
            }
            let Renderer = itemRender();
            renderer = new Renderer({
                data: {
                    route: Object.assign({}, route, {index, allLen})
                }
            });
            renderer.attach(this.el);
        }
    },
    template: `
        <span></span>
    `
});
