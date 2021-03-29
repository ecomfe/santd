(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{551:function(t,e,a){"use strict";a.r(e);var d=a(0),n=a.n(d),s={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><h3 id="typographytext"><span>Typography.Text</span><a href="#typographytext" class="anchor">#</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>copyable</td><td>是否可拷贝，为对象时可设置复制文本以回调函数</td><td>boolean | { text: string, onCopy: Function }</td><td><code>false</code></td></tr><tr><td>delete</td><td>添加删除线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>disabled</td><td>禁用文本</td><td>boolean</td><td><code>false</code></td></tr><tr><td>ellipsis</td><td>设置自动溢出</td><td>boolean</td><td><code>false</code></td></tr><tr><td>mark</td><td>添加标记样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>underline</td><td>添加下划线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>strong</td><td>是否加粗</td><td>boolean</td><td><code>false</code></td></tr><tr><td>type</td><td>文本类型</td><td><code>secondary</code>, <code>warning</code>, <code>danger</code></td><td>-</td></tr></tbody></table><h3 id="typographytitle"><span>Typography.Title</span><a href="#typographytitle" class="anchor">#</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>copyable</td><td>是否可拷贝，为对象时可设置复制文本以回调函数</td><td>boolean | { text: string, onCopy: Function }</td><td><code>false</code></td></tr><tr><td>delete</td><td>添加删除线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>disabled</td><td>禁用文本</td><td>boolean</td><td><code>false</code></td></tr><tr><td>ellipsis</td><td>设置自动溢出</td><td>boolean</td><td><code>false</code></td></tr><tr><td>level</td><td>重要程度，相当于 <code>h1</code>、<code>h2</code>、<code>h3</code>、<code>h4</code></td><td>number: <code>1</code>, <code>2</code>, <code>3</code>, <code>4</code></td><td>1</td></tr><tr><td>mark</td><td>添加标记样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>underline</td><td>添加下划线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>type</td><td>文本类型</td><td><code>secondary</code>, <code>warning</code>, <code>danger</code></td><td>-</td></tr></tbody></table><h3 id="typographyparagraph"><span>Typography.Paragraph</span><a href="#typographyparagraph" class="anchor">#</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>copyable</td><td>是否可拷贝，为对象时可设置复制文本以回调函数</td><td>boolean | { text: string, onCopy: Function }</td><td><code>false</code></td></tr><tr><td>delete</td><td>添加删除线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>disabled</td><td>禁用文本</td><td>boolean</td><td><code>false</code></td></tr><tr><td>ellipsis</td><td>设置自动溢出</td><td>boolean</td><td><code>false</code></td></tr><tr><td>mark</td><td>添加标记样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>underline</td><td>添加下划线样式</td><td>boolean</td><td><code>false</code></td></tr><tr><td>strong</td><td>是否加粗</td><td>boolean</td><td><code>false</code></td></tr><tr><td>type</td><td>文本类型</td><td><code>secondary</code>, <code>warning</code>, <code>danger</code></td><td>-</td></tr></tbody></table></section>'},o=a(8),p={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n    &lt;s-typography>\n        &lt;s-title>Introduction&lt;/s-title>\n        &lt;s-paragraph>\n            In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.\n        &lt;/s-paragraph>\n        &lt;s-paragraph>\n            After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to &lt;s-text strong>uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development&lt;/s-text>.\n        &lt;/s-paragraph>\n        &lt;s-title level={{2}}>Guidelines and Resources&lt;/s-title>\n        &lt;s-paragraph>\n            We supply a series of design principles, practical patterns and high quality design resources (&lt;s-text code>Sketch&lt;/s-text> and &lt;s-text code>Axure&lt;/s-text>), to help people create their product prototypes beautifully and efficiently.\n        &lt;/s-paragraph>\n        &lt;s-divider />\n        &lt;s-title>概念&lt;/s-title>\n        &lt;s-paragraph>\n            MVVM 模式，顾名思义即 Model-View-ViewModel 模式。它萌芽于2005年微软推出的基于 Windows 的用户界面框架 WPF ，前端最早的 MVVM 框架 knockout 在2010年发布。\n        &lt;/s-paragraph>\n        &lt;s-paragraph>\n            一句话总结 Web 前端 MVVM：&lt;s-text strong>操作数据，就是操作视图，就是操作 DOM（所以无须操作 DOM ）。&lt;/s-text>\n        &lt;/s-paragraph>\n        &lt;s-paragraph>\n            无须操作 DOM ！借助 MVVM 框架，开发者只需完成包含 声明绑定 的视图模板，编写 &lt;s-text code>ViewModel&lt;/s-text> 中业务数据变更逻辑，&lt;s-text code>View&lt;/s-text> 层则完全实现了自动化。这将极大的降低前端应用的操作复杂度、极大提升应用的开发效率。MVVM 最标志性的特性就是 数据绑定 ，MVVM 的核心理念就是通过 声明式的数据绑定 来实现 &lt;s-text code>View&lt;/s-text> 层和其他层的分离。完全解耦 &lt;s-text code>View&lt;/s-text> 层这种理念，也使得 Web 前端的单元测试用例编写变得更容易。\n        &lt;/s-paragraph>\n        &lt;s-title level=\"{{2}}\">MVVM架构&lt;/s-title>\n        &lt;s-paragraph>\n            MVVM，说到底还是一种分层架构。它的分层如下：\n        &lt;/s-paragraph>\n        &lt;s-paragraph>\n            &lt;ul>\n                &lt;li>&lt;a href=\"#\">Model&lt;/a>： 域模型，用于持久化&lt;/li>\n                &lt;li>&lt;a href=\"#\">View&lt;/a>： 作为视图模板存在&lt;/li>\n                &lt;li>&lt;a href=\"#\">ViewModel&lt;/a>： 作为视图的模型，为视图服务&lt;/li>\n            &lt;/ul> \n        &lt;/s-paragraph>\n    &lt;/s-typography>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Typography, Divider} from 'santd';\n\nexport default {\n    components: {\n        's-typography': Typography,\n        's-title': Typography.Title,\n        's-paragraph': Typography.Paragraph,\n        's-text': Typography.Text,\n        's-divider': Divider\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本"><span>基本</span><a href="#基本" class="anchor">#</a></h4><p>展示文档样例。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-typography":o.jb,"s-title":o.jb.Title,"s-paragraph":o.jb.Paragraph,"s-text":o.jb.Text,"s-divider":o.t},template:'<div><s-typography><s-title>Introduction</s-title><s-paragraph>In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.</s-paragraph><s-paragraph>After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to <s-text strong="">uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development</s-text>.</s-paragraph><s-title level="{{2}}">Guidelines and Resources</s-title><s-paragraph>We supply a series of design principles, practical patterns and high quality design resources (<s-text code="">Sketch</s-text> and <s-text code="">Axure</s-text>), to help people create their product prototypes beautifully and efficiently.</s-paragraph><s-divider></s-divider><s-title>概念</s-title><s-paragraph>MVVM 模式，顾名思义即 Model-View-ViewModel 模式。它萌芽于2005年微软推出的基于 Windows 的用户界面框架 WPF ，前端最早的 MVVM 框架 knockout 在2010年发布。</s-paragraph><s-paragraph>一句话总结 Web 前端 MVVM：<s-text strong="">操作数据，就是操作视图，就是操作 DOM（所以无须操作 DOM ）。</s-text></s-paragraph><s-paragraph>无须操作 DOM ！借助 MVVM 框架，开发者只需完成包含 声明绑定 的视图模板，编写 <s-text code="">ViewModel</s-text> 中业务数据变更逻辑，<s-text code="">View</s-text> 层则完全实现了自动化。这将极大的降低前端应用的操作复杂度、极大提升应用的开发效率。MVVM 最标志性的特性就是 数据绑定 ，MVVM 的核心理念就是通过 声明式的数据绑定 来实现 <s-text code="">View</s-text> 层和其他层的分离。完全解耦 <s-text code="">View</s-text> 层这种理念，也使得 Web 前端的单元测试用例编写变得更容易。</s-paragraph><s-title level="{{2}}">MVVM架构</s-title><s-paragraph>MVVM，说到底还是一种分层架构。它的分层如下：</s-paragraph><s-paragraph><ul><li><a href="#">Model</a>： 域模型，用于持久化</li><li><a href="#">View</a>： 作为视图模板存在</li><li><a href="#">ViewModel</a>： 作为视图的模型，为视图服务</li></ul> </s-paragraph></s-typography></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032579047"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},i={template:'<section class="markdown"><h1 id="typograhpy-排版"><span>Typograhpy 排版</span><a href="#typograhpy-排版" class="anchor">#</a></h1><p>文本的基本格式。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul><li>当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。</li><li>当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。</li></ul></section>'},r={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n    &lt;s-text>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text type="secondary">Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text type="warning">Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text type="danger">Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text disabled>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text mark>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text code>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text underline>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text delete>Santd&lt;/s-text>\n    &lt;br/>\n    &lt;s-text strong>Santd&lt;/s-text>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Typography} from \'santd\';\n\nexport default {\n    components: {\n        \'s-text\': Typography.Text\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="文本组件"><span>文本组件</span><a href="#文本组件" class="anchor">#</a></h4><p>内置不同样式的文本。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-text":o.jb.Text},template:'<div><s-text>Santd</s-text><br><s-text type="secondary">Santd</s-text><br><s-text type="warning">Santd</s-text><br><s-text type="danger">Santd</s-text><br><s-text disabled="">Santd</s-text><br><s-text mark="">Santd</s-text><br><s-text code="">Santd</s-text><br><s-text underline="">Santd</s-text><br><s-text delete="">Santd</s-text><br><s-text strong="">Santd</s-text></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032578820"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},l={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n    &lt;s-title>h1. Santd&lt;/s-title>\n    &lt;s-title level="{{2}}">h2. Santd&lt;/s-title>\n    &lt;s-title level="{{3}}">h3. Santd&lt;/s-title>\n    &lt;s-title level="{{4}}">h4. Santd&lt;/s-title>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Typography} from \'santd\';\n\nexport default {\n    components: {\n        \'s-title\': Typography.Title,\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="标题组件"><span>标题组件</span><a href="#标题组件" class="anchor">#</a></h4><p>展示不同级别的标题。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-title":o.jb.Title},template:'<div><s-title>h1. Santd</s-title><s-title level="{{2}}">h2. Santd</s-title><s-title level="{{3}}">h3. Santd</s-title><s-title level="{{4}}">h4. Santd</s-title></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032579030"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},c={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n    &lt;s-paragraph copyable>This is a copyable text.&lt;/s-paragraph>\n    &lt;s-paragraph copyable=\"{{copyable}}\">\n        Replace copy text.\n    &lt;/s-paragraph>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Typography} from 'santd';\n\nexport default {\n    components: {\n        's-paragraph': Typography.Paragraph,\n    },\n    initData() {\n        return {\n            copyable: {\n                text: 'hello Santd',\n                onCopy() {\n                    console.log('onCopy');\n                }\n            }\n        }\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="可交互"><span>可交互</span><a href="#可交互" class="anchor">#</a></h4><p>提供额外的交互能力。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-paragraph":o.jb.Paragraph},initData:()=>({copyable:{text:"hello Santd",onCopy(){console.log("onCopy")}}}),template:'<div><s-paragraph copyable="">This is a copyable text.</s-paragraph><s-paragraph copyable="{{copyable}}">Replace copy text.</s-paragraph></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032579067"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},g={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-paragraph ellipsis>\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n        &lt;/s-paragraph>\n\n        &lt;s-paragraph ellipsis=\"{{{rows: 2}}}\">\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n            Santd, a design language for background applications, is refined by Baidu App Team.\n        &lt;/s-paragraph>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Typography} from 'santd';\n\nexport default {\n    components: {\n        's-paragraph': Typography.Paragraph\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="省略号"><span>省略号</span><a href="#省略号" class="anchor">#</a></h4><p>多行文本省略。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-paragraph":o.jb.Paragraph},template:'<div><s-paragraph ellipsis="">Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.</s-paragraph><s-paragraph ellipsis="{{{rows: 2}}}">Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.Santd, a design language for background applications, is refined by Baidu App Team.</s-paragraph></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032579039"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};e.default=n.a.defineComponent({components:{readme:s,basic:p,title:l,text:r,head:i,editable:c,ellipsis:g},template:"\n        <div>\n            <head/>\n            <basic/>\n            <title/>\n            <text/>\n            <editable/>\n            <ellipsis/>\n            <readme/>\n        </div>\n    "})}}]);