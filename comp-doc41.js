(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{523:function(n,t,a){"use strict";a.r(t);var e=a(0),o=a.n(e),s={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><h3 id="radio"><span>Radio</span><a href="#radio" class="anchor">#</a></h3><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>autoFocus</td>\n<td>自动获取焦点</td>\n<td>boolean</td>\n<td><code>false</code></td>\n</tr>\n<tr>\n<td>checked</td>\n<td>指定当前是否选中</td>\n<td>boolean</td>\n<td><code>1false</code></td>\n</tr>\n<tr>\n<td>defaultChecked</td>\n<td>初始是否选中</td>\n<td>boolean</td>\n<td><code>false</code></td>\n</tr>\n<tr>\n<td>value</td>\n<td>根据 value 进行比较，判断是否选中</td>\n<td>any</td>\n<td>-</td>\n</tr>\n</tbody></table>\n<h3 id="radiogroup"><span>RadioGroup</span><a href="#radiogroup" class="anchor">#</a></h3><p>单选框组合，用于包裹一组 <code>Radio</code>。</p><table>\n<thead>\n<tr>\n<th>参数</th>\n<th>说明</th>\n<th>类型</th>\n<th>默认值</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>defaultValue</td>\n<td>默认选中的值</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>disabled</td>\n<td>禁选所有子单选器</td>\n<td>boolean</td>\n<td><code>false</code></td>\n</tr>\n<tr>\n<td>name</td>\n<td>RadioGroup 下所有 <code>input[type=&quot;radio&quot;]</code> 的 <code>name</code> 属性</td>\n<td>string</td>\n<td>-</td>\n</tr>\n<tr>\n<td>options</td>\n<td>以配置形式设置子元素</td>\n<td>string[] | Array&lt;{ label: string value: string disabled?: boolean }&gt;</td>\n<td>-</td>\n</tr>\n<tr>\n<td>size</td>\n<td>大小，只对按钮样式生效</td>\n<td><code>large</code> | <code>default</code> | <code>small</code></td>\n<td><code>default</code></td>\n</tr>\n<tr>\n<td>value</td>\n<td>用于设置当前选中的值</td>\n<td>any</td>\n<td>-</td>\n</tr>\n<tr>\n<td>on-change</td>\n<td>选项变化时的回调函数</td>\n<td>Function(e:Event)</td>\n<td>-</td>\n</tr>\n<tr>\n<td>buttonStyle</td>\n<td>RadioButton 的风格样式，目前有描边和填色两种风格</td>\n<td><code>outline</code> | <code>solid</code></td>\n<td><code>outline</code></td>\n</tr>\n</tbody></table>\n<h2 id="方法"><span>方法</span><a href="#方法" class="anchor">#</a></h2><h3 id="radio-1"><span>Radio</span><a href="#radio-1" class="anchor">#</a></h3><table>\n<thead>\n<tr>\n<th>名称</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>blur()</td>\n<td>移除焦点</td>\n</tr>\n<tr>\n<td>focus()</td>\n<td>获取焦点</td>\n</tr>\n</tbody></table>\n</section>'},d={template:'<section class="markdown"><h1 id="radio-单选框"><span>Radio 单选框</span><a href="#radio-单选框" class="anchor">#</a></h1><p>单选框。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><ul>\n<li>用于在多个备选项中选中单个状态。</li>\n<li>和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。</li>\n</ul>\n<h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},l=a(8),i={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-radio>Radio&lt;/s-radio>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from 'santd';\n\nexport default {\n    components: {\n        's-radio': Radio\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本"><span>基本</span><a href="#基本" class="anchor">#</a></h4><p>最简单的用法。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O},template:"\n    <div>\n        <s-radio>Radio</s-radio>\n    </div>\n"}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093703">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},p={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-radio value="{{3}}" disabled="{{disabled}}">Disabled&lt;/s-radio>\n        &lt;br/>\n        &lt;s-radio value="{{3}}" disabled="{{disabled}}" defaultChecked="{{true}}">Disabled&lt;/s-radio>\n        &lt;div style="margin-top: 20px;">\n            &lt;s-button on-click="toggleDisabled">Toggle Disabled&lt;/s-button>\n        &lt;/div>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio, Button} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-button\': Button\n    },\n    initData() {\n        return {\n            disabled: true\n        };\n    },\n    toggleDisabled() {\n        this.data.set(\'disabled\', !this.data.get(\'disabled\'));\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="不可用"><span>不可用</span><a href="#不可用" class="anchor">#</a></h4><p>Radio不可用。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-button":l.i},initData:()=>({disabled:!0}),toggleDisabled(){this.data.set("disabled",!this.data.get("disabled"))},template:'\n    <div>\n        <s-radio value="{{3}}" disabled="{{disabled}}">Disabled</s-radio>\n        <br>\n        <s-radio value="{{3}}" disabled="{{disabled}}" defaultChecked="{{true}}">Disabled</s-radio>\n        <div style="margin-top: 20px;">\n            <s-button on-click="toggleDisabled">Toggle Disabled</s-button>\n        </div>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093692">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},c={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-group name="radiogroup" value="{{value}}" on-change="handleChange">\n            &lt;s-radio value="{{1}}">A&lt;/s-radio>\n            &lt;s-radio value="{{2}}">B&lt;/s-radio>\n            &lt;s-radio value="{{3}}">C&lt;/s-radio>\n            &lt;s-radio value="{{4}}">D&lt;/s-radio>\n        &lt;/s-group>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group\n    },\n    initData() {\n        return {\n            value: 1\n        }\n    },\n    handleChange(e) {\n        console.log(\'radio checked\', e.target.value);\n        this.data.set(\'value\', Number(e.target.value));\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="单选组合"><span>单选组合</span><a href="#单选组合" class="anchor">#</a></h4><p>一组互斥的 Radio 配合使用。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group},initData:()=>({value:1}),handleChange(n){console.log("radio checked",n.target.value),this.data.set("value",Number(n.target.value))},template:'\n    <div>\n        <s-group name="radiogroup" value="{{value}}" on-change="handleChange">\n            <s-radio value="{{1}}">A</s-radio>\n            <s-radio value="{{2}}">B</s-radio>\n            <s-radio value="{{3}}">C</s-radio>\n            <s-radio value="{{4}}">D</s-radio>\n        </s-group>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093699">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},r={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-group name="radiogroup" value="{{value}}" on-change="handleChange">\n            &lt;s-radio value="{{1}}" style="{{radioStyle}}">Option A&lt;/s-radio>\n            &lt;s-radio value="{{2}}" style="{{radioStyle}}">Option B&lt;/s-radio>\n            &lt;s-radio value="{{3}}" style="{{radioStyle}}">Option C&lt;/s-radio>\n            &lt;s-radio value="{{4}}" style="{{radioStyle}}">\n                More...\n                &lt;s-input s-if="value === 4" style="width: 100px; margin-left: 10px;"/>\n            &lt;/s-radio>\n        &lt;/s-group>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio, Input} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group,\n        \'s-input\': Input\n    },\n    initData() {\n        return {\n            radioStyle: {\n                \'display\': \'block\',\n                \'height\': \'30px\',\n                \'line-height\': \'30px\'\n            },\n            value: 1\n        }\n    },\n    handleChange(e) {\n        console.log(\'radio checked\', e.target.value);\n        this.data.set(\'value\', Number(e.target.value));\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="radiogroup-垂直"><span>RadioGroup 垂直</span><a href="#radiogroup-垂直" class="anchor">#</a></h4><p>垂直的 RadioGroup，配合更多输入框选项。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group,"s-input":l.A},initData:()=>({radioStyle:{display:"block",height:"30px","line-height":"30px"},value:1}),handleChange(n){console.log("radio checked",n.target.value),this.data.set("value",Number(n.target.value))},template:'\n    <div>\n        <s-group name="radiogroup" value="{{value}}" on-change="handleChange">\n            <s-radio value="{{1}}" style="{{radioStyle}}">Option A</s-radio>\n            <s-radio value="{{2}}" style="{{radioStyle}}">Option B</s-radio>\n            <s-radio value="{{3}}" style="{{radioStyle}}">Option C</s-radio>\n            <s-radio value="{{4}}" style="{{radioStyle}}">\n                More...\n                <s-input s-if="value === 4" style="width: 100px; margin-left: 10px;"></s-input>\n            </s-radio>\n        </s-group>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093686">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},u={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-group name="radiogroup" defaultValue="{{1}}">\n            &lt;s-radio value="{{1}}">A&lt;/s-radio>\n            &lt;s-radio value="{{2}}">B&lt;/s-radio>\n            &lt;s-radio value="{{3}}">C&lt;/s-radio>\n            &lt;s-radio value="{{4}}">D&lt;/s-radio>\n        &lt;/s-group>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="单选组合-配合-name-使用"><span>单选组合 - 配合 name 使用</span><a href="#单选组合-配合-name-使用" class="anchor">#</a></h4><p>可以为 RadioGroup 配置 <code>name</code> 参数，为组合内的 input 元素赋予相同的 <code>name</code> 属性，使浏览器把 RadioGroup 下的 Radio 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group},template:'\n    <div>\n        <s-group name="radiogroup" defaultValue="{{1}}">\n            <s-radio value="{{1}}">A</s-radio>\n            <s-radio value="{{2}}">B</s-radio>\n            <s-radio value="{{3}}">C</s-radio>\n            <s-radio value="{{4}}">D</s-radio>\n        </s-group>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093695">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},g={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-group value=\"{{value1}}\" options=\"{{plainOptions}}\" on-change=\"onChange1($event)\" name=\"group1\"/>\n        &lt;s-group value=\"{{value2}}\" options=\"{{options}}\" on-change=\"onChange2($event)\" name=\"group2\"/>\n        &lt;s-group value=\"{{value3}}\" options=\"{{optionsWithDisabled}}\" on-change=\"onChange3($event)\" name=\"group3\"/>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from 'santd';\n\nexport default {\n    components: {\n        's-radio': Radio,\n        's-group': Radio.Group\n    },\n    initData() {\n        return {\n            value1: 'Apple',\n            value2: 'Apple',\n            value3: 'Apple',\n            plainOptions: ['Apple', 'Pear', 'Orange'],\n            options: [\n                { label: 'Apple', value: 'Apple' },\n                { label: 'Pear', value: 'Pear' },\n                { label: 'Orange', value: 'Orange' },\n            ],\n            optionsWithDisabled: [\n                { label: 'Apple', value: 'Apple' },\n                { label: 'Pear', value: 'Pear' },\n                { label: 'Orange', value: 'Orange', disabled: true }\n            ]\n        };\n    },\n    onChange1(e) {\n        this.data.set('value1', e.target.value);\n    },\n    onChange2(e) {\n        this.data.set('value2', e.target.value);\n    },\n    onChange3(e) {\n        this.data.set('value3', e.target.value);\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="radiogroup-组合-配置方式"><span>RadioGroup 组合 - 配置方式</span><a href="#radiogroup-组合-配置方式" class="anchor">#</a></h4><p>通过配置 <code>options</code> 参数来渲染单选框。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group},initData:()=>({value1:"Apple",value2:"Apple",value3:"Apple",plainOptions:["Apple","Pear","Orange"],options:[{label:"Apple",value:"Apple"},{label:"Pear",value:"Pear"},{label:"Orange",value:"Orange"}],optionsWithDisabled:[{label:"Apple",value:"Apple"},{label:"Pear",value:"Pear"},{label:"Orange",value:"Orange",disabled:!0}]}),onChange1(n){this.data.set("value1",n.target.value)},onChange2(n){this.data.set("value2",n.target.value)},onChange3(n){this.data.set("value3",n.target.value)},template:'\n    <div>\n        <s-group value="{{value1}}" options="{{plainOptions}}" on-change="onChange1($event)" name="group1"></s-group>\n        <s-group value="{{value2}}" options="{{options}}" on-change="onChange2($event)" name="group2"></s-group>\n        <s-group value="{{value3}}" options="{{optionsWithDisabled}}" on-change="onChange3($event)" name="group3"></s-group>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093677">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},h={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;div>\n            &lt;s-group defaultValue="a" on-change="handleChange" name="button1">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n        &lt;div style="margin-top: 16px;">\n            &lt;s-group defaultValue="a" on-change="handleChange" name="button2">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b" disabled="{{true}}">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n        &lt;div style="margin-top: 16px;">\n            &lt;s-group defaultValue="a" on-change="handleChange" disabled="{{true}}" name="button3">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group,\n        \'s-button\': Radio.Button\n    },\n    handleChange(e) {\n        console.log(&#96;radio checked:&#36;&#123;e.target.value}&#96;);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="按钮样式"><span>按钮样式</span><a href="#按钮样式" class="anchor">#</a></h4><p>按钮样式的单选组合。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group,"s-button":l.O.Button},handleChange(n){console.log("radio checked:"+n.target.value)},template:'\n    <div>\n        <div>\n            <s-group defaultValue="a" on-change="handleChange" name="button1">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n        <div style="margin-top: 16px;">\n            <s-group defaultValue="a" on-change="handleChange" name="button2">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b" disabled="{{true}}">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n        <div style="margin-top: 16px;">\n            <s-group defaultValue="a" on-change="handleChange" disabled="{{true}}" name="button3">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093672">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},b={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;div>\n            &lt;s-group defaultValue="a" buttonStyle="solid" name="button1">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n        &lt;div style="margin-top: 16px;">\n            &lt;s-group defaultValue="a" buttonStyle="solid" name="button2">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b" disabled="{{true}}">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group,\n        \'s-button\': Radio.Button\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="填底的按钮样式"><span>填底的按钮样式</span><a href="#填底的按钮样式" class="anchor">#</a></h4><p>实色填底的单选按钮样式。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group,"s-button":l.O.Button},template:'\n    <div>\n        <div>\n            <s-group defaultValue="a" buttonStyle="solid" name="button1">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n        <div style="margin-top: 16px;">\n            <s-group defaultValue="a" buttonStyle="solid" name="button2">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b" disabled="{{true}}">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093665">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'},v={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;div>\n            &lt;s-group defaultValue="a" size="large" name="group1">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n        &lt;div style="margin-top: 16px;">\n            &lt;s-group defaultValue="a" name="group2">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n        &lt;div style="margin-top: 16px;">\n            &lt;s-group defaultValue="a" size="small" name="group3">\n                &lt;s-button value="a">Hangzhou&lt;/s-button>\n                &lt;s-button value="b">Shanghai&lt;/s-button>\n                &lt;s-button value="c">Beijing&lt;/s-button>\n                &lt;s-button value="d">Chengdu&lt;/s-button>\n            &lt;/s-group>\n        &lt;/div>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport {Radio} from \'santd\';\n\nexport default {\n    components: {\n        \'s-radio\': Radio,\n        \'s-group\': Radio.Group,\n        \'s-button\': Radio.Button\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="大小"><span>大小</span><a href="#大小" class="anchor">#</a></h4><p>大中小三种组合，可以和表单输入框进行对应配合。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-radio":l.O,"s-group":l.O.Group,"s-button":l.O.Button},template:'\n    <div>\n        <div>\n            <s-group defaultValue="a" size="large" name="group1">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n        <div style="margin-top: 16px;">\n            <s-group defaultValue="a" name="group2">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n        <div style="margin-top: 16px;">\n            <s-group defaultValue="a" size="small" name="group3">\n                <s-button value="a">Hangzhou</s-button>\n                <s-button value="b">Shanghai</s-button>\n                <s-button value="c">Beijing</s-button>\n                <s-button value="d">Chengdu</s-button>\n            </s-group>\n        </div>\n    </div>\n'}},template:'\n    <section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1639397093682">\n        <section class="code-box-demo"><code-preview></code-preview></section>\n        <section class="code-box-meta markdown">\n            {{ text | raw}}\n            <span class="code-expand-icon" on-click="toggleExpand">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}">\n                <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}">\n            </span>\n        </section>\n        <section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">\n            {{ code | raw}}\n        </section>\n    </section>\n'};t.default=o.a.defineComponent({components:{desc:d,basic:i,disabled:p,group:c,vertical:r,groupwithname:u,groupoptions:g,button:h,buttonsolid:b,buttonsize:v,readme:s},template:"\n        <div>\n            <desc/>\n            <basic/>\n            <disabled/>\n            <vertical/>\n            <group/>\n            <groupoptions/>\n            <groupwithname/>\n            <button/>\n            <buttonsolid/>\n            <buttonsize/>\n            <readme/>\n        </div>\n    "})}}]);