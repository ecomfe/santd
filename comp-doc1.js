(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{518:function(e,t,s){"use strict";s.r(t);var n=s(0),o=s.n(n),a={template:'<section class="markdown"><h1 id="alert-警告提示"><span>Alert 警告提示</span><a href="#alert-警告提示" class="anchor">#</a></h1><p>警告提示，展现需要关注的信息。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul><li>当某个页面需要向用户显示警告的信息时。</li><li>非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。</li></ul><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},i=s(8),r={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert message="Success Text" type="success"/>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="基本"><span>基本</span><a href="#基本" class="anchor">#</a></h4><p>最简单的用法，适用于简短的警告提示。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Success Text" type="success"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596830"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},c={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert message="Success Text" type="success"/>\n        &lt;s-alert message="Info Text" type="info"/>\n        &lt;s-alert message="Warning Text" type="warning"/>\n        &lt;s-alert message="Error Text" type="error"/>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="四种样式"><span>四种样式</span><a href="#四种样式" class="anchor">#</a></h4><p>共有四种样式 <code>success</code>、<code>info</code>、<code>warning</code>、<code>error</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Success Text" type="success"></s-alert><s-alert message="Info Text" type="info"></s-alert><s-alert message="Warning Text" type="warning"></s-alert><s-alert message="Error Text" type="error"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596818"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},p={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert\n            message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"\n            type="warning"\n            closable="{{true}}"\n            on-close="onClose"\n        />\n        &lt;s-alert\n            message="Error Text"\n            description="Error Description Error Description Error Description Error Description Error Description Error Description"\n            type="error"\n            closable="{{true}}"\n            on-close="onClose"\n        />\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    },\n    onClose(e) {\n        console.log(e, \'I was closed.\');\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="可关闭的警告提示"><span>可关闭的警告提示</span><a href="#可关闭的警告提示" class="anchor">#</a></h4><p>显示关闭按钮，点击可关闭警告提示。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},onClose(e){console.log(e,"I was closed.")},template:'<div><s-alert message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text" type="warning" closable="{{true}}" on-close="onClose"></s-alert><s-alert message="Error Text" description="Error Description Error Description Error Description Error Description Error Description Error Description" type="error" closable="{{true}}" on-close="onClose"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596812"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},l={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert\n            message="Success Text"\n            description="Success Description Success Description Success Description"\n            type="success"\n        />\n        &lt;s-alert\n            message="Info Text"\n            description="Info Description Info Description Info Description Info Description"\n            type="info"\n        />\n        &lt;s-alert\n            message="Warning Text"\n            description="Warning Description Warning Description Warning Description Warning Description"\n            type="warning"\n        />\n        &lt;s-alert\n            message="Error Text"\n            description="Error Description Error Description Error Description Error Description"\n            type="error"\n        />\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="含有辅助性文字介绍"><span>含有辅助性文字介绍</span><a href="#含有辅助性文字介绍" class="anchor">#</a></h4><p>含有辅助性文字介绍的警告提示。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Success Text" description="Success Description Success Description Success Description" type="success"></s-alert><s-alert message="Info Text" description="Info Description Info Description Info Description Info Description" type="info"></s-alert><s-alert message="Warning Text" description="Warning Description Warning Description Warning Description Warning Description" type="warning"></s-alert><s-alert message="Error Text" description="Error Description Error Description Error Description Error Description" type="error"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596805"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},d={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert\n            message="Success Tips"\n            type="success"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Informational Notes"\n            type="info"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Warning"\n            type="warning"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Error"\n            type="error"\n            showIcon="{{true}}"\n        />\n\n        &lt;s-alert\n            message="Success Tips"\n            description="Detailed description and advices about successful copywriting."\n            type="success"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Informational Notes"\n            description="Additional description and informations about copywriting."\n            type="info"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Warning"\n            description="This is a warning notice about copywriting."\n            type="warning"\n            showIcon="{{true}}"\n        />\n        &lt;s-alert\n            message="Error"\n            description="This is an error message about copywriting."\n            type="error"\n            showIcon="{{true}}"\n        />\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert, Icon} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="图标"><span>图标</span><a href="#图标" class="anchor">#</a></h4><p>可口的图标让信息类型更加醒目。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Success Tips" type="success" showIcon="{{true}}"></s-alert><s-alert message="Informational Notes" type="info" showIcon="{{true}}"></s-alert><s-alert message="Warning" type="warning" showIcon="{{true}}"></s-alert><s-alert message="Error" type="error" showIcon="{{true}}"></s-alert><s-alert message="Success Tips" description="Detailed description and advices about successful copywriting." type="success" showIcon="{{true}}"></s-alert><s-alert message="Informational Notes" description="Additional description and informations about copywriting." type="info" showIcon="{{true}}"></s-alert><s-alert message="Warning" description="This is a warning notice about copywriting." type="warning" showIcon="{{true}}"></s-alert><s-alert message="Error" description="This is an error message about copywriting." type="error" showIcon="{{true}}"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596823"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},g={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert message="Info Text" type="info" closeText="Close Now"/>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="自定义关闭"><span>自定义关闭</span><a href="#自定义关闭" class="anchor">#</a></h4><p>可以自定义关闭，自定义的文字会替换原先的关闭 <code>Icon</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Info Text" type="info" closeText="Close Now"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596796"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},m={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert message="Warning text" banner="{{true}}"/>\n        &lt;s-alert message="Very long warning text warning text text text text text text text" banner="{{true}}" closable="{{true}}"/>\n        &lt;s-alert message="Warning text without icon" banner="{{true}}" showIcon="{{false}}"/>\n        &lt;s-alert message="Error text" type="error" banner="{{true}}"/>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="顶部公告"><span>顶部公告</span><a href="#顶部公告" class="anchor">#</a></h4><p>页面顶部通告形式，默认有图标且<code>type</code> 为 &#39;warning&#39;。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},template:'<div><s-alert message="Warning text" banner="{{true}}"></s-alert><s-alert message="Very long warning text warning text text text text text text text" banner="{{true}}" closable="{{true}}"></s-alert><s-alert message="Warning text without icon" banner="{{true}}" showIcon="{{false}}"></s-alert><s-alert message="Error text" type="error" banner="{{true}}"></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596766"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},x={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert s-if="visible"\n            message="Alert Message Text"\n            type="success"\n            closable="{{true}}"\n            on-afterClose="afterClose"\n        />\n        &lt;p>placeholder text here&lt;/p>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert\n    },\n    initData() {\n        return {\n            visible: true\n        };\n    },\n    afterClose() {\n        this.data.set(\'visible\', false);\n        console.log(\'fired: afterClose\');\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="平滑地卸载"><span>平滑地卸载</span><a href="#平滑地卸载" class="anchor">#</a></h4><p>平滑、自然的卸载提示。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b},initData:()=>({visible:!0}),afterClose(){this.data.set("visible",!1),console.log("fired: afterClose")},template:'<div><s-alert s-if="visible" message="Alert Message Text" type="success" closable="{{true}}" on-afterClose="afterClose"></s-alert><p>placeholder text here</p></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596789"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},h={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-alert\n            message="showIcon = false"\n            type="success"\n            showIcon="{{false}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Success Tips"\n            type="success"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Informational Notes"\n            type="info"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Warning"\n            type="warning"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Error"\n            type="error"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n\n        &lt;s-alert\n            message="Success Tips"\n            description="Detailed description and advices about successful copywriting."\n            type="success"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Informational Notes"\n            description="Additional description and informations about copywriting."\n            type="info"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Warning"\n            description="This is a warning notice about copywriting."\n            type="warning"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n        &lt;s-alert\n            message="Error"\n            description="This is an error message about copywriting."\n            type="error"\n            showIcon="{{true}}"\n        >\n            &lt;s-icon type="smile" slot="icon"/>\n        &lt;/s-alert>\n    &lt;/div>\n&lt;/template>\n\n&lt;script>\nimport {Alert, Icon} from \'santd\';\n\nexport default {\n    components: {\n        \'s-alert\': Alert,\n        \'s-icon\': Icon\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="自定义图标"><span>自定义图标</span><a href="#自定义图标" class="anchor">#</a></h4><p>可口的图标让信息类型更加醒目。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-alert":i.b,"s-icon":i.z},template:'<div><s-alert message="showIcon = false" type="success" showIcon="{{false}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Success Tips" type="success" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Informational Notes" type="info" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Warning" type="warning" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Error" type="error" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Success Tips" description="Detailed description and advices about successful copywriting." type="success" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Informational Notes" description="Additional description and informations about copywriting." type="info" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Warning" description="This is a warning notice about copywriting." type="warning" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert><s-alert message="Error" description="This is an error message about copywriting." type="error" showIcon="{{true}}"><s-icon type="smile" slot="icon"></s-icon></s-alert></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617032596782"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},w={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>banner</td><td>是否用作顶部公告</td><td>boolean</td><td>false</td></tr><tr><td>closable</td><td>默认不显示关闭按钮</td><td>boolean</td><td>无</td></tr><tr><td>closeText</td><td>自定义关闭按钮</td><td>string</td><td>无</td></tr><tr><td>description</td><td>警告提示的辅助性文字介绍</td><td>string</td><td>无</td></tr><tr><td>icon</td><td>自定义图标，<code>showIcon</code> 为 <code>true</code> 时有效</td><td>slot</td><td>-</td></tr><tr><td>message</td><td>警告提示内容</td><td>string</td><td>无</td></tr><tr><td>showIcon</td><td>是否显示辅助图标</td><td>boolean</td><td>false，<code>banner</code> 模式下默认值为 true</td></tr><tr><td>type</td><td>指定警告提示的样式，有四种选择 <code>success</code>、<code>info</code>、<code>warning</code>、<code>error</code></td><td>string</td><td><code>info</code>，<code>banner</code> 模式下默认值为 <code>warning</code></td></tr><tr><td>on-afterClose</td><td>关闭动画结束后触发的回调函数</td><td>() =&gt; void</td><td>-</td></tr><tr><td>on-close</td><td>关闭时触发的回调函数</td><td>(e: MouseEvent) =&gt; void</td><td>无</td></tr></tbody></table></section>'};s(583),t.default=o.a.defineComponent({template:"\n        <div>\n            <head/>\n            <basic/>\n            <style/>\n            <closable/>\n            <description/>\n            <icon/>\n            <closetext/>\n            <banner/>\n            <smooth/>\n            <custom/>\n            <readme/>\n        </div>\n    ",components:{head:a,basic:r,style:c,closable:p,description:l,icon:d,closetext:g,banner:m,smooth:x,custom:h,readme:w}})},583:function(e,t,s){var n=s(4),o=s(584);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};n(o,a);e.exports=o.locals||{}},584:function(e,t,s){(t=s(5)(!1)).push([e.i,".code-box .santd-alert {\n  margin-bottom: 10px;\n}\n",""]),e.exports=t}}]);