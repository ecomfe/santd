<text lang="cn">
#### 基本
展示文档样例。
</text>

```html
<template>
  <div>
    <s-typography>
        <s-title>Introduction</s-title>
        <s-paragraph>
            In the process of internal desktop applications development, many different design specs and implementations would be involved, which might cause designers and developers difficulties and duplication and reduce the efficiency of development.
        </s-paragraph>
        <s-paragraph>
            After massive project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to <s-text strong>uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development</s-text>.
        </s-paragraph>
        <s-title level={{2}}>Guidelines and Resources</s-title>
        <s-paragraph>
            We supply a series of design principles, practical patterns and high quality design resources (<s-text code>Sketch</s-text> and <s-text code>Axure</s-text>), to help people create their product prototypes beautifully and efficiently.
        </s-paragraph>
        <s-divider />
        <s-title>概念</s-title>
        <s-paragraph>
            MVVM 模式，顾名思义即 Model-View-ViewModel 模式。它萌芽于2005年微软推出的基于 Windows 的用户界面框架 WPF ，前端最早的 MVVM 框架 knockout 在2010年发布。
        </s-paragraph>
        <s-paragraph>
            一句话总结 Web 前端 MVVM：<s-text strong>操作数据，就是操作视图，就是操作 DOM（所以无须操作 DOM ）。</s-text>
        </s-paragraph>
        <s-paragraph>
            无须操作 DOM ！借助 MVVM 框架，开发者只需完成包含 声明绑定 的视图模板，编写 <s-text code>ViewModel</s-text> 中业务数据变更逻辑，<s-text code>View</s-text> 层则完全实现了自动化。这将极大的降低前端应用的操作复杂度、极大提升应用的开发效率。MVVM 最标志性的特性就是 数据绑定 ，MVVM 的核心理念就是通过 声明式的数据绑定 来实现 <s-text code>View</s-text> 层和其他层的分离。完全解耦 <s-text code>View</s-text> 层这种理念，也使得 Web 前端的单元测试用例编写变得更容易。
        </s-paragraph>
        <s-title level="{{2}}">MVVM架构</s-title>
        <s-paragraph>
            MVVM，说到底还是一种分层架构。它的分层如下：
        </s-paragraph>
        <s-paragraph>
            <ul>
                <li><a href="#">Model</a>： 域模型，用于持久化</li>
                <li><a href="#">View</a>： 作为视图模板存在</li>
                <li><a href="#">ViewModel</a>： 作为视图的模型，为视图服务</li>
            </ul> 
        </s-paragraph>
    </s-typography>
  </div>
</template>
<script>
import Typography from 'santd/typography';
import Divider from 'santd/divider';

export default {
    components: {
        's-typography': Typography,
        's-title': Typography.Title,
        's-paragraph': Typography.Paragraph,
        's-text': Typography.Text,
        's-divider': Divider
    }
}
</script>
```
