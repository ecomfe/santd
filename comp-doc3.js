(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{531:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s={template:'<section class="markdown"><h1 id="autocomplete-自动完成"><span>AutoComplete 自动完成</span><a href="#autocomplete-自动完成" class="anchor">#</a></h1><p>输入框自动完成功能。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><p>需要自动完成时。</p><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'},l={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><pre><code class="language-bash">const dataSource = [&#39;12345&#39;, &#39;23456&#39;, &#39;34567&#39;];&lt;s-auto-complete dataSource=&#123;&#123;dataSource}} /&gt;;</code></pre><p>详细属性：</p><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>allowClear</td><td>支持清除, 单选模式有效</td><td>boolean</td><td>false</td></tr><tr><td>autoFocus</td><td>自动获取焦点</td><td>boolean</td><td>false</td></tr><tr><td>backfill</td><td>使用键盘选择选项的时候把选中项回填到输入框中</td><td>boolean</td><td>false</td></tr><tr><td>dataSource</td><td>自动完成的数据源</td><td>[]</td><td></td></tr><tr><td>dropdownMenuStyle</td><td>dropdown 菜单自定义样式</td><td>string</td><td></td></tr><tr><td>defaultActiveFirstOption</td><td>是否默认高亮第一个选项。</td><td>boolean</td><td>true</td></tr><tr><td>defaultValue</td><td>指定默认选中的条目</td><td>string | string[]</td><td></td></tr><tr><td>disabled</td><td>是否禁用</td><td>boolean</td><td>false</td></tr><tr><td>filterOption</td><td>是否根据输入项进行筛选。当其为一个函数时，会接收 <code>inputValue</code> <code>option</code> 两个参数，当 <code>option</code> 符合筛选条件时，应返回 <code>true</code>，反之则返回 <code>false</code>。</td><td>boolean or function</td><td>true</td></tr><tr><td>placeholder</td><td>输入框提示</td><td>string</td><td>-</td></tr><tr><td>value</td><td>指定当前选中的条目</td><td>string|string[]</td><td>无</td></tr><tr><td>on-blur</td><td>失去焦点时的回调</td><td>function()</td><td>-</td></tr><tr><td>on-change</td><td>选中 option，或 input 的 value 变化时，调用此函数</td><td>function (value)</td><td>-</td></tr><tr><td>on-focus</td><td>获得焦点时的回调</td><td>function()</td><td>-</td></tr><tr><td>on-search</td><td>搜索补全项的时候调用</td><td>function(value)</td><td>无</td></tr><tr><td>on-select</td><td>被选中时调用，参数为选中项的 value 值</td><td>function(value, option)</td><td>无</td></tr><tr><td>defaultOpen</td><td>是否默认展开下拉菜单</td><td>boolean</td><td>-</td></tr><tr><td>open</td><td>是否展开下拉菜单</td><td>boolean</td><td>-</td></tr><tr><td>on-dropdownVisibleChange</td><td>展开下拉菜单的回调</td><td>function(open)</td><td>-</td></tr></tbody></table><h2 id="auto-complete-方法"><span>auto-complete 方法</span><a href="#auto-complete-方法" class="anchor">#</a></h2><table><thead><tr><th>名称</th><th>说明</th></tr></thead><tbody><tr><td>blur()</td><td>取消焦点</td></tr><tr><td>focus()</td><td>获取焦点</td></tr></tbody></table></section>'},c=n(8),d={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n  \t&lt;s-auto-complete\n        on-search="handleSearch"\n        on-select="handleSelect"\n        dataSource="{{dataSource}}"\n        style="width: 200px;"\n        dropdownMenuStyle="{{dropdownMenuStyle}}"\n        placeholder="input some"\n    >\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete} from \'santd\';\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete\n    },\n    initData() {\n        return {\n            dataSource: [],\n            dropdownMenuStyle: \'width: 200px\'\n        };\n    },\n    handleSearch(value) {\n        if (value) {\n            this.data.set(\'dataSource\', [\n                value,\n                value + value,\n                value + value + value\n            ]);\n        } else {\n            this.data.set(\'dataSource\', []);\n        }\n    },\n    handleSelect(value) {\n        console.log(\'handle select\', value);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="基本使用"><span>基本使用</span><a href="#基本使用" class="anchor">#</a></h4><p>基本使用。通过 dataSource 设置自动完成的数据源</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d},initData:()=>({dataSource:[],dropdownMenuStyle:"width: 200px"}),handleSearch(e){e?this.data.set("dataSource",[e,e+e,e+e+e]):this.data.set("dataSource",[])},handleSelect(e){console.log("handle select",e)},template:'<div><s-auto-complete on-search="handleSearch" on-select="handleSelect" dataSource="{{dataSource}}" style="width: 200px;" dropdownMenuStyle="{{dropdownMenuStyle}}" placeholder="input some"></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126508"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},i={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n  \t&lt;s-auto-complete\n        on-search=\"handleSearch\"\n        on-select=\"onSelect\"\n        style=\"width: 200px;\"\n    >\n        &lt;s-select-option\n            s-for=\"item in list\"\n            value=\"{{item}}\"\n        >\n            {{item}}\n        &lt;/s-select-option>\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete} from 'santd';\n\nexport default {\n    components: {\n        's-auto-complete': AutoComplete,\n        's-select-option': AutoComplete.Option\n    },\n    initData() {\n        return {\n            list: []\n        };\n    },\n    handleSearch(value) {\n        let list;\n        if (!value || value.indexOf('@') >= 0) {\n          list = [];\n        } else {\n          list = ['gmail.com', '163.com', 'qq.com'].map(domain => &#96;&#36;&#123;value}@&#36;&#123;domain}&#96;);\n        }\n        this.data.set('list', list);\n    },\n    onSelect(val) {\n        console.log('select-', val);\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="自定义选项"><span>自定义选项</span><a href="#自定义选项" class="anchor">#</a></h4><p>也可以直接传 <code>AutoComplete.Option</code> 作为 <code>AutoComplete</code> 的 <code>children</code>，而非使用 <code>dataSource</code>。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d,"s-select-option":c.d.Option},initData:()=>({list:[]}),handleSearch(e){let t;t=!e||e.indexOf("@")>=0?[]:["gmail.com","163.com","qq.com"].map(t=>`${e}@${t}`),this.data.set("list",t)},onSelect(e){console.log("select-",e)},template:'<div><s-auto-complete on-search="handleSearch" on-select="onSelect" style="width: 200px;"><s-select-option s-for="item in list" value="{{item}}">{{item}}</s-select-option></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126512"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},p={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n    &lt;s-auto-complete\n        on-search="handleSearch"\n        on-select="handleSelect"\n        dataSource="{{dataSource}}"\n        style="width: 200px;"\n        value="{{value}}"\n    >\n        &lt;s-textarea\n            slot="custom"\n            placeholder="input here"\n            style="height: 50px"\n            value="{{value}}"\n            on-inputChange="textareaChange"\n        >&lt;/s-textarea>\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete, Input} from \'santd\';\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete,\n        \'s-textarea\': Input.TextArea\n    },\n    initData() {\n        return {\n            dataSource: [],\n            value: \'\'\n        };\n    },\n    handleSearch(value) {\n        if (value) {\n            this.data.set(\'dataSource\', [\n                value,\n                value + value,\n                value + value + value\n            ]);\n        } else {\n            this.data.set(\'dataSource\', []);\n        }\n    },\n    handleSelect(value) {\n        this.data.set(\'value\', value);\n    },\n    textareaChange(val) {\n        this.handleSearch(val);;\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="自定义输入组件"><span>自定义输入组件</span><a href="#自定义输入组件" class="anchor">#</a></h4><p>自定义输入组件</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d,"s-textarea":c.B.TextArea},initData:()=>({dataSource:[],value:""}),handleSearch(e){e?this.data.set("dataSource",[e,e+e,e+e+e]):this.data.set("dataSource",[])},handleSelect(e){this.data.set("value",e)},textareaChange(e){this.handleSearch(e)},template:'<div><s-auto-complete on-search="handleSearch" on-select="handleSelect" dataSource="{{dataSource}}" style="width: 200px;" value="{{value}}"><s-textarea slot="custom" placeholder="input here" style="height: 50px" value="{{value}}" on-inputChange="textareaChange"></s-textarea></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126503"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};const r=["Burns Bay Road","Downing Street","Wall Street"],u=function(e,t){return-1!==t.data.get("value").toUpperCase().indexOf(e.toUpperCase())};var h={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n  &lt;div>\n  \t&lt;s-auto-complete\n        dataSource=\"{{dataSource}}\"\n        style=\"width: 200px;\"\n        placeholder=\"try to type 'b\"\n        filterOption=\"{{filterOption}}\"\n        value=\"Burns Bay Road\"\n    >\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete} from 'santd';\n\nconst dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];\nconst filterOption = function (inputValue, option) {\n    return option.data.get('value').toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;\n};\n\nexport default {\n    components: {\n        's-auto-complete': AutoComplete\n    },\n    initData() {\n        return {\n            dataSource: dataSource,\n            filterOption: filterOption\n        };\n    },\n}\n&lt;/script></code></pre>",text:'\n<h4 id="不区分大小写"><span>不区分大小写</span><a href="#不区分大小写" class="anchor">#</a></h4><p>不区分大小写的 AutoComplete</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d},initData:()=>({dataSource:r,filterOption:u}),template:'<div><s-auto-complete dataSource="{{dataSource}}" style="width: 200px;" placeholder="try to type \'b" filterOption="{{filterOption}}" value="Burns Bay Road"></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126497"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};n(593);const m=function(){return o.a.defineComponent({computed:{titles(){return this.data.get("key").title}},template:'\n            <span>\n                {{titles}}\n                <a href="https://baidu.github.io/san/" target="_blank" style="float: right">更多</a>\n            </span>\n        '})},g=[{title:"话题",children:[{title:"Santd",count:1e4},{title:"Santd UI",count:10600}]},{title:"问题",children:[{title:"Santd UI 有多好",count:60100},{title:"Santd 是啥",count:30010}]},{title:"文章",children:[{title:"Santd 是一个设计语言",count:1e5}]}];var x={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div class="certain-category-search-wrapper">\n    &lt;s-auto-complete\n        class="certain-category-search"\n        dropdownClassName="certain-category-search-dropdown"\n        style="width: 300px;"\n        placeholder="input here"\n        on-select="onSelect"\n    >\n        &lt;template s-for="item in dataSource">\n            &lt;s-option-group key="{{item}}" label="{{renderTitle}}">\n                &lt;s-option s-for="child in item.children" key="{{child.title}}" value="{{child.title}}">\n                    {{child.title}}\n                    &lt;span class="certain-search-item-count">{{child.count}} 人 关注&lt;/span>\n                &lt;/s-option>\n            &lt;/s-option-group>\n        &lt;/template>\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport {AutoComplete} from \'santd\';\n\nconst componentTitle = function() {\n    return san.defineComponent({\n        computed: {\n            titles() {\n                // key 就是option-group的key\n                const key = this.data.get(\'key\');\n                return key.title;\n            }\n        },\n        template: &#96;\n            &lt;span>\n                {{titles}}\n                &lt;a href="https://baidu.github.io/san/" target="_blank" style="float: right">更多&lt;/a>\n            &lt;/span>\n        &#96;\n    });\n}\n\nconst dataSource = [\n  {\n    title: \'话题\',\n    children: [\n      {\n        title: \'Santd\',\n        count: 10000,\n      },\n      {\n        title: \'Santd UI\',\n        count: 10600,\n      },\n    ],\n  },\n  {\n    title: \'问题\',\n    children: [\n      {\n        title: \'Santd UI 有多好\',\n        count: 60100,\n      },\n      {\n        title: \'Santd 是啥\',\n        count: 30010,\n      },\n    ],\n  },\n  {\n    title: \'文章\',\n    children: [\n      {\n        title: \'Santd 是一个设计语言\',\n        count: 100000,\n      },\n    ],\n  },\n];\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete,\n        \'s-option-group\': AutoComplete.Group,\n        \'s-option\': AutoComplete.Option\n    },\n    initData() {\n        return {\n            dataSource: dataSource,\n            renderTitle: componentTitle\n        };\n    },\n    onSelect(val) {\n        console.log(\'select value is: \', val);\n    }\n}\n&lt;/script>\n&lt;style>\n.certain-category-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {\n  right: 12px;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item-group-title {\n  color: #666;\n  font-weight: bold;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item-group {\n  border-bottom: 1px solid #f6f6f6;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item {\n  padding-left: 16px;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item.show-all {\n  text-align: center;\n  cursor: default;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu {\n  max-height: 300px;\n}\n\n.certain-search-item-count {\n  position: absolute;\n  color: #999;\n  right: 16px;\n}\n\n.certain-category-search.san-select-focused .certain-category-icon {\n  color: #108ee9;\n}\n\n.certain-category-icon {\n  color: #6e6e6e;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  font-size: 16px;\n}\n\n&lt;/style></code></pre>',text:'\n<h4 id="查询模式-确定类目"><span>查询模式 - 确定类目</span><a href="#查询模式-确定类目" class="anchor">#</a></h4><p>查询模式 - 确定类目</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d,"s-option-group":c.d.Group,"s-option":c.d.Option},initData:()=>({dataSource:g,renderTitle:m}),onSelect(e){console.log("select value is: ",e)},template:'<div class="certain-category-search-wrapper"><s-auto-complete class="certain-category-search" dropdownClassName="certain-category-search-dropdown" style="width: 300px;" placeholder="input here" on-select="onSelect"><template s-for="item in dataSource"><s-option-group key="{{item}}" label="{{renderTitle}}"><s-option s-for="child in item.children" key="{{child.title}}" value="{{child.title}}">{{child.title}}<span class="certain-search-item-count">{{child.count}} 人 关注</span></s-option></s-option-group></template></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126489"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};n(595);const w=function(e,t=0){return Math.floor(Math.random()*(e-t+1))+t};var f={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div class="global-search-wrapper">\n    &lt;s-auto-complete\n        class="global-search"\n        dropdownClassName="certain-category-search-dropdown"\n        style="width: 300px;"\n        placeholder="input here"\n        on-select="onSelect"\n        on-search="handleSearch"\n    >\n        &lt;s-option s-for="item in dataSource" key="{{item.category}}" value="{{item.category}}">\n            &lt;div class="global-search-item">\n                &lt;span class="global-search-item-desc">\n                    {{item.query}} 在\n                    &lt;a href="https://baidu.github.io/san/" target="_blank">{{item.category}}&lt;/a>\n                    区块中\n                &lt;/span>\n                &lt;span class="global-search-item-count">约 {{item.count}} 个结果&lt;/span>\n            &lt;/div>\n        &lt;/s-option>\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport {AutoComplete} from \'santd\';\n\nconst getRandomInt = function (max, min = 0) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n};\n\nconst searchResult = function(query) {\n    return new Array(getRandomInt(5))\n    .join(\'.\')\n    .split(\'.\')\n    .map((item, idx) => ({\n      query,\n      category: &#96;&#36;&#123;query}&#36;&#123;idx}&#96;,\n      count: getRandomInt(200, 100),\n    }));\n};\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete,\n        \'s-option\': AutoComplete.Option\n    },\n    initData() {\n        return {\n            dataSource: []\n        };\n    },\n    onSelect(val) {\n        console.log(\'select value is: \', val);\n    },\n    handleSearch(val) {\n        val ? this.data.set(\'dataSource\', searchResult(val)) : this.data.set(\'dataSource\', []);\n    }\n}\n&lt;/script>\n&lt;style>\n.global-search-wrapper {\n  padding-right: 50px;\n}\n\n.global-search {\n  width: 100%;\n}\n\n.global-search.ant-select-auto-complete .san-select-selection--single {\n  margin-right: -46px;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input:not(:last-child) {\n  padding-right: 62px;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {\n  right: 0;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix button {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.global-search-item {\n  display: flex;\n}\n\n.global-search-item-desc {\n  flex: auto;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.global-search-item-count {\n  flex: none;\n}\n\n&lt;/style></code></pre>',text:'\n<h4 id="查询模式-不确定类目"><span>查询模式 - 不确定类目</span><a href="#查询模式-不确定类目" class="anchor">#</a></h4><p>查询模式 - 不确定类目</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d,"s-option":c.d.Option},initData:()=>({dataSource:[]}),onSelect(e){console.log("select value is: ",e)},handleSearch(e){var t;e?this.data.set("dataSource",(t=e,new Array(w(5)).join(".").split(".").map((e,n)=>({query:t,category:`${t}${n}`,count:w(200,100)})))):this.data.set("dataSource",[])},template:'<div class="global-search-wrapper"><s-auto-complete class="global-search" dropdownClassName="certain-category-search-dropdown" style="width: 300px;" placeholder="input here" on-select="onSelect" on-search="handleSearch"><s-option s-for="item in dataSource" key="{{item.category}}" value="{{item.category}}"><div class="global-search-item"><span class="global-search-item-desc">{{item.query}} 在<a href="https://baidu.github.io/san/" target="_blank">{{item.category}}</a>区块中</span><span class="global-search-item-count">约 {{item.count}} 个结果</span></div></s-option></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126472"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},v={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n    &lt;s-button type="primary" on-click="handleToggle">focus&lt;/s-button>\n    &lt;s-button type="primary" on-click="handlefToggle">blur&lt;/s-button>\n  \t&lt;s-auto-complete\n        s-ref="autoComlete"\n        on-search="handleSearch"\n        on-select="handleSelect"\n        dataSource="{{dataSource}}"\n        style="width: 200px;margin-top:10px;"\n        dropdownMenuStyle="{{dropdownMenuStyle}}"\n        placeholder="input some"\n    >\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete, Button} from \'santd\';\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete,\n        \'s-button\': Button\n    },\n    initData() {\n        return {\n            dataSource: [],\n            dropdownMenuStyle: \'width: 200px\'\n        };\n    },\n    handleSearch(value) {\n        if (value) {\n            this.data.set(\'dataSource\', [\n                value,\n                value + value,\n                value + value + value\n            ]);\n        } else {\n            this.data.set(\'dataSource\', []);\n        }\n    },\n    handleSelect(value) {\n        console.log(\'handle select\', value);\n    },\n    handleToggle() {\n        this.ref(\'autoComlete\').focus();\n    },\n    handlefToggle() {\n        this.ref(\'autoComlete\').blur();\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="获取移除焦点"><span>获取/移除焦点</span><a href="#获取移除焦点" class="anchor">#</a></h4><p>focus获取焦点、blur移除焦点</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d,"s-button":c.i},initData:()=>({dataSource:[],dropdownMenuStyle:"width: 200px"}),handleSearch(e){e?this.data.set("dataSource",[e,e+e,e+e+e]):this.data.set("dataSource",[])},handleSelect(e){console.log("handle select",e)},handleToggle(){this.ref("autoComlete").focus()},handlefToggle(){this.ref("autoComlete").blur()},template:'<div><s-button type="primary" on-click="handleToggle">focus</s-button><s-button type="primary" on-click="handlefToggle">blur</s-button><s-auto-complete s-ref="autoComlete" on-search="handleSearch" on-select="handleSelect" dataSource="{{dataSource}}" style="width: 200px;margin-top:10px;" dropdownMenuStyle="{{dropdownMenuStyle}}" placeholder="input some"></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126479"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},S={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n  &lt;div>\n  \t&lt;s-auto-complete\n        on-search="handleSearch"\n        on-select="handleSelect"\n        dataSource="{{dataSource}}"\n        style="width: 200px;"\n        dropdownMenuStyle="{{dropdownMenuStyle}}"\n        placeholder="input some"\n        backfill="{{true}}"\n    >\n    &lt;/s-auto-complete>\n  &lt;/div>\n&lt;/template>\n&lt;script>\nimport {AutoComplete} from \'santd\';\n\nexport default {\n    components: {\n        \'s-auto-complete\': AutoComplete\n    },\n    initData() {\n        return {\n            dataSource: [],\n            dropdownMenuStyle: \'width: 200px\'\n        };\n    },\n    handleSearch(value) {\n        if (value) {\n            this.data.set(\'dataSource\', [\n                value,\n                value + value,\n                value + value + value\n            ]);\n        } else {\n            this.data.set(\'dataSource\', []);\n        }\n    },\n    handleSelect(value) {\n        console.log(\'handle select\', value);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="使用键盘选择时自动回填"><span>使用键盘选择时自动回填</span><a href="#使用键盘选择时自动回填" class="anchor">#</a></h4><p>使用键盘选择选项的时候把选中项回填到输入框中。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-auto-complete":c.d},initData:()=>({dataSource:[],dropdownMenuStyle:"width: 200px"}),handleSearch(e){e?this.data.set("dataSource",[e,e+e,e+e+e]):this.data.set("dataSource",[])},handleSelect(e){console.log("handle select",e)},template:'<div><s-auto-complete on-search="handleSearch" on-select="handleSelect" dataSource="{{dataSource}}" style="width: 200px;" dropdownMenuStyle="{{dropdownMenuStyle}}" placeholder="input some" backfill="{{true}}"></s-auto-complete></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1667754126485"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};t.default=o.a.defineComponent({components:{head:s,readme:l,basic:d,option:i,custom:p,upcase:h,lookup:x,unlookup:f,focus:v,backfill:S},template:"\n        <div>\n            <head/>\n            <basic/>\n            <option/>\n            <upcase/>\n            \x3c!--<custom/>--\x3e\n            <lookup/>\n            <unlookup/>\n            <focus/>\n            <backfill/>\n            <readme/>\n        </div>\n    "})},593:function(e,t,n){var a=n(4),o=n(594);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1};a(o,s);e.exports=o.locals||{}},594:function(e,t,n){(t=n(5)(!1)).push([e.i,"\n.certain-category-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {\n  right: 12px;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item-group-title {\n  color: #666;\n  font-weight: bold;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item-group {\n  border-bottom: 1px solid #f6f6f6;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item {\n  padding-left: 16px;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu-item.show-all {\n  text-align: center;\n  cursor: default;\n}\n\n.certain-category-search-dropdown .san-select-dropdown-menu {\n  max-height: 300px;\n}\n\n.certain-search-item-count {\n  position: absolute;\n  color: #999;\n  right: 16px;\n}\n\n.certain-category-search.san-select-focused .certain-category-icon {\n  color: #108ee9;\n}\n\n.certain-category-icon {\n  color: #6e6e6e;\n  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  font-size: 16px;\n}\n\n",""]),e.exports=t},595:function(e,t,n){var a=n(4),o=n(596);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[e.i,o,""]]);var s={insert:"head",singleton:!1};a(o,s);e.exports=o.locals||{}},596:function(e,t,n){(t=n(5)(!1)).push([e.i,"\n.global-search-wrapper {\n  padding-right: 50px;\n}\n\n.global-search {\n  width: 100%;\n}\n\n.global-search.ant-select-auto-complete .san-select-selection--single {\n  margin-right: -46px;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input:not(:last-child) {\n  padding-right: 62px;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix {\n  right: 0;\n}\n\n.global-search.san-select-auto-complete .san-input-affix-wrapper .san-input-suffix button {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.global-search-item {\n  display: flex;\n}\n\n.global-search-item-desc {\n  flex: auto;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.global-search-item-count {\n  flex: none;\n}\n\n",""]),e.exports=t}}]);