## API

### 设置面包屑

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemRender| 自定义链接,跟 routes配合使用 | SanNode | - |
| params | 路由参数，处理routes数组中的path路径 | object | - |
| routes | router的路由信息 | Array | - |
| separator | 分隔符自定义 | string | `/` |

## breadcrumbItem组件属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | breadcrumbItem组件属性，如果有href，则会进行a标签的跳转 | string | - |

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
            routes: [{
                path: 'index',
                breadcrumbName: 'home'
            }, {
                path: 'first',
                breadcrumbName: 'first'
            }, {
                path: 'second',
                breadcrumbName: 'second'
            }],
            itemRender: san.defineComponent({
                components: {
                    'router-link': Link
                },
                computed: { 
                    to() {
                        let paths = this.data.get('paths');
                        return paths.join('/');
                    }
                },
                template: '<router-link to="{{to}}">{{route.breadcrumbName}}</router-link>'
            })
        }
    },
    template: '<s-breadcrumb itemRender="{itemRender}" routes="{routes}"></s-breadcrumb>'
});
``````
