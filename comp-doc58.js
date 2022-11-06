(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{541:function(e,t,i){"use strict";i.r(t);var n=i(0),s=i.n(n),l={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><h3 id="timeline"><span>Timeline</span><a href="#timeline" class="anchor">#</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>pending</td><td>指定最后一个幽灵节点是否存在或内容</td><td>slot</td><td>-</td></tr><tr><td>pendingDot</td><td>当最后一个幽灵节点存在時，指定其时间图点</td><td>slot</td><td><code>&lt;s-icon type=&quot;loading&quot; /&gt;</code></td></tr><tr><td>reverse</td><td>节点排序</td><td>boolean</td><td>false</td></tr><tr><td>mode</td><td>通过设置 <code>mode</code> 可以改变时间轴和内容的相对位置</td><td><code>left</code> | <code>alternate</code> | <code>right</code></td><td>-</td></tr></tbody></table><h3 id="timelineitem："><span>Timeline.Item：</span><a href="#timelineitem：" class="anchor">#</a></h3><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>color</td><td>指定圆圈颜色 <code>blue, red, green</code>，或自定义的色值</td><td>string</td><td>blue</td></tr><tr><td>dot</td><td>自定义时间轴点</td><td>slot</td><td>-</td></tr><tr><td>position</td><td>自定义节点位置</td><td><code>left</code> | <code>right</code></td><td>-</td></tr><tr><td>label</td><td>设置标签</td><td>string</td><td>-</td></tr></tbody></table></section>'},o={template:'<section class="markdown"><h1 id="timeline-时间轴"><span>Timeline 时间轴</span><a href="#timeline-时间轴" class="anchor">#</a></h1><p>垂直展示的时间流信息。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul><li>当有一系列信息需按时间排列时，可正序和倒序。</li><li>需要有一条时间轴进行视觉上的串联时。</li></ul><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},a=i(8),c={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-timeline>\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Solve initial network problems 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Technical testing 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Network problems being solved 2015-09-01&lt;/s-timeline-item>\n        &lt;/s-timeline>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Timeline} from 'santd';\n\nexport default {\n    components: {\n        's-timeline': Timeline,\n        's-timeline-item': Timeline.Item\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本用法"><span>基本用法</span><a href="#基本用法" class="anchor">#</a></h4><p>基本的时间轴。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item},template:"<div><s-timeline><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item><s-timeline-item>Technical testing 2015-09-01</s-timeline-item><s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item></s-timeline></div>"}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116225"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},m={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-timeline mode="right">\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Solve initial network problems 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="red">\n                &lt;s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />\n                Technical testing 2015-09-01\n            &lt;/s-timeline-item>\n            &lt;s-timeline-item>Network problems being solved 2015-09-01&lt;/s-timeline-item>\n        &lt;/s-timeline>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport {Timeline, Icon} from \'santd\';\n\nexport default {\n    components: {\n        \'s-timeline\': Timeline,\n        \'s-timeline-item\': Timeline.Item,\n        \'s-icon\': Icon\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="右侧时间轴点"><span>右侧时间轴点</span><a href="#右侧时间轴点" class="anchor">#</a></h4><p>时间轴点可以在内容的右边。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item,"s-icon":a.z},template:'<div><s-timeline mode="right"><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item><s-timeline-item color="red"><s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot"></s-icon>Technical testing 2015-09-01</s-timeline-item><s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item></s-timeline></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116230"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},d={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-timeline mode="alternate">\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="green">Solve initial network problems 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>\n                &lt;s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />\n                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.&lt;/s-timeline-item>\n            &lt;s-timeline-item color="red">Network problems being solved 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>\n                &lt;s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />\n                Technical testing 2015-09-01\n            &lt;/s-timeline-item>\n        &lt;/s-timeline>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport {Timeline, Icon} from \'santd\';\n\nexport default {\n    components: {\n        \'s-timeline\': Timeline,\n        \'s-timeline-item\': Timeline.Item,\n        \'s-icon\': Icon\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="交替展现"><span>交替展现</span><a href="#交替展现" class="anchor">#</a></h4><p>内容在时间轴两侧轮流出现。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item,"s-icon":a.z},template:'<div><s-timeline mode="alternate"><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item color="green">Solve initial network problems 2015-09-01</s-timeline-item><s-timeline-item><s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot"></s-icon>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</s-timeline-item><s-timeline-item color="red">Network problems being solved 2015-09-01</s-timeline-item><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item><s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot"></s-icon>Technical testing 2015-09-01</s-timeline-item></s-timeline></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116216"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},p={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-timeline>\n            &lt;s-timeline-item color="green">Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="green">Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="red">\n                &lt;p>Solve initial network problems 1&lt;/p>\n                &lt;p>Solve initial network problems 2&lt;/p>\n                &lt;p>Solve initial network problems 3 2015-09-01&lt;/p>\n            &lt;/s-timeline-item>\n            &lt;s-timeline-item>\n                &lt;p>Technical testing 1&lt;/p>\n                &lt;p>Technical testing 2&lt;/p>\n                &lt;p>Technical testing 3 2015-09-01&lt;/p>\n            &lt;/s-timeline-item>\n            &lt;s-timeline-item color="gray">\n                &lt;p>Technical testing 1&lt;/p>\n                &lt;p>Technical testing 2&lt;/p>\n                &lt;p>Technical testing 3 2015-09-01&lt;/p>\n            &lt;/s-timeline-item>\n    &lt;/s-timeline>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Timeline} from \'santd\';\n\nexport default {\n    components: {\n        \'s-timeline\': Timeline,\n        \'s-timeline-item\': Timeline.Item\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="圆圈颜色"><span>圆圈颜色</span><a href="#圆圈颜色" class="anchor">#</a></h4><p>圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item},template:'<div><s-timeline><s-timeline-item color="green">Create a services site 2015-09-01</s-timeline-item><s-timeline-item color="green">Create a services site 2015-09-01</s-timeline-item><s-timeline-item color="red"><p>Solve initial network problems 1</p><p>Solve initial network problems 2</p><p>Solve initial network problems 3 2015-09-01</p></s-timeline-item><s-timeline-item><p>Technical testing 1</p><p>Technical testing 2</p><p>Technical testing 3 2015-09-01</p></s-timeline-item><s-timeline-item color="gray"><p>Technical testing 1</p><p>Technical testing 2</p><p>Technical testing 3 2015-09-01</p></s-timeline-item></s-timeline></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116221"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},r={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-timeline>\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item>Solve initial network problems 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color=\"red\">\n                &lt;s-icon type=\"clock-circle-o\" style=\"font-size: 16px;\" slot=\"dot\" />\n                Technical testing 2015-09-01\n            &lt;/s-timeline-item>\n            &lt;s-timeline-item>Network problems being solved 2015-09-01&lt;/s-timeline-item>\n        &lt;/s-timeline>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from 'san';\nimport {Timeline, Icon} from 'santd';\n\nexport default {\n    components: {\n        's-timeline': Timeline,\n        's-timeline-item': Timeline.Item,\n        's-icon': Icon\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="自定义时间轴点"><span>自定义时间轴点</span><a href="#自定义时间轴点" class="anchor">#</a></h4><p>可以设置为图标或其他自定义元素。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item,"s-icon":a.z},template:'<div><s-timeline><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item>Solve initial network problems 2015-09-01</s-timeline-item><s-timeline-item color="red"><s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot"></s-icon>Technical testing 2015-09-01</s-timeline-item><s-timeline-item>Network problems being solved 2015-09-01</s-timeline-item></s-timeline></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116212"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},h={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-timeline reverse="{{reverse}}">\n            &lt;template slot="pending">Recording...&lt;/template>\n            &lt;s-timeline-item>Create a services site 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="red">Solve initial network problems 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="green">Solve initial network problems 3 2015-09-01&lt;/s-timeline-item>\n            &lt;s-timeline-item color="blue">Network problems being solved 2015-09-01&lt;/s-timeline-item>\n        &lt;/s-timeline>\n        &lt;s-button type="primary" on-click="handleToggle">Toggle Reverse&lt;/s-button>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Timeline, Button} from \'santd\';\n\nexport default {\n    components: {\n        \'s-timeline\': Timeline,\n        \'s-timeline-item\': Timeline.Item,\n        \'s-button\': Button\n    },\n    handleToggle() {\n        this.data.apply(\'reverse\', reverse => !reverse);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="最后一个及排序"><span>最后一个及排序</span><a href="#最后一个及排序" class="anchor">#</a></h4><p>当任务状态正在发生，还在记录过程中，可用幽灵节点来表示当前的时间节点，当 pending 存在时展示幽灵节点，同时 pendingDot 将可以用于定制其轴点。reverse 属性用于控制节点排序，为 false 时按正序排列，为 true 时按倒序排列。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item,"s-button":a.i},handleToggle(){this.data.apply("reverse",e=>!e)},template:'<div><s-timeline reverse="{{reverse}}"><template slot="pending">Recording...</template><s-timeline-item>Create a services site 2015-09-01</s-timeline-item><s-timeline-item color="red">Solve initial network problems 2015-09-01</s-timeline-item><s-timeline-item color="green">Solve initial network problems 3 2015-09-01</s-timeline-item><s-timeline-item color="blue">Network problems being solved 2015-09-01</s-timeline-item></s-timeline><s-button type="primary" on-click="handleToggle">Toggle Reverse</s-button></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116208"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},g={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-group name="radiogroup" value="{{value}}" on-change="handleChange" style="margin-bottom: 20px">\n            &lt;s-radio value="{{left}}">Left&lt;/s-radio>\n            &lt;s-radio value="{{right}}">Right&lt;/s-radio>\n            &lt;s-radio value="{{alternate}}">Alternate&lt;/s-radio>\n        &lt;/s-group>\n        &lt;s-timeline mode="{{value}}">\n            &lt;s-timeline-item label="2020-01-01">Create a services site&lt;/s-timeline-item>\n            &lt;s-timeline-item label="2020-06-01" color="green">Solve initial network problems&lt;/s-timeline-item>\n            &lt;s-timeline-item>\n                &lt;s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot" />\n                Technical testing&lt;/s-timeline-item>\n            &lt;s-timeline-item label="2020-09-01" color="red">Network problems being solved&lt;/s-timeline-item>\n        &lt;/s-timeline>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport {Timeline, Icon, Radio} from \'santd\';\n\nexport default {\n    initData() {\n        return {\n            value: \'left\',\n            left: \'left\',\n            right: \'right\',\n            alternate: \'alternate\'\n        }\n    },\n    components: {\n        \'s-timeline\': Timeline,\n        \'s-timeline-item\': Timeline.Item,\n        \'s-icon\': Icon,\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group\n    },\n    handleChange(e) {\n        this.data.set(\'value\', e.target.value);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="标签"><span>标签</span><a href="#标签" class="anchor">#</a></h4><p>使用 label 标签单独展示时间</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{initData:()=>({value:"left",left:"left",right:"right",alternate:"alternate"}),components:{"s-timeline":a.fb,"s-timeline-item":a.fb.Item,"s-icon":a.z,"s-radio":a.P,"s-group":a.P.Group},handleChange(e){this.data.set("value",e.target.value)},template:'<div><s-group name="radiogroup" value="{{value}}" on-change="handleChange" style="margin-bottom: 20px"><s-radio value="{{left}}">Left</s-radio><s-radio value="{{right}}">Right</s-radio><s-radio value="{{alternate}}">Alternate</s-radio></s-group><s-timeline mode="{{value}}"><s-timeline-item label="2020-01-01">Create a services site</s-timeline-item><s-timeline-item label="2020-06-01" color="green">Solve initial network problems</s-timeline-item><s-timeline-item><s-icon type="clock-circle-o" style="font-size: 16px;" slot="dot"></s-icon>Technical testing</s-timeline-item><s-timeline-item label="2020-09-01" color="red">Network problems being solved</s-timeline-item></s-timeline></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754116194"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};t.default=s.a.defineComponent({components:{readme:l,basic:c,desc:o,mode:m,alternate:d,color:p,dot:r,pending:h,label:g},template:"\n        <div>\n            <desc/>\n            <basic/>\n            <color/>\n            <pending/>\n            <dot/>\n            <alternate/>\n            <mode/>\n            <label/>\n            <readme/>\n        </div>\n    "})}}]);