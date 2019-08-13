<text lang="cn">
#### 带内容的例子
带内容的例子,可以优先展示页面的主要信息。
</text>

```html
<template>
    <div>
  	    <s-pageheader title="Title" breadcrumb="{{breadcrumb}}">
            <div className="wrap">
            <div className="content">
                <div className="content">
                    <s-paragraph>
                        Ant Design interprets the color system into two levels: a system-level color system and a product-level color system.
                    </s-paragraph>
                    <s-paragraph>
                        Ant Design&#x27;s design team preferred to design with the HSB color model,
                        which makes it easier for designers to have a clear psychological
                        expectation of color when adjusting colors, as well as facilitate
                        communication in teams.
                    </s-paragraph>
                    <p className="contentLink">
                        <a><img src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" alt="start" />Quick Start</a>
                        <a><img src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" alt="info" />Product Info</a>
                        <a><img src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" alt="doc" />Product Doc</a>
                    </p>
                </div>
            </div>
            <div className="extraContent"><img src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original" alt="content" /></div>
        </div>
        </s-pageheader>
    </div>
</template>
<script>
import pageheader from 'santd/pageheader';
import Typography from 'santd/typography';

export default {
    components: {
        's-pageheader': pageheader,
        's-paragraph': Typography.Paragraph
    },
    initData() {
        return {
            onBack: () => {
                console.log('onBack');
            },
            breadcrumb: {
                routes: [
                    {
                        path: 'index',
                        breadcrumbName: 'First-level Menu',
                    },
                    {
                        path: 'first',
                        breadcrumbName: 'Second-level Menu',
                    },
                    {
                        path: 'second',
                        breadcrumbName: 'Third-level Menu',
                    },
                ]
            }
        }
    }
}
</script>
<style type="text/css">
    #components-pageheader-demo-content .wrap {
        display: flex;
    }
    #components-pageheader-demo-content .content {
        flex: 1;
    }
    #components-pageheader-demo-content .extraContent {
        min-width: 240px;
        text-align: right;
    }
    #components-pageheader-demo-content .contentLink {
        padding-top: 16px;
    }
    #components-pageheader-demo-content .contentLink a {
        display: inline-block;
        vertical-align: text-top;
        margin-right: 32px;
    }
</style>
```
