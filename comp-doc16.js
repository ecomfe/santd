(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{555:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),s={template:'<section class="markdown"><h2 id="api"><span>API</span><a href="#api" class="anchor">#</a></h2><table><thead><tr><th>属性</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>actions</td><td>在评论内容下面呈现的操作项列表的容器</td><td>Slot</td><td>-</td></tr><tr><td>author</td><td>要显示为注释作者的元素</td><td>Slot</td><td>-</td></tr><tr><td>avatar</td><td>要显示为评论头像的元素</td><td>Slot</td><td>-</td></tr><tr><td>nested</td><td>嵌套注释应作为注释的子项提供</td><td>Slot</td><td>-</td></tr><tr><td>content</td><td>评论的主要内容</td><td>Slot</td><td>-</td></tr><tr><td>datetime</td><td>展示时间描述</td><td>Slot</td><td>-</td></tr></tbody></table><h2 id="commentaction"><span>Comment.Action</span><a href="#commentaction" class="anchor">#</a></h2><p>评论内容下面呈现的操作项，例：</p><pre><code class="language-js">&lt;s-comment-action&gt;Reply To&lt;/s-comment-action&gt;</code></pre></section>'},i=n(2),l=n.n(i),c=n(8),p=n(570),d=n.n(p);l.a.extend(d.a);var m={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-comment>\n            &lt;s-avatar slot=\"avatar\" src=\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg\"  alt=\"Han Solo\"/>\n            &lt;a slot=\"author\">Han Solo&lt;/a>\n            &lt;p slot=\"content\">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.&lt;/p>\n            &lt;template slot=\"actions\">\n                &lt;s-comment-action>\n                    &lt;span>\n                        &lt;s-tooltip title=\"Like\">\n                            &lt;s-icon type=\"like\" theme=\"{{action.type === 'liked' ? 'filled' : 'outlined'}}\" on-click=\"handleLike\" />\n                        &lt;/s-tooltip>\n                        &lt;span style=\"padding-left: 5px; cursor: auto;\">{{action.likes}}&lt;/span>\n                    &lt;/span>\n                &lt;/s-comment-action>\n                &lt;s-comment-action>\n                    &lt;span>\n                        &lt;s-tooltip title=\"DisLike\">\n                            &lt;s-icon type=\"dislike\" theme=\"{{action.type === 'disliked' ? 'filled' : 'outlined'}}\" on-click=\"handleDislike\" />\n                        &lt;/s-tooltip>\n                        &lt;span style=\"padding-left: 5px; cursor: auto;\">{{action.dislikes}}&lt;/span>\n                    &lt;/span>\n                &lt;/s-comment-action>\n                &lt;s-comment-action>&lt;span>Reply to&lt;/span>&lt;/s-comment-action>\n            &lt;/template>\n            &lt;span slot=\"datetime\">{{datetime}}&lt;/span>\n        &lt;/s-comment>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport dayjs from 'dayjs';\nimport {Comment, Icon, Avatar, Tooltip} from 'santd';\nimport relativeTime from 'dayjs/plugin/relativeTime';\n\ndayjs.extend(relativeTime);\n\nexport default {\n    components: {\n        's-comment': Comment,\n        's-comment-action': Comment.Action,\n        's-icon': Icon,\n        's-avatar': Avatar,\n        's-tooltip': Tooltip\n    },\n    initData() {\n        return {\n            action: {\n                likes: 0,\n                dislikes: 0,\n                type: null\n            },\n            datetime: dayjs().fromNow()\n        };\n    },\n    handleLike() {\n        this.data.set('action', {\n            likes: 1,\n            dislikes: 0,\n            type: 'liked'\n        })\n    },\n    handleDislike() {\n        this.data.set('action', {\n            likes: 0,\n            dislikes: 1,\n            type: 'disliked'\n        })\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="基本评论"><span>基本评论</span><a href="#基本评论" class="anchor">#</a></h4><p>一个基本的评论组件，带有作者、头像、时间和操作。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-comment":c.q,"s-comment-action":c.q.Action,"s-icon":c.z,"s-avatar":c.e,"s-tooltip":c.fb},initData:()=>({action:{likes:0,dislikes:0,type:null},datetime:l()().fromNow()}),handleLike(){this.data.set("action",{likes:1,dislikes:0,type:"liked"})},handleDislike(){this.data.set("action",{likes:0,dislikes:1,type:"disliked"})},template:'<div><s-comment><s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg" alt="Han Solo"></s-avatar><a slot="author">Han Solo</a><p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p><template slot="actions"><s-comment-action><span><s-tooltip title="Like"><s-icon type="like" theme="{{action.type === \'liked\' ? \'filled\' : \'outlined\'}}" on-click="handleLike"></s-icon></s-tooltip><span style="padding-left: 5px; cursor: auto;">{{action.likes}}</span></span></s-comment-action><s-comment-action><span><s-tooltip title="DisLike"><s-icon type="dislike" theme="{{action.type === \'disliked\' ? \'filled\' : \'outlined\'}}" on-click="handleDislike"></s-icon></s-tooltip><span style="padding-left: 5px; cursor: auto;">{{action.dislikes}}</span></span></s-comment-action><s-comment-action><span>Reply to</span></s-comment-action></template><span slot="datetime">{{datetime}}</span></s-comment></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617183830360"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};l.a.extend(d.a);const r=[{author:"Han Solo",avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",content:"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",datetime:l()().subtract(1,"days").fromNow()},{author:"Han Solo",avatar:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",content:"We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",datetime:l()().subtract(2,"days").fromNow()}];var h={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-list header=\"{{data.length}} replies\" itemLayout=\"horizontal\" dataSource=\"{{data}}\">\n            &lt;li slot=\"renderItem\">\n                &lt;s-comment>\n                    &lt;s-avatar slot=\"avatar\" src=\"{{item.avatar}}\" />\n                    &lt;a slot=\"author\">{{item.author}}&lt;/a>\n                    &lt;p slot=\"content\">{{item.content}}&lt;/p>\n                    &lt;span slot=\"datetime\">{{item.datetime}}&lt;/span>\n                    &lt;template slot=\"actions\">\n                        &lt;s-comment-action>&lt;span>Reply to&lt;/span>&lt;/s-comment-action>\n                    &lt;/template>\n                &lt;/s-comment>\n            &lt;/li>\n        &lt;/s-lst>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport dayjs from 'dayjs';\nimport {Comment, Avatar, List} from 'santd';\nimport relativeTime from 'dayjs/plugin/relativeTime';\n\ndayjs.extend(relativeTime);\n\nconst data = [{\n    author: 'Han Solo',\n    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',\n    content: &#96;We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.&#96;,\n    datetime: dayjs().subtract(1, 'days').fromNow()\n}, {\n    author: 'Han Solo',\n    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',\n    content: &#96;We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.&#96;,\n    datetime: dayjs().subtract(2, 'days').fromNow()\n}];\n\nexport default {\n    components: {\n        's-comment': Comment,\n        's-comment-action': Comment.Action,\n        's-avatar': Avatar,\n        's-list': List\n    },\n    initData() {\n        return {\n            data\n        };\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="配合-list-组件"><span>配合 List 组件</span><a href="#配合-list-组件" class="anchor">#</a></h4><p>配合 List 组件展现评论列表。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-comment":c.q,"s-comment-action":c.q.Action,"s-avatar":c.e,"s-list":c.D},initData:()=>({data:r}),template:'<div><s-list header="{{data.length}} replies" itemLayout="horizontal" dataSource="{{data}}"><li slot="renderItem"><s-comment><s-avatar slot="avatar" src="{{item.avatar}}"></s-avatar><a slot="author">{{item.author}}</a><p slot="content">{{item.content}}</p><span slot="datetime">{{item.datetime}}</span><template slot="actions"><s-comment-action><span>Reply to</span></s-comment-action></template></s-comment></li></s-list></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617183830349"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};l.a.extend(d.a);var u={initData:()=>({isExpand:!1,code:"\n<pre><code class=\"language-html\">&lt;template>\n    &lt;div>\n        &lt;s-pcomment>\n            &lt;s-pcomment>\n                &lt;s-pcomment>&lt;/s-pcomment>\n                &lt;s-pcomment>&lt;/s-pcomment>\n            &lt;/s-pcomment>\n        &lt;/s-pcomment>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from 'san';\nimport dayjs from 'dayjs';\nimport {Comment, Icon, Avatar} from 'santd';\nimport relativeTime from 'dayjs/plugin/relativeTime';\n\ndayjs.extend(relativeTime);\n\nconst pComment = san.defineComponent({\n    template: &#96;\n        &lt;template>\n            &lt;s-comment>\n                &lt;s-avatar slot=\"avatar\" src=\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg\"  alt=\"Han Solo\"/>\n                &lt;a slot=\"author\">Han Solo&lt;/a>\n                &lt;p slot=\"content\">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.&lt;/p>\n                &lt;template slot=\"actions\">\n                    &lt;s-comment-action>&lt;span>Reply to&lt;/span>&lt;/s-comment-action>\n                &lt;/template>\n                &lt;span slot=\"datetime\">{{datetime}}&lt;/span>\n                &lt;slot slot=\"nested\"/>\n            &lt;/s-comment>\n        &lt;/template>\n    &#96;,\n    components: {\n        's-comment': Comment,\n        's-comment-action': Comment.Action,\n        's-icon': Icon,\n        's-avatar': Avatar\n    },\n    initData() {\n        return {\n            datetime: dayjs().fromNow()\n        };\n    }\n});\nexport default {\n    components: {\n        's-pcomment': pComment\n    }\n}\n&lt;/script></code></pre>",text:'\n<h4 id="嵌套评论"><span>嵌套评论</span><a href="#嵌套评论" class="anchor">#</a></h4><p>评论可以嵌套。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-pcomment":o.a.defineComponent({template:'\n        <template>\n            <s-comment>\n                <s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>\n                <a slot="author">Han Solo</a>\n                <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>\n                <template slot="actions">\n                    <s-comment-action><span>Reply to</span></s-comment-action>\n                </template>\n                <span slot="datetime">{{datetime}}</span>\n                <slot slot="nested"/>\n            </s-comment>\n        </template>\n    ',components:{"s-comment":c.q,"s-comment-action":c.q.Action,"s-icon":c.z,"s-avatar":c.e},initData:()=>({datetime:l()().fromNow()})})},template:"<div><s-pcomment><s-pcomment><s-pcomment></s-pcomment><s-pcomment></s-pcomment></s-pcomment></s-pcomment></div>"}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617183830330"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'};l.a.extend(d.a);const g=o.a.defineComponent({template:'\n        <template>\n            <s-comment>\n                <s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>\n                <a slot="author">Han Solo</a>\n                <slot slot="content" name="content"/>\n                <span slot="datetime">{{datetime}}</span>\n                <slot/>\n            </s-comment>\n        </template>\n    ',components:{"s-comment":c.q,"s-icon":c.z,"s-avatar":c.e},initData:()=>({datetime:l()().fromNow()})});var f={initData:()=>({isExpand:!1,code:'\n<pre><code class="language-html">&lt;template>\n    &lt;div>\n        &lt;s-pcomment s-for="item in list">\n            &lt;p slot="content">{{item.value}}&lt;/p>\n        &lt;/s-pcomment>\n        &lt;s-comment>\n            &lt;s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>\n            &lt;s-form slot="content">\n                &lt;s-form-item prop="name">\n                    &lt;s-textarea rows="{{4}}" on-textareaBlur="onBlur">&lt;/s-textarea>\n                &lt;/s-form-item>\n                &lt;s-form-item>\n                    &lt;s-button type="primary" on-click="handleClick">Add Comment&lt;/s-button>\n                &lt;/s-form-item>\n            &lt;/s-form>\n        &lt;/s-comment>\n    &lt;/div>\n&lt;/template>\n&lt;script>\nimport san from \'san\';\nimport dayjs from \'dayjs\';\nimport {Comment, Icon, Avatar, Form, Button, Input} from \'santd\';\nimport relativeTime from \'dayjs/plugin/relativeTime\';\n\ndayjs.extend(relativeTime);\n\nconst pComment = san.defineComponent({\n    template: &#96;\n        &lt;template>\n            &lt;s-comment>\n                &lt;s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg"  alt="Han Solo"/>\n                &lt;a slot="author">Han Solo&lt;/a>\n                &lt;slot slot="content" name="content"/>\n                &lt;span slot="datetime">{{datetime}}&lt;/span>\n                &lt;slot/>\n            &lt;/s-comment>\n        &lt;/template>\n    &#96;,\n    components: {\n        \'s-comment\': Comment,\n        \'s-icon\': Icon,\n        \'s-avatar\': Avatar\n    },\n    initData() {\n        return {\n            datetime: dayjs().fromNow()\n        };\n    }\n});\n\nexport default {\n    components: {\n        \'s-comment\': Comment,\n        \'s-avatar\': Avatar,\n        \'s-form\': Form,\n        \'s-form-item\': Form.FormItem,\n        \'s-button\': Button,\n        \'s-textarea\': Input.TextArea,\n        \'s-pcomment\': pComment\n    },\n    initData() {\n        return {\n            list: []\n        };\n    },\n    handleClick() {\n        this.data.push(\'list\', {value: this.data.get(\'value\')});\n    },\n    onBlur(value) {\n        this.data.set(\'value\', value);\n    }\n}\n&lt;/script></code></pre>',text:'\n<h4 id="回复框"><span>回复框</span><a href="#回复框" class="anchor">#</a></h4><p>评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。</p>'}),toggleExpand(){this.data.set("isExpand",!this.data.get("isExpand"))},components:{"code-preview":{components:{"s-comment":c.q,"s-avatar":c.e,"s-form":c.x,"s-form-item":c.x.FormItem,"s-button":c.i,"s-textarea":c.A.TextArea,"s-pcomment":g},initData:()=>({list:[]}),handleClick(){this.data.push("list",{value:this.data.get("value")})},onBlur(t){this.data.set("value",t)},template:'<div><s-pcomment s-for="item in list"><p slot="content">{{item.value}}</p></s-pcomment><s-comment><s-avatar slot="avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544096149211&di=2a2a049606dae06d29593fbfb48e5301&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8c1001e93901213fce85790251e736d12e2e95bd.jpg" alt="Han Solo"></s-avatar><s-form slot="content"><s-form-item prop="name"><s-textarea rows="{{4}}" on-textareaBlur="onBlur"></s-textarea></s-form-item><s-form-item><s-button type="primary" on-click="handleClick">Add Comment</s-button></s-form-item></s-form></s-comment></div>'}},template:'<section class="code-box {{isExpand?\'expand\':\'\'}}" id="components-demo-1617183830340"><section class="code-box-demo"><code-preview></code-preview></section><section class="code-box-meta markdown">{{ text | raw}}<span class="code-expand-icon" on-click="toggleExpand"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" class="{{isExpand?\'code-expand-icon-hide\':\'code-expand-icon-show\'}}"><img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" class="{{isExpand?\'code-expand-icon-show\':\'code-expand-icon-hide\'}}"></span></section><section class="highlight-wrapper {{isExpand?\'highlight-wrapper-expand\':\'\'}}">{{ code | raw}}</section></section>'},y={template:'<section class="markdown"><h1 id="comment-评论"><span>Comment 评论</span><a href="#comment-评论" class="anchor">#</a></h1><p>对网站内容的反馈、评价和讨论。</p><h2 id="何时使用"><span>何时使用</span><a href="#何时使用" class="anchor">#</a></h2><p>评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。</p><h2 id="代码演示"><span>代码演示</span><a href="#代码演示" class="anchor">#</a></h2></section>'};e.default=o.a.defineComponent({components:{readme:s,basic:m,list:h,nest:u,reply:f,head:y},template:"\n        <div>\n            <head/>\n            <basic/>\n            <list/>\n            <nest/>\n            <reply/>\n            <readme/>\n        </div>\n    "})},570:function(t,e,n){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var a=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(t,e,n,o){return a.fromToBase(t,e,n,o)}n.en.relativeTime=o,a.fromToBase=function(e,a,s,i,l){for(var c,p,d,m=s.$locale().relativeTime||o,r=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],h=r.length,u=0;u<h;u+=1){var g=r[u];g.d&&(c=i?n(e).diff(s,g.d,!0):s.diff(e,g.d,!0));var f=(t.rounding||Math.round)(Math.abs(c));if(d=c>0,f<=g.r||!g.r){f<=1&&u>0&&(g=r[u-1]);var y=m[g.l];l&&(f=l(""+f)),p="string"==typeof y?y.replace("%d",f):y(f,a,g.l,d);break}}if(a)return p;var x=d?m.future:m.past;return"function"==typeof x?x(p):x.replace("%s",p)},a.to=function(t,e){return s(t,e,this,!0)},a.from=function(t,e){return s(t,e,this)};var i=function(t){return t.$u?n.utc():n()};a.toNow=function(t){return this.to(i(this),t)},a.fromNow=function(t){return this.from(i(this),t)}}}()}}]);