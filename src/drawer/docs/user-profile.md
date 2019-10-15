<text lang="cn">
#### 信息预览抽屉
需要快速预览对象概要时使用，点击遮罩区关闭。
</text>

```html
<template>
    <div>
        <s-list bordered="{{true}}" itemLayout="horizontal" dataSource="{{listData}}">
            <s-list-item slot="renderItem">
                <ul class="{{prefixCls}}-item-action" slot="actions">
                    <li><a href="javascript:;" on-click="showDrawer">View Profile</a></li>
                </ul>
                <s-list-item-meta description="Progresser AFX">
                    <s-avatar slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
                    <a href="javascript:;" slot="title">{{item.name}}</a>
                </s-list-item-meta>
            </s-list-item>
        </s-list>
        <s-drawer
            placement="right"
            closable="{{false}}"
            visible="{=visible=}"
            width="{{640}}"
            on-close="onClose"
        >
            <p style="{{pStyle | css}} margin-bottom: 24px;">User Profile</p>
            <p style="{{pStyle | css}}">Personal</p>
            <s-row>
                <s-col span="{{12}}">
                    <s-item title="Full Name" content="Lily"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Account" content="AntDesign@example.com"/>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{12}}">
                    <s-item title="City" content="HangZhou"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Country" content="China🇨🇳"/>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{12}}">
                    <s-item title="Birthday" content="February 2,1900"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Website" content="-"/>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{24}}">
                    <s-item title="Message" content="Make things as simple as possible but no simpler."/>
                </s-col>
            </s-row>

            <s-divider/>
            <p style="{{pStyle | css}}">Company</p>

            <s-row>
                <s-col span="{{12}}">
                    <s-item title="Position" content="Programmer"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Responsibilities" content="Coding"/>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{12}}">
                    <s-item title="Department" content="AFX"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Supervisor">
                        <a slot="contet">Lin</a>
                    </s-item>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{24}}">
                    <s-item title="Skills" content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."/>
                </s-col>
            </s-row>

            <s-divider/>
            <p style="{{pStyle | css}}">Contacts</p>

            <s-row>
                <s-col span="{{12}}">
                    <s-item title="Email" content="AntDesign@example.com"/>
                </s-col>
                <s-col span="{{12}}">
                    <s-item title="Phone Number" content="+86 181 0000 0000"/>
                </s-col>
            </s-row>
            <s-row>
                <s-col span="{{24}}">
                    <s-item title="Github">
                        <a slot="contet" href="http://github.com/ant-design/ant-design/">github.com/ant-design/ant-design/</a>
                    </s-item>
                </s-col>
            </s-row>
        </s-drawer>
    </div>
</template>

<script>
import avatar from 'santd/avatar';
import button from 'santd/button';
import drawer from 'santd/drawer';
import divider from 'santd/divider';
import col from 'santd/col';
import row from 'santd/row';
import list from 'santd/list';
import san from 'san';

const uiItem = san.defineComponent({
    template: `
        <div style="{{dStyle | css}}">
            <p style="{{pStyle | css}}">{{title}}:</p>
            <slot name="contet">{{content}}</slot>
        </div>
    `,
    filters:  {
        css: drawer.prototype.filters.css
    },
    initData() {
        return {
            dStyle: {
                fontSize: '14px',
                lineHeight: '22px',
                marginBottom: '7px',
                color: 'rgba(0,0,0,0.65)'
            },
            pStyle: {
                marginRight: '8px',
                marginBottom: '0',
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)'
            }
        }
    }
});

export default {
    components: {
        's-avatar': avatar,
        's-button': button,
        's-drawer': drawer,
        's-divider': divider,
        's-col': col,
        's-row': row,
        's-item': uiItem,
        's-list': list,
        's-list-item': list.Item,
        's-list-item-meta': list.Item.Meta
    },
    filters:  {
        css: drawer.prototype.filters.css
    },
    initData() {
        return {
            visible: false,
            placement: 'right',
            pStyle: {
                display: 'block',
                marginBottom: '16px',
                fontSize: '16px',
                lineHeight: '24px',
                color: 'rgba(0,0,0,.85)'
            },
            listData: [{
                name: 'Lily'
            }, {
                name: 'Lily'
            }]
        };
    },
    showDrawer() {
        this.data.set('visible', true);
    },
    onClose(e) {
        console.log(e, 'I was closed.');
        this.data.set('visible', false);
    },
    onChange(e) {
        this.data.set('placement', e.target.value);
    }
}
</script>
```
