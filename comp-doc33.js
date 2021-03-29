(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{548:function(e,t,n){"use strict";n.r(t);var s=n(0),o=n.n(s),a={template:'<section class="markdown"><h1 id="message-全局提示"><span>Message 全局提示</span><a href="#message-全局提示" class="anchor">#</a></h1><p>全局展示操作反馈信息。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul><li>可提供成功、警告和错误等反馈信息。</li><li>顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。</li></ul><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},d=n(8),i=n(70),c=(n(568),{initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-button type=\"primary\" on-click=\"clickHandler\">Display normal message&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Button} from 'santd';\nimport message from 'santd/es/message';\nimport 'santd/es/message/style';\n\nexport default {\n    components: {\n        's-button': Button\n    },\n    clickHandler() {\n        message.info('This is a normal message');\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="普通提示"><span>普通提示</span><a href="#普通提示" class="anchor">#</a></h4><p>信息提醒反馈。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-button":d.i},clickHandler(){i.a.info("This is a normal message")},template:'<div><s-button type="primary" on-click="clickHandler">Display normal message</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032593906"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'}),l=(n(669),{initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-button on-click=\"clickHandler1\">Success&lt;/s-button>\n        &lt;s-button on-click=\"clickHandler2\">Error&lt;/s-button>\n        &lt;s-button on-click=\"clickHandler3\">Warning&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Button} from 'santd';\nimport message from 'santd/es/message';\nimport 'santd/es/message/style';\n\nexport default {\n    components: {\n        's-button': Button\n    },\n    clickHandler1() {\n        message.success('This is a message of success');\n    },\n    clickHandler2() {\n        message.error('This is a message of error');\n    },\n    clickHandler3() {\n        message.warning('This is message of warning');\n    }\n}\n&lt;/script>\n\n&lt;style>\n#components-message-demo-other .san-btn {\n    margin-right: 8px;\n}\n&lt;/style></code></pre>",text:'\n<h4 id="其他提示类型"><span>其他提示类型</span><a href="#其他提示类型" class="anchor">#</a></h4><p>包括成功、失败、警告。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-button":d.i},clickHandler1(){i.a.success("This is a message of success")},clickHandler2(){i.a.error("This is a message of error")},clickHandler3(){i.a.warning("This is message of warning")},template:'<div><s-button on-click="clickHandler1">Success</s-button><s-button on-click="clickHandler2">Error</s-button><s-button on-click="clickHandler3">Warning</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032593875"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'}),p={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-button on-click=\"clickHandler\">Customized display duration&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Button} from 'santd';\nimport message from 'santd/es/message';\nimport 'santd/es/message/style';\n\nexport default {\n    components: {\n        's-button': Button\n    },\n    clickHandler() {\n        message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="修改延时"><span>修改延时</span><a href="#修改延时" class="anchor">#</a></h4><p>自定义时长 <code>10s</code>，默认时长为 <code>3s</code>。<code>注：鼠标经过时会重新计时</code></p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-button":d.i},clickHandler(){i.a.success("This is a prompt message for success, and it will disappear in 10 seconds",10)},template:'<div><s-button on-click="clickHandler">Customized display duration</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032593860"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},r={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-button on-click=\"clickHandler\">Display a loading indicator&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Button} from 'santd';\nimport message from 'santd/es/message';\nimport 'santd/es/message/style';\n\nexport default {\n    components: {\n        's-button': Button\n    },\n    clickHandler() {\n        const hide = message.loading('Action in progress..', 0);\n        // Dismiss manually and asynchronously\n        setTimeout(hide, 2500);\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="加载中"><span>加载中</span><a href="#加载中" class="anchor">#</a></h4><p>进行全局 loading，异步自行移除。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-button":d.i},clickHandler(){const e=i.a.loading("Action in progress..",0);setTimeout(e,2500)},template:'<div><s-button on-click="clickHandler">Display a loading indicator</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032593841"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},m={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-button on-click=\"clickHandler\">Display a sequence of message&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Button} from 'santd';\nimport message from 'santd/es/message';\nimport 'santd/es/message/style';\n\nexport default {\n    components: {\n        's-button': Button\n    },\n    clickHandler() {\n        message.loading('Action in progress..', 2.5)\n            .then(() => message.success('Loading finished', 2.5))\n            .then(() => message.info('Loading finished is finished', 2.5));\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="promise-接口"><span>Promise 接口</span><a href="#promise-接口" class="anchor">#</a></h4><p>可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-button":d.i},clickHandler(){i.a.loading("Action in progress..",2.5).then(()=>i.a.success("Loading finished",2.5)).then(()=>i.a.info("Loading finished is finished",2.5))},template:'<div><s-button on-click="clickHandler">Display a sequence of message</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032593834"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},g={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><p>组件提供了一些静态方法，使用方式和参数如下：</p><ul><li><code>message.success(content, [duration], onClose)</code></li><li><code>message.error(content, [duration], onClose)</code></li><li><code>message.info(content, [duration], onClose)</code></li><li><code>message.warning(content, [duration], onClose)</code></li><li><code>message.warn(content, [duration], onClose)</code> // alias of warning</li><li><code>message.loading(content, [duration], onClose)</code></li></ul><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>content</td><td>提示内容</td><td>string</td><td>-</td></tr><tr><td>duration</td><td>自动关闭的延时，单位秒。设为 0 时不自动关闭。</td><td>number</td><td>3</td></tr><tr><td>onClose</td><td>关闭时触发的回调函数</td><td>function</td><td>-</td></tr></tbody></table><p>组件同时提供 promise 接口。</p><ul><li><code>message[level](content, [duration]).then(afterClose)</code></li><li><code>message[level](content, [duration], onClose).then(afterClose)</code></li></ul><p>其中<code>message[level]</code> 是组件已经提供的静态方法。<code>then</code> 接口返回值是 Promise。</p><ul><li><code>message.open(config)</code></li></ul><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>content</td><td>提示内容</td><td>string</td><td>-</td></tr><tr><td>duration</td><td>自动关闭的延时，单位秒。设为 0 时不自动关闭。</td><td>number</td><td>3</td></tr><tr><td>onClose</td><td>关闭时触发的回调函数</td><td>function</td><td>-</td></tr><tr><td>icon</td><td>自定义图标(模板HTML标签请使用<code>&lt;ui-icon/&gt;</code>)</td><td>string</td><td>-</td></tr></tbody></table><h3 id="全局方法"><span>全局方法</span><a href="#全局方法" class="anchor">#</a></h3><p>还提供了全局配置和全局销毁方法：</p><ul><li><code>message.config(options)</code></li><li><code>message.destroy()</code></li></ul><h4 id="messageconfig"><span>message.config</span><a href="#messageconfig" class="anchor">#</a></h4><pre><code class="language-js">message.config({top: 100,duration: 2,maxCount: 3});</code></pre><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>duration</td><td>默认自动关闭延时，单位秒</td><td>number</td><td>3</td></tr><tr><td>getContainer</td><td>配置渲染节点的输出位置</td><td>() =&gt; HTMLElement</td><td>() =&gt; document.body</td></tr><tr><td>maxCount</td><td>最大显示数, 超过限制时，最早的消息会被自动关闭</td><td>number</td><td>-</td></tr><tr><td>top</td><td>消息距离顶部的位置</td><td>number</td><td>24</td></tr></tbody></table></section>'};t.default=o.a.defineComponent({template:"\n        <div>\n            <head/>\n            <info/>\n            <other/>\n            <duration/>\n            <loading/>\n            <thenable/>\n            <readme/>\n        </div>\n    ",components:{head:a,info:c,other:l,duration:p,loading:r,thenable:m,readme:g}})},568:function(e,t,n){"use strict";n(124)},669:function(e,t,n){var s=n(4),o=n(670);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};s(o,a);e.exports=o.locals||{}},670:function(e,t,n){(t=n(5)(!1)).push([e.i,"\n#components-message-demo-other .san-btn {\n    margin-right: 8px;\n}\n",""]),e.exports=t}}]);