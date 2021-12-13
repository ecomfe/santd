(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{564:function(n,t,o){"use strict";o.r(t);var e=o(0),s=o.n(e),a={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>target</td>\n<td>设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数</td>\n<td>Function</td>\n<td><code>() =&gt; window</code></td>\n</tr>\n<tr>\n<td>visibilityHeight</td>\n<td>滚动高度达到此参数值才出现 backtop</td>\n<td>number</td>\n<td>400</td>\n</tr>\n<tr>\n<td>on-click</td>\n<td>点击按钮的回调函数</td>\n<td>Function</td>\n<td>-</td>\n</tr>\n</tbody></table>\n</section>'},c={template:'<section class="markdown"><h1 id="backtop-回到顶部"><span>BackTop 回到顶部</span><a href="#backtop-回到顶部" class="anchor">#</a></h1><p>返回页面顶部的操作按钮。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul>\n<li>当页面内容区域比较长时；</li>\n<li>当用户需要频繁返回顶部查看相关内容时。</li>\n</ul>\n<h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},d=o(8),p={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-backtop />\n        Scroll down to see the bottom-right&lt;strong style=\"color: rgba(64, 64, 64, 0.6);\"> gray &lt;/strong>button.\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {BackTop} from 'santd';\n\nexport default {\n    components: {\n        's-backtop': BackTop\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本"><span>基本</span><a href="#基本" class="anchor">#</a></h4><p>最简单的用法。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-backtop":d.f},template:'\n    <div>\n        <s-backtop></s-backtop>\n        Scroll down to see the bottom-right<strong style="color: rgba(64, 64, 64, 0.6);"> gray </strong>button.\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397095846">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},i=(o(588),{initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div id="custom">\n        &lt;s-back-top>\n            &lt;div class="santd-back-top-inner">UP&lt;/div>\n        &lt;/s-back-top>\n        Scroll down to see the bottom-right&lt;strong style="color: #1088e9;"> blue &lt;/strong>button.\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {BackTop} from \'santd\';\n\nexport default {\n    components: {\n        \'s-back-top\': BackTop\n    }\n}\n&lt;/script>\n&lt;style type="text/css">\n    #custom .santd-back-top {\n      bottom: 100px;\n    }\n    #custom .santd-back-top-inner {\n      height: 40px;\n      width: 40px;\n      line-height: 40px;\n      border-radius: 4px;\n      background-color: #1088e9;\n      color: #fff;\n      text-align: center;\n      font-size: 20px;\n    }\n&lt;/style></code></pre>',text:'\n<h4 id="自定义样式"><span>自定义样式</span><a href="#自定义样式" class="anchor">#</a></h4><p>可以自定义回到顶部按钮的样式，限制宽高：<code>40px * 40px</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-back-top":d.f},template:'\n    <div id="custom">\n        <s-back-top>\n            <div class="santd-back-top-inner">UP</div>\n        </s-back-top>\n        Scroll down to see the bottom-right<strong style="color: #1088e9;"> blue </strong>button.\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397095850">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'});t.default=s.a.defineComponent({components:{readme:a,desc:c,basic:p,self:i},template:"\n        <div>\n            <desc/>\n            <basic/>\n            <self/>\n            <readme/>\n        </div>\n    "})},588:function(n,t,o){var e=o(4),s=o(589);"string"==typeof(s=s.__esModule?s.default:s)&&(s=[[n.i,s,""]]);var a={insert:"head",singleton:!1};e(s,a);n.exports=s.locals||{}},589:function(n,t,o){(t=o(5)(!1)).push([n.i,"\n    #custom .santd-back-top {\n      bottom: 100px;\n    }\n    #custom .santd-back-top-inner {\n      height: 40px;\n      width: 40px;\n      line-height: 40px;\n      border-radius: 4px;\n      background-color: #1088e9;\n      color: #fff;\n      text-align: center;\n      font-size: 20px;\n    }\n",""]),n.exports=t}}]);