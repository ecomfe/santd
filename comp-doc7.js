(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{554:function(e,t,r){"use strict";r.r(t);var a=r(0),s=r.n(a),n={template:'<section class="markdown"><h1 id="breadcrumb-面包屑"><span>Breadcrumb 面包屑</span><a href="#breadcrumb-面包屑" class="anchor">#</a></h1><p>显示当前页面在系统层级结构中的位置，并能向上返回。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul><li>当系统拥有超过两级以上的层级结构时；</li><li>当需要告知用户『你在哪里』时；</li><li>当需要向上导航的功能时。</li></ul><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},c={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><h3 id="设置面包屑"><span>设置面包屑</span><a href="#设置面包屑" class="anchor">#</a></h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>item</td><td>当包含 routes 时，定制 BreadcrumbItem。跟 routes 配合使用</td><td>slot</td><td>-</td></tr><tr><td>params</td><td>路由参数，处理routes数组中的path路径</td><td>object</td><td>-</td></tr><tr><td>routes</td><td>router的路由信息</td><td>Array</td><td>-</td></tr><tr><td>separator</td><td>分隔符自定义</td><td>string</td><td><code>/</code></td></tr></tbody></table><h2 id="breadcrumbitem-组件属性"><span>Breadcrumb.Item 组件属性</span><a href="#breadcrumbitem-组件属性" class="anchor">#</a></h2><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>href</td><td>Breadcrumb.Item 组件属性，如果有href，则会进行a标签的跳转</td><td>string</td><td>-</td></tr></tbody></table><h2 id="routes"><span>routes</span><a href="#routes" class="anchor">#</a></h2><pre><code class="language-js">interface Route {path: String,breadcrumbName: String;}</code></pre><h2 id="和san-router配合使用"><span>和san-router配合使用</span><a href="#和san-router配合使用" class="anchor">#</a></h2><pre><code class="language-js">import {router, Link} from &#39;san-router&#39;;import san from &#39;san&#39;;router.add({rule: &#39;/index&#39;,Component: Index});router.add({rule: &#39;/index/first&#39;,Component: First});router.add({rule: &#39;/index/first/second&#39;,Component: Second});router.start();const demo = san.defineComponent({initData() {return { routes: [{path: &#39;index&#39;,breadcrumbName: &#39;home&#39;}, {path: &#39;first&#39;,breadcrumbName: &#39;first&#39;}, {path: &#39;second&#39;,breadcrumbName: &#39;second&#39;}]}},components: {&#39;s-breadcrumb&#39;: Breadcrumb,&#39;s-breadcrumb-item&#39;: Breadcrumb.Item},template: &quot;&lt;div&gt;&quot;+ &#39;&lt;s-breadcrumb routes=&quot;&#123;&#123;routes}}&quot;&gt;&#39;+ &#39;    &lt;s-breadcrumb-item slot=&quot;item&quot; href=&quot;{{routes.length - 1 &gt; index ? route.breadcrumbName : &#39;&#39;}}&quot;&gt;&#39;+ &quot;        {{route.breadcrumbName}}&quot;+ &quot;    &lt;/s-breadcrumb-item&gt;&quot;+ &quot;&lt;/s-breadcrumb&gt;&quot;+ &quot;&lt;/div&gt;&quot;});</code></pre></section>'},o=r(8),d={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n    &lt;s-breadcrumb>\n        &lt;s-brcrumbitem>Home&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>&lt;a href=\"\">Application Center&lt;/a>&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>&lt;a href=\"\">Application List&lt;/a>&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>An Application&lt;/s-brcrumbitem>\n    &lt;/s-breadcrumb>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Breadcrumb} from 'santd';\n\nexport default {\n    components: {\n        's-breadcrumb': Breadcrumb,\n        's-brcrumbitem': Breadcrumb.Item\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本"><span>基本</span><a href="#基本" class="anchor">#</a></h4><p>最简单的用法</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-breadcrumb":o.h,"s-brcrumbitem":o.h.Item},template:'<div><s-breadcrumb><s-brcrumbitem>Home</s-brcrumbitem><s-brcrumbitem><a href="">Application Center</a></s-brcrumbitem><s-brcrumbitem><a href="">Application List</a></s-brcrumbitem><s-brcrumbitem>An Application</s-brcrumbitem></s-breadcrumb></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747403271"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},i={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n    &lt;s-breadcrumb>\n        &lt;s-brcrumbitem>\n            &lt;s-icon type=\"home\">&lt;/s-icon>\n        &lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem href=\"#\">\n            &lt;s-icon type=\"user\">&lt;/s-icon>\n            &lt;span>Application List&lt;/span>\n        &lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>Application&lt;/s-brcrumbitem>\n    &lt;/s-breadcrumb>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Breadcrumb, Icon} from 'santd';\n\nexport default {\n    components: {\n        's-breadcrumb': Breadcrumb,\n        's-brcrumbitem': Breadcrumb.Item,\n        's-icon': Icon\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="带有图标的"><span>带有图标的</span><a href="#带有图标的" class="anchor">#</a></h4><p>图标放在文字前面</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-breadcrumb":o.h,"s-brcrumbitem":o.h.Item,"s-icon":o.z},template:'<div><s-breadcrumb><s-brcrumbitem><s-icon type="home"></s-icon></s-brcrumbitem><s-brcrumbitem href="#"><s-icon type="user"></s-icon><span>Application List</span></s-brcrumbitem><s-brcrumbitem>Application</s-brcrumbitem></s-breadcrumb></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747403257"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},m={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n    &lt;s-breadcrumb separator=">">\n        &lt;s-brcrumbitem>Home&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>&lt;a href="">Application Center&lt;/a>&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>&lt;a href="">Application List&lt;/a>&lt;/s-brcrumbitem>\n        &lt;s-brcrumbitem>An Application&lt;/s-brcrumbitem>\n    &lt;/s-breadcrumb>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Breadcrumb} from \'santd\';\n\nexport default {\n    components: {\n        \'s-breadcrumb\': Breadcrumb,\n        \'s-brcrumbitem\': Breadcrumb.Item\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="分隔符"><span>分隔符</span><a href="#分隔符" class="anchor">#</a></h4><p>使用 <code>separator=&quot;&gt;&quot;</code> 可以自定义分隔符</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-breadcrumb":o.h,"s-brcrumbitem":o.h.Item},template:'<div><s-breadcrumb separator=">"><s-brcrumbitem>Home</s-brcrumbitem><s-brcrumbitem><a href="">Application Center</a></s-brcrumbitem><s-brcrumbitem><a href="">Application List</a></s-brcrumbitem><s-brcrumbitem>An Application</s-brcrumbitem></s-breadcrumb></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747403265"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},p={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n    &lt;s-breadcrumb routes=\"{{routes}}\">\n        &lt;s-breadcrumb-item slot=\"item\" href=\"{{routes.length - 1 > index ? route.breadcrumbName : ''}}\">\n            {{route.breadcrumbName}}\n        &lt;/s-breadcrumb-item>\n    &lt;/s-breadcrumb>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Breadcrumb} from 'santd';\n\nexport default {\n    initData() {\n        return { \n            routes: [\n                {\n                    path: 'index',\n                    breadcrumbName: 'home'\n                }, \n                {\n                    path: 'first',\n                    breadcrumbName: 'first'\n                }, \n                {\n                    path: 'second',\n                    breadcrumbName: 'second'\n                }\n            ]\n        }\n    },\n\n    components: {\n        's-breadcrumb': Breadcrumb,\n        's-breadcrumb-item': Breadcrumb.Item\n    }\n}\n\n&lt;/script></code></pre>",text:'\n<h4 id="with-routes"><span>with routes</span><a href="#with-routes" class="anchor">#</a></h4><p>设置routes，并定义item</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{initData:()=>({routes:[{path:"index",breadcrumbName:"home"},{path:"first",breadcrumbName:"first"},{path:"second",breadcrumbName:"second"}]}),components:{"s-breadcrumb":o.h,"s-breadcrumb-item":o.h.Item},template:'<div><s-breadcrumb routes="{{routes}}"><s-breadcrumb-item slot="item" href="{{routes.length - 1 > index ? route.breadcrumbName : \'\'}}">{{route.breadcrumbName}}</s-breadcrumb-item></s-breadcrumb></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747403252"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};t.default=s.a.defineComponent({components:{head:n,readme:c,basic:d,addicon:i,separator:m,withroutes:p},template:"\n        <div>\n            <head/>\n            <basic/>\n            <addicon/>\n            <separator/>\n            <withroutes/>\n            <readme/>\n\n        </div>\n    "})}}]);