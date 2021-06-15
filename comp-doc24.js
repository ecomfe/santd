(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{511:function(o,s,t){"use strict";t.r(s);var e=t(0),n=t.n(e),l={template:'<section class="markdown"><p>在多数业务情况下，Santd需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。</p><p>划分之后的信息区块我们称之为『盒子』。建议横向排列的盒子数量最多四个，最少一个。『盒子』在整个屏幕上占比见上图。设计部分基于盒子的单位定制盒子内部的排版规则，以保证视觉层面的舒适感。</p><h2 id="概述"><span>概述</span><a href="#概述" class="anchor">#</a></h2><p>布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。下面简单介绍一下它的工作原理：</p><ul><li>通过row在水平方向建立一组<code>column</code>（简写col）</li><li>你的内容应当放置于 <code>col</code> 内，并且，只有 <code>col</code> 可以作为 <code>row</code> 的直接元素</li><li>栅格系统中的列是指1到24的值来表示其跨越的范围。例如，三个等宽的列可以使用.col-8来创建</li><li>如果一个 <code>row</code> 中的 <code>col</code> 总和超过 24，那么多余的 <code>col</code> 会作为一个整体另起一行排列</li></ul><h2 id="flex-布局"><span>Flex 布局</span><a href="#flex-布局" class="anchor">#</a></h2><p>我们的栅格化系统支持 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。</p><p>Flex 布局是基于 24 栅格来定义每一个『盒子』的宽度，但不拘泥于栅格。</p><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},c={template:'<section class="markdown"><h1 id="grid-栅格"><span>Grid 栅格</span><a href="#grid-栅格" class="anchor">#</a></h1><p>24 栅格系统</p></section>'},a=(t(637),t(14)),d=n.a.defineComponent({components:{"s-row":a.c.Row,"s-col":a.c.Col},template:'<div class="grid-demo">\n        <s-row class="demo-row">\n            <s-col span="{{24}}" class="demo-col demo-col-1">100%</s-col>\n        </s-row>\n        <s-row class="demo-row">\n            <s-col span="{{6}}" class="demo-col demo-col-2">25%</s-col>\n            <s-col span="{{6}}" class="demo-col demo-col-3">25%</s-col>\n            <s-col span="{{6}}" class="demo-col demo-col-2">25%</s-col>\n            <s-col span="{{6}}" class="demo-col demo-col-3">25%</s-col>\n        </s-row>\n        <s-row class="demo-row">\n            <s-col span="{{8}}" class="demo-col demo-col-4">33.33%</s-col>\n            <s-col span="{{8}}" class="demo-col demo-col-5">33.33%</s-col>\n            <s-col span="{{8}}" class="demo-col demo-col-4">33.33%</s-col>\n        </s-row>\n        <s-row class="demo-row">\n            <s-col span="{{12}}" class="demo-col demo-col-1">50%</s-col>\n            <s-col span="{{12}}" class="demo-col demo-col-3">50%</s-col>\n        </s-row>\n        <s-row class="demo-row">\n            <s-col span="{{16}}" class="demo-col demo-col-4">66.66%</s-col>\n            <s-col span="{{8}}" class="demo-col demo-col-5">33.33%</s-col>\n        </s-row>\n    </div>'}),p=t(8),r={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-basic">\n    &lt;s-row>\n      &lt;s-col span="12">col-12&lt;/s-col>\n      &lt;s-col span="12">col-12&lt;/s-col>\n    &lt;/s-row>\n    &lt;s-row>\n      &lt;s-col span="8">col-8&lt;/s-col>\n      &lt;s-col span="8">col-8&lt;/s-col>\n      &lt;s-col span="8">col-8&lt;/s-col>\n    &lt;/s-row>\n    &lt;s-row>\n      &lt;s-col span="6">col-6&lt;/s-col>\n      &lt;s-col span="6">col-6&lt;/s-col>\n      &lt;s-col span="6">col-6&lt;/s-col>\n      &lt;s-col span="6">col-6&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="基础栅格"><span>基础栅格</span><a href="#基础栅格" class="anchor">#</a></h4><p>从堆叠到水平排列。\n使用单一的一组 <code>Row</code> 和 <code>Col</code> 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 <code>Row</code> 内。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-basic"><s-row><s-col span="12">col-12</s-col><s-col span="12">col-12</s-col></s-row><s-row><s-col span="8">col-8</s-col><s-col span="8">col-8</s-col><s-col span="8">col-8</s-col></s-row><s-row><s-col span="6">col-6</s-col><s-col span="6">col-6</s-col><s-col span="6">col-6</s-col><s-col span="6">col-6</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402417"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},i={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-flex-align">\n    &lt;p>Align Top&lt;/p>\n    &lt;s-row type="flex" justify="center" align="top">\n      &lt;s-col span="4">&lt;p class="height-100">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-50">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-120">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-80">col-4&lt;/p>&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>Align Center&lt;/p>\n    &lt;s-row type="flex" justify="space-around" align="middle">\n      &lt;s-col span="4">&lt;p class="height-100">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-50">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-120">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-80">col-4&lt;/p>&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>Align Bottom&lt;/p>\n    &lt;s-row type="flex" justify="space-between" align="bottom">\n      &lt;s-col span="4">&lt;p class="height-100">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-50">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-120">col-4&lt;/p>&lt;/s-col>\n      &lt;s-col span="4">&lt;p class="height-80">col-4&lt;/p>&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="flex-对齐"><span>Flex 对齐</span><a href="#flex-对齐" class="anchor">#</a></h4><p>Flex 子元素垂直对齐。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-flex-align"><p>Align Top</p><s-row type="flex" justify="center" align="top"><s-col span="4"><p class="height-100">col-4</p></s-col><s-col span="4"><p class="height-50">col-4</p></s-col><s-col span="4"><p class="height-120">col-4</p></s-col><s-col span="4"><p class="height-80">col-4</p></s-col></s-row><p>Align Center</p><s-row type="flex" justify="space-around" align="middle"><s-col span="4"><p class="height-100">col-4</p></s-col><s-col span="4"><p class="height-50">col-4</p></s-col><s-col span="4"><p class="height-120">col-4</p></s-col><s-col span="4"><p class="height-80">col-4</p></s-col></s-row><p>Align Bottom</p><s-row type="flex" justify="space-between" align="bottom"><s-col span="4"><p class="height-100">col-4</p></s-col><s-col span="4"><p class="height-50">col-4</p></s-col><s-col span="4"><p class="height-120">col-4</p></s-col><s-col span="4"><p class="height-80">col-4</p></s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402401"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},m={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-flex-order">\n    &lt;s-row type="flex">\n      &lt;s-col span="6" order="4">1 col-order-4&lt;/s-col>\n      &lt;s-col span="6" order="3">2 col-order-3&lt;/s-col>\n      &lt;s-col span="6" order="2">3 col-order-2&lt;/s-col>\n      &lt;s-col span="6" order="1">4 col-order-1&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="flex-排序"><span>Flex 排序</span><a href="#flex-排序" class="anchor">#</a></h4><p>从堆叠到水平排列。\n通过 Flex 布局的 Order 来改变元素的排序。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-flex-order"><s-row type="flex"><s-col span="6" order="4">1 col-order-4</s-col><s-col span="6" order="3">2 col-order-3</s-col><s-col span="6" order="2">3 col-order-2</s-col><s-col span="6" order="1">4 col-order-1</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402409"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},g={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-flex">\n    &lt;p>sub-element align left&lt;/p>\n    &lt;s-row type="flex" justify="start">\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>sub-element align center&lt;/p>\n    &lt;s-row type="flex" justify="center">\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>sub-element align right&lt;/p>\n    &lt;s-row type="flex" justify="end">\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>sub-element monospaced arrangement&lt;/p>\n    &lt;s-row type="flex" justify="space-between">\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n    &lt;/s-row>\n\n    &lt;p>sub-element align full&lt;/p>\n    &lt;s-row type="flex" justify="space-around">\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n      &lt;s-col span="4">col-4&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="flex-布局"><span>Flex 布局</span><a href="#flex-布局" class="anchor">#</a></h4><p>Flex 布局基础。\n使用 <code>row-flex</code> 定义 <code>flex</code> 布局，其子元素根据不同的值 <code>start</code>,<code>center</code>,<code>end</code>,<code>space-between</code>,<code>space-around</code>，分别定义其在父节点里面的排版方式。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-flex"><p>sub-element align left</p><s-row type="flex" justify="start"><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col></s-row><p>sub-element align center</p><s-row type="flex" justify="center"><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col></s-row><p>sub-element align right</p><s-row type="flex" justify="end"><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col></s-row><p>sub-element monospaced arrangement</p><s-row type="flex" justify="space-between"><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col></s-row><p>sub-element align full</p><s-row type="flex" justify="space-around"><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col><s-col span="4">col-4</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402390"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},f={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div class="gutter-example">\n    &lt;s-row gutter="16">\n      &lt;s-col class="gutter-row" span="6">\n        &lt;div class="gutter-box">col-6&lt;/div>\n      &lt;/s-col>\n      &lt;s-col class="gutter-row" span="6">\n        &lt;div class="gutter-box">col-6&lt;/div>\n      &lt;/s-col>\n      &lt;s-col class="gutter-row" span="6">\n        &lt;div class="gutter-box">col-6&lt;/div>\n      &lt;/s-col>\n      &lt;s-col class="gutter-row" span="6">\n        &lt;div class="gutter-box">col-6&lt;/div>\n      &lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="区块间隔"><span>区块间隔</span><a href="#区块间隔" class="anchor">#</a></h4><p>栅格常常需要和间隔进行配合，你可以使用 <code>Row</code> 的 <code>gutter</code> 属性，我们推荐使用 <code>(16+8n)px</code> 作为栅格间隔。(n 是自然数)\n如果要支持响应式，可以写成 <code>{ xs: 8, sm: 16, md: 24, lg: 32 }</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div class="gutter-example"><s-row gutter="16"><s-col class="gutter-row" span="6"><div class="gutter-box">col-6</div></s-col><s-col class="gutter-row" span="6"><div class="gutter-box">col-6</div></s-col><s-col class="gutter-row" span="6"><div class="gutter-box">col-6</div></s-col><s-col class="gutter-row" span="6"><div class="gutter-box">col-6</div></s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402385"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},x={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-offset">\n    &lt;s-row>\n      &lt;s-col span="8">col-8&lt;/s-col>\n      &lt;s-col span="8" offset="8">col-8&lt;/s-col>\n    &lt;/s-row>\n    &lt;s-row>\n      &lt;s-col span="6" offset="6">col-6 col-offset-6&lt;/s-col>\n      &lt;s-col span="6" offset="6">col-6 col-offset-6&lt;/s-col>\n    &lt;/s-row>\n    &lt;s-row>\n      &lt;s-col span="12" offset="6">col-12 col-offset-6&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="左右偏移"><span>左右偏移</span><a href="#左右偏移" class="anchor">#</a></h4><p>列偏移。\n使用 <code>offset</code> 可以将列向右侧偏。例如，<code>offset=&quot;4&quot;</code> 将元素向右侧偏移了 4 个列（column）的宽度。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-offset"><s-row><s-col span="8">col-8</s-col><s-col span="8" offset="8">col-8</s-col></s-row><s-row><s-col span="6" offset="6">col-6 col-offset-6</s-col><s-col span="6" offset="6">col-6 col-offset-6</s-col></s-row><s-row><s-col span="12" offset="6">col-12 col-offset-6</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402377"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},h={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-sort">\n    &lt;s-row>\n      &lt;s-col span="18" push="6">col-18 col-push-6&lt;/s-col>\n      &lt;s-col span="6" pull="18">col-6 col-pull-18&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="栅格排序"><span>栅格排序</span><a href="#栅格排序" class="anchor">#</a></h4><p>列排序。\n通过使用 <code>push</code> 和 <code>pull</code> 类就可以很容易的改变列（column）的顺序。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-sort"><s-row><s-col span="18" push="6">col-18 col-push-6</s-col><s-col span="6" pull="18">col-6 col-pull-18</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402362"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},w={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-responsive">\n      &lt;s-row>\n        &lt;s-col xs="2" sm="4" md="6" lg="8" xl="10">Col&lt;/s-col>\n        &lt;s-col xs="20" sm="16" md="12" lg="8" xl="4">Col&lt;/s-col>\n        &lt;s-col xs="2" sm="4" md="6" lg="8" xl="10">Col&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="响应式布局"><span>响应式布局</span><a href="#响应式布局" class="anchor">#</a></h4><p>参照 Bootstrap 的 <a href="http://getbootstrap.com/css/#grid-media-queries">响应式设计</a>，预设六个响应尺寸：<code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code>  <code>xxl</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-responsive"><s-row><s-col xs="2" sm="4" md="6" lg="8" xl="10">Col</s-col><s-col xs="20" sm="16" md="12" lg="8" xl="4">Col</s-col><s-col xs="2" sm="4" md="6" lg="8" xl="10">Col</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402372"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},u={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div id="components-grid-demo-responesive-more">\n      &lt;s-row>\n        &lt;s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col&lt;/s-col>\n        &lt;s-col xs="{{ { span: 11, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col&lt;/s-col>\n        &lt;s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col&lt;/s-col>\n    &lt;/s-row>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="其他属性的响应式"><span>其他属性的响应式</span><a href="#其他属性的响应式" class="anchor">#</a></h4><p><code>span</code> <code>pull</code> <code>push</code> <code>offset</code> <code>order</code> 属性可以通过内嵌到 <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code> <code>xl</code> <code>xxl</code> 属性中来使用。\n其中 <code>xs=&quot;6&quot;</code> 相当于 <code>xs=&quot;{ span: 6 }&quot;</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row},template:'<div id="components-grid-demo-responesive-more"><s-row><s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col><s-col xs="{{ { span: 11, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col><s-col xs="{{ { span: 5, offset: 1 } }}" lg="{{ { span: 6, offset: 2 } }}">Col</s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402351"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},v={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div id="components-grid-demo-config">\n        &lt;div style="margin-bottom: 16px;">\n            &lt;span style="margin-right: 6px;">Gutter（px）:&lt;/span>\n            &lt;div style="width: 50%">\n                &lt;s-slider\n                    value="{{gutterKey}}"\n                    on-change="handleGutterChange"\n                    marks="{{gutters}}"\n                    step="{{noValue}}"\n                >&lt;/s-slider>\n            &lt;/div>\n            &lt;span style="margin-right: 6px;">Column Count:&lt;/span>\n            &lt;div style="width: 50%">\n                &lt;s-slider\n                    value="{{colCountKey}}"\n                    on-change="handleColCountChange"\n                    marks="{{colCounts}}"\n                    step="{{noValue}}"\n                >&lt;/s-slider>\n            &lt;/div>\n        &lt;/div>\n        &lt;s-row gutter="{{gutter}}">\n            &lt;s-col\n                s-for="col in colCountArr"\n                span="{{24 / colCount}}"\n            >\n                &lt;div>Column&lt;/div>\n            &lt;/s-col>\n        &lt;/s-row>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Grid, Slider} from \'santd\';\n\nexport default {\n    components: {\n        \'s-col\': Grid.Col,\n        \'s-row\': Grid.Row,\n        \'s-slider\': Slider\n    },\n    computed: {\n        gutter() {\n            const gutterKey = this.data.get(\'gutterKey\');\n            return this.data.get(\'gutters\')[gutterKey];\n        },\n        colCount() {\n            const colCountKey = this.data.get(\'colCountKey\');\n            return this.data.get(\'colCounts\')[colCountKey];\n        },\n        colCountArr() {\n            const colCount = this.data.get(\'colCount\');\n            const arr = [];\n            for (let i = 0; i &lt; colCount; i++) {\n                arr.push(i);\n            }\n            return arr;\n        }\n    },\n    initData() {\n        return {\n            noValue: null,\n            gutterKey: 20,\n            colCountKey: 40,\n            gutters: {0: 8, 20: 16, 40: 24, 60: 32, 80: 40, 100: 48},\n            colCounts: {0: 2, 20: 3, 40: 4, 60: 6, 80: 8, 100: 12}\n        }\n    },\n    handleGutterChange(value) {\n        this.data.set(\'gutterKey\', value);\n    },\n    handleColCountChange(value) {\n        this.data.set(\'colCountKey\', value);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="栅格配置器"><span>栅格配置器</span><a href="#栅格配置器" class="anchor">#</a></h4><p>可以简单配置几种等分栅格和间距。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-col":p.y.Col,"s-row":p.y.Row,"s-slider":p.U},computed:{gutter(){const o=this.data.get("gutterKey");return this.data.get("gutters")[o]},colCount(){const o=this.data.get("colCountKey");return this.data.get("colCounts")[o]},colCountArr(){const o=this.data.get("colCount"),s=[];for(let t=0;t<o;t++)s.push(t);return s}},initData:()=>({noValue:null,gutterKey:20,colCountKey:40,gutters:{0:8,20:16,40:24,60:32,80:40,100:48},colCounts:{0:2,20:3,40:4,60:6,80:8,100:12}}),handleGutterChange(o){this.data.set("gutterKey",o)},handleColCountChange(o){this.data.set("colCountKey",o)},template:'<div id="components-grid-demo-config"><div style="margin-bottom: 16px;"><span style="margin-right: 6px;">Gutter（px）:</span><div style="width: 50%"><s-slider value="{{gutterKey}}" on-change="handleGutterChange" marks="{{gutters}}" step="{{noValue}}"></s-slider></div><span style="margin-right: 6px;">Column Count:</span><div style="width: 50%"><s-slider value="{{colCountKey}}" on-change="handleColCountChange" marks="{{colCounts}}" step="{{noValue}}"></s-slider></div></div><s-row gutter="{{gutter}}"><s-col s-for="col in colCountArr" span="{{24 / colCount}}"><div>Column</div></s-col></s-row></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1623747402339"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},b={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><h3 id="row"><span>Row</span><a href="#row" class="anchor">#</a></h3><table><thead><tr><th>成员</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>align</td><td>flex 布局下的垂直对齐方式：<code>top</code> <code>middle</code> <code>bottom</code></td><td>string</td><td>top</td></tr><tr><td>gutter</td><td>栅格间隔，可以写成像素值或支持响应式的对象写法 <code>{ xs: 8, sm: 16, md: 24}</code></td><td>number/object</td><td>0</td></tr><tr><td>justify</td><td>flex 布局下的水平排列方式：<code>start</code> <code>end</code> <code>center</code> <code>space-around</code> <code>space-between</code></td><td>string</td><td>start</td></tr><tr><td>type</td><td>布局模式，可选 <code>flex</code>，<a href="http://caniuse.com/#search=flex">现代浏览器</a> 下有效</td><td>string</td><td></td></tr></tbody></table><h3 id="col"><span>Col</span><a href="#col" class="anchor">#</a></h3><table><thead><tr><th>成员</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>offset</td><td>栅格左侧的间隔格数，间隔内不可以有栅格</td><td>number</td><td>0</td></tr><tr><td>order</td><td>栅格顺序，<code>flex</code> 布局模式下有效</td><td>number</td><td>0</td></tr><tr><td>pull</td><td>栅格向左移动格数</td><td>number</td><td>0</td></tr><tr><td>push</td><td>栅格向右移动格数</td><td>number</td><td>0</td></tr><tr><td>span</td><td>栅格占位格数，为 0 时相当于 <code>display: none</code></td><td>number</td><td>-</td></tr><tr><td>xs</td><td><code>&lt;576px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr><tr><td>sm</td><td><code>≥576px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr><tr><td>md</td><td><code>≥768px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr><tr><td>lg</td><td><code>≥992px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr><tr><td>xl</td><td><code>≥1200px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr><tr><td>xxl</td><td><code>≥1600px</code> 响应式栅格，可为栅格数或一个包含其他属性的对象</td><td>number | object</td><td>-</td></tr></tbody></table><p>响应式栅格的断点扩展自 <a href="https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints">BootStrap 4 的规则</a>（不包含链接里 occasionally 的部分)。</p></section>'};s.default=n.a.defineComponent({components:{desc:l,head:c,basic:r,demo:d,flex:g,flexalign:i,flexorder:m,gutter:f,offset:x,responsive:w,responsivemore:u,sort:h,gutterconfig:v,readme:b},template:"\n        <div>\n            <head/>\n            <demo/>\n            <desc/>\n            <basic/>\n            <gutter/>\n            <sort/>\n            <offset/>\n            <flex/>\n            <flexalign/>\n            <flexorder/>\n            <responsive/>\n            <responsivemore/>\n            <gutterconfig/>\n            <readme/>\n        </div>\n    "})},637:function(o,s,t){var e=t(4),n=t(638);"string"==typeof(n=n.__esModule?n.default:n)&&(n=[[o.i,n,""]]);var l={insert:"head",singleton:!1};e(n,l);o.exports=n.locals||{}},638:function(o,s,t){(s=t(5)(!1)).push([o.i,".grid-demo .demo-row {\n  margin-bottom: 8px;\n  overflow: hidden;\n  background-image: -webkit-gradient(linear, left top, right top, color-stop(4.16666667%, #f5f5f5), color-stop(4.16666667%, transparent), color-stop(8.33333333%, transparent), color-stop(8.33333333%, #f5f5f5), color-stop(12.5%, #f5f5f5), color-stop(12.5%, transparent), color-stop(16.66666667%, transparent), color-stop(16.66666667%, #f5f5f5), color-stop(20.83333333%, #f5f5f5), color-stop(20.83333333%, transparent), color-stop(25%, transparent), color-stop(25%, #f5f5f5), color-stop(29.16666667%, #f5f5f5), color-stop(29.16666667%, transparent), color-stop(33.33333333%, transparent), color-stop(33.33333333%, #f5f5f5), color-stop(37.5%, #f5f5f5), color-stop(37.5%, transparent), color-stop(41.66666667%, transparent), color-stop(41.66666667%, #f5f5f5), color-stop(45.83333333%, #f5f5f5), color-stop(45.83333333%, transparent), color-stop(50%, transparent), color-stop(50%, #f5f5f5), color-stop(54.16666667%, #f5f5f5), color-stop(54.16666667%, transparent), color-stop(58.33333333%, transparent), color-stop(58.33333333%, #f5f5f5), color-stop(62.5%, #f5f5f5), color-stop(62.5%, transparent), color-stop(66.66666667%, transparent), color-stop(66.66666667%, #f5f5f5), color-stop(70.83333333%, #f5f5f5), color-stop(70.83333333%, transparent), color-stop(75%, transparent), color-stop(75%, #f5f5f5), color-stop(79.16666667%, #f5f5f5), color-stop(79.16666667%, transparent), color-stop(83.33333333%, transparent), color-stop(83.33333333%, #f5f5f5), color-stop(87.5%, #f5f5f5), color-stop(87.5%, transparent), color-stop(91.66666667%, transparent), color-stop(91.66666667%, #f5f5f5), color-stop(95.83333333%, #f5f5f5), color-stop(95.83333333%, transparent));\n  background-image: -webkit-linear-gradient(left, #f5f5f5 4.16666667%, transparent 4.16666667%, transparent 8.33333333%, #f5f5f5 8.33333333%, #f5f5f5 12.5%, transparent 12.5%, transparent 16.66666667%, #f5f5f5 16.66666667%, #f5f5f5 20.83333333%, transparent 20.83333333%, transparent 25%, #f5f5f5 25%, #f5f5f5 29.16666667%, transparent 29.16666667%, transparent 33.33333333%, #f5f5f5 33.33333333%, #f5f5f5 37.5%, transparent 37.5%, transparent 41.66666667%, #f5f5f5 41.66666667%, #f5f5f5 45.83333333%, transparent 45.83333333%, transparent 50%, #f5f5f5 50%, #f5f5f5 54.16666667%, transparent 54.16666667%, transparent 58.33333333%, #f5f5f5 58.33333333%, #f5f5f5 62.5%, transparent 62.5%, transparent 66.66666667%, #f5f5f5 66.66666667%, #f5f5f5 70.83333333%, transparent 70.83333333%, transparent 75%, #f5f5f5 75%, #f5f5f5 79.16666667%, transparent 79.16666667%, transparent 83.33333333%, #f5f5f5 83.33333333%, #f5f5f5 87.5%, transparent 87.5%, transparent 91.66666667%, #f5f5f5 91.66666667%, #f5f5f5 95.83333333%, transparent 95.83333333%);\n  background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 4.16666667%, transparent 8.33333333%, #f5f5f5 8.33333333%, #f5f5f5 12.5%, transparent 12.5%, transparent 16.66666667%, #f5f5f5 16.66666667%, #f5f5f5 20.83333333%, transparent 20.83333333%, transparent 25%, #f5f5f5 25%, #f5f5f5 29.16666667%, transparent 29.16666667%, transparent 33.33333333%, #f5f5f5 33.33333333%, #f5f5f5 37.5%, transparent 37.5%, transparent 41.66666667%, #f5f5f5 41.66666667%, #f5f5f5 45.83333333%, transparent 45.83333333%, transparent 50%, #f5f5f5 50%, #f5f5f5 54.16666667%, transparent 54.16666667%, transparent 58.33333333%, #f5f5f5 58.33333333%, #f5f5f5 62.5%, transparent 62.5%, transparent 66.66666667%, #f5f5f5 66.66666667%, #f5f5f5 70.83333333%, transparent 70.83333333%, transparent 75%, #f5f5f5 75%, #f5f5f5 79.16666667%, transparent 79.16666667%, transparent 83.33333333%, #f5f5f5 83.33333333%, #f5f5f5 87.5%, transparent 87.5%, transparent 91.66666667%, #f5f5f5 91.66666667%, #f5f5f5 95.83333333%, transparent 95.83333333%);\n}\n[id^='components-grid-demo'] .santd-row-flex {\n  background: #f5f5f5;\n}\n.grid-demo .santd-row > div,\n[id^='components-grid-demo'] .santd-row > div,\n[id^='components-grid-demo'] .santd-row-flex > div {\n  min-height: 30px;\n  margin-top: 8px;\n  margin-bottom: 8px;\n  padding: 5px 0;\n  color: #fff;\n  text-align: center;\n  border-radius: 0;\n}\n[id^='components-grid-demo'] .santd-row > div,\n[id^='components-grid-demo'] .santd-row-flex > div {\n  padding: 16px 0;\n  background: #00a0e9;\n}\n[id^='components-grid-demo'] .santd-row > div:nth-child(2n + 1),\n[id^='components-grid-demo'] .santd-row-flex > div:nth-child(2n + 1) {\n  background: rgba(0, 160, 233, 0.7);\n}\n.grid-demo .santd-row .demo-col,\n[id^='components-grid-demo'] .santd-row .demo-col {\n  margin-top: 0;\n  margin-bottom: 0;\n  padding: 30px 0;\n  color: #fff;\n  font-size: 18px;\n  text-align: center;\n  border: none;\n}\n.grid-demo .santd-row .demo-col-1 {\n  background: rgba(0, 160, 233, 0.7);\n}\n.grid-demo .santd-row .demo-col-2 {\n  background: rgba(0, 160, 233, 0.5);\n}\n.grid-demo .santd-row .demo-col-3 {\n  color: #999;\n  background: rgba(255, 255, 255, 0.2);\n}\n.grid-demo .santd-row .demo-col-4 {\n  background: rgba(0, 160, 233, 0.6);\n}\n.grid-demo .santd-row .demo-col-5 {\n  color: #999;\n  background: rgba(255, 255, 255, 0.5);\n}\n[id^='components-demo-'] .code-box-demo .height-100 {\n  height: 100px;\n  line-height: 100px;\n}\n[id^='components-demo-'] .code-box-demo .height-50 {\n  height: 50px;\n  line-height: 50px;\n}\n[id^='components-demo-'] .code-box-demo .height-120 {\n  height: 120px;\n  line-height: 120px;\n}\n[id^='components-demo-'] .code-box-demo .height-80 {\n  height: 80px;\n  line-height: 80px;\n}\n",""]),o.exports=s}}]);