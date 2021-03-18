<codebox>
#### 信息预览抽屉
需要快速预览对象概要时使用，点击遮罩区关闭。

```html
<template>
    <div>
        <s-list bordered="{{true}}" itemLayout="horizontal" dataSource="{{listData}}">
            <s-list-item slot="renderItem" actions="{{['profile']}}">
                <ul class="{{prefixCls}}-item-action" slot="profile">
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
            <p style="margin-bottom: 16px; font-size: 16px; line-height: 24px; color: rgba(0,0,0, 0.85);">User Profile</p>
            <p style="margin-bottom: 16px; font-size: 16px; line-height: 24px; color: rgba(0,0,0, 0.85);">Personal</p>
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
            <p style="margin-bottom: 16px; font-size: 16px; line-height: 24px; color: rgba(0,0,0, 0.85);">Company</p>

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
            <p style="margin-bottom: 16px; font-size: 16px; line-height: 24px; color: rgba(0,0,0, 0.85);">Contacts</p>

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
import san from 'san';
import {Avatar, Button, Drawer, Divider, Col, Row, List} from 'santd';

const uiItem = san.defineComponent({
    template: `
        <div style="font-size: 14px; line-height: 22px; margin-bottom: 7px; color: rgba(0, 0, 0, 0.65)">
            <p style="margin-right: 8px; margin-bottom: 0; display: inline-block; color: rgba(0, 0, 0, 0.85)">{{title}}:</p>
            <slot name="contet">{{content}}</slot>
        </div>
    `
});

export default {
    components: {
        's-avatar': Avatar,
        's-button': Button,
        's-drawer': Drawer,
        's-divider': Divider,
        's-col': Col,
        's-row': Row,
        's-item': uiItem,
        's-list': List,
        's-list-item': List.Item,
        's-list-item-meta': List.Item.Meta
    },
    filters:  {
        css: Drawer.prototype.filters.css
    },
    initData() {
        return {
            visible: false,
            placement: 'right',
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
</codebox>
