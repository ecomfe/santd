<text lang="cn">
#### 复杂的例子
使用操作区，并自定义子节点，适合使用在需要展示一些复杂的信息，帮助用户快速了解这个页面的信息和操作。
</text>

```html
<template>
    <div id="components-pageheader-demo-actions">
        <s-pageheader
            onBack="{{onBack}}"
            title="Title"
            subTitle="This is a subtitle"
        >
            <s-tag color="red" slot="tags">Warning</s-tag>
            <template slot="extra">
                <s-button>Operation</s-button>
                <s-button>Operation</s-button>
                <s-button type="primary">Primary</s-button>
            </template>
            <s-tabs slot="footer" defaultActiveKey="1">
                <s-tabpane tab="Details" key="1"></s-tabpane>
                <s-tabpane tab="Rule" key="2"></s-tabpane>
            </s-tabs>
            <div class="wrap">
                <div class="content padding">
                    <s-row>
                        <s-col span="{{12}}">
                            <div class="description">
                                <div class="term">Created：</div>
                                <div class="detail">Lili Qu</div>
                            </div>
                        </s-col>
                        <s-col span="{{12}}">
                            <div class="description">
                                <div class="term">Association：</div>
                                <div class="detail"><a>421421</a></div>
                            </div>
                        </s-col>
                        <s-col span="{{12}}">
                            <div class="description">
                                <div class="term">Creation Time：</div>
                                <div class="detail">2017-01-10</div>
                            </div>
                        </s-col>
                        <s-col span="{{12}}">
                            <div class="description">
                                <div class="term">Effective：</div>
                                <div class="detail">2017-10-10</div>
                            </div>
                        </s-col>
                        <s-col span="{{24}}">
                            <div class="description">
                                <div class="term">Remarks：</div>
                                <div class="detail">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</div>
                            </div>
                        </s-col>
                    </s-row>
                </div>
                <div class="extraContent">
                    <s-row>
                        <s-col span="{{12}}">
                            <s-statistic title="Status" value="Pending" />
                        </s-col>
                        <s-col span="{{12}}">
                            <s-statistic title="Price" prefix="$" value="{{568.08}}" />
                        </s-col>
                    </s-row>
                </div>
            </div>
        </s-pageheader>
    </div>
</template>
<script>
import pageheader from 'santd/pageheader';
import tag from 'santd/tag';
import tabs from 'santd/tabs';
import button from 'santd/button'
import statistic from 'santd/statistic';
import grid from 'santd/grid';

const description = function () {
    return `<div>a</div>`;
};

export default {
    components: {
        's-pageheader': pageheader,
        's-tag': tag,
        's-tabs': tabs,
        's-tabpane': tabs.TabPane,
        's-statistic': statistic,
        's-button': button,
        's-row': grid.Row,
        's-col': grid.Col
    },
    initData() {
        return {
            onBack: () => {
                console.log('onBack');
            }
        }
    }
}
</script>
<style type="text/css">
#components-pageheader-demo-actions .wrap {
    display: flex;
}
#components-pageheader-demo-actions .content.padding {
    padding-left: 40px;
}
#components-pageheader-demo-actions .content .description {
    display: table;
}
#components-pageheader-demo-actions .description .term {
    display: table-cell;
    margin-right: 8px;
    padding-bottom: 8px;
    white-space: nowrap;
    line-height: 20px;
}
#components-pageheader-demo-actions .description .detail {
    display: table-cell;
    padding-bottom: 8px;
    width: 100%;
    line-height: 20px;
}
#components-pageheader-demo-actions .extraContent {
    min-width: 240px;
    text-align: right;
}
</style>
```
