## API

### 设置面包屑

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| item| 当包含 routes 时，定制 BreadcrumbItem。跟 routes 配合使用 | slot | - |
| params | 路由参数，处理routes数组中的path路径 | object | - |
| routes | router的路由信息 | Array | - |
| separator | 分隔符自定义 | string | `/` |

## Breadcrumb.Item 组件属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | Breadcrumb.Item 组件属性，如果有href，则会进行a标签的跳转 | string | - |

## routes

```js
interface Route {
    path: String,
    breadcrumbName: String;
}
```

## 和san-router配合使用

```js
import {router, Link} from 'san-router';
import san from 'san';

router.add({
    rule: '/index',
    Component: Index
});
router.add({
    rule: '/index/first',
    Component: First
});
router.add({
    rule: '/index/first/second',
    Component: Second
});

router.start();

const demo = san.defineComponent({
    initData() {
        return { 
            routes: [
                {
                    path: 'index',
                    breadcrumbName: 'home'
                }, 
                {
                    path: 'first',
                    breadcrumbName: 'first'
                }, 
                {
                    path: 'second',
                    breadcrumbName: 'second'
                }
            ]
        }
    },

    components: {
        's-breadcrumb': Breadcrumb,
        's-breadcrumb-item': Breadcrumb.Item
    },

    template: "<div>"
        + '<s-breadcrumb routes="{{routes}}">'
        + '    <s-breadcrumb-item slot="item" href="{{routes.length - 1 > index ? route.breadcrumbName : \'\'}}">'
        + "        {{route.breadcrumbName}}"
        + "    </s-breadcrumb-item>"
        + "</s-breadcrumb>"
      + "</div>"
});
```