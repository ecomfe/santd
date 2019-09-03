/**
 * @file header component
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import {Component} from 'san';
import {Icon, Col, Row, Menu, Badge} from 'santd';

export default class Header extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <header class="doc-header clearfix">
            <s-row>
                <s-col xs="24" sm="24" md="5" lg="5" xl="5" xxl="4">
                    <a class="doc-logo" href="/">
                        <span class="logo"></span>
                        <span class="text">santd</span>
                    </a>
                </s-col>
                <s-col xs="0" sm="0" md="19" lg="19" xl="19" xxl="20">
                    <div class="doc-search"></div>
                    <s-menu
                        class="doc-nav"
                        mode="horizontal"
                        theme="light"
                        defaultSelectedKeys="{{['1']}}"
                        inlineCollapsed="{{false}}"
                        on-click="itemClick"
                    >
                        <s-menu-item key="1">
                            <span>首页</span>
                        </s-menu-item>
                        <s-menu-item key="2">
                            <span>设计语言</span>
                        </s-menu-item>
                        <s-menu-item key="3">
                            <span>组件</span>
                        </s-menu-item>
                        <s-sub-menu key="sub" title="生态">
                            <s-menu-item key="4">
                                <a href="http://pro.ant.design" class="header-link" target="_blank">
                                    Ant Design Pro v4
                                </a>
                            </s-menu-item>
                            <s-menu-item key="5">
                                <a href="http://ng.ant.design" class="header-link" target="_blank">
                                    Ant Design of Angular
                                </a>
                            </s-menu-item>
                            <s-menu-item key="6">
                                <a href="http://vue.ant.design" class="header-link" target="_blank">
                                    Ant Design of Vue
                                </a>
                            </s-menu-item>
                            <s-menu-item key="7">
                                <a href="https://www.yuque.com/ant-design/course" class="header-link" target="_blank">
                                    Ant Design 实战教程
                                </a>
                            </s-menu-item>
                            <s-menu-item key="8">
                                <s-badge dot>
                                    <a href="/" class="header-link">Ant Design of San</a>
                                </s-badge>
                            </s-menu-item>
                        </s-sub-menu>
                    </s-menu>
                </s-col>
            </s-row>
        </header>
    `;

    static components = {
        's-col': Col,
        's-row': Row,
        's-icon': Icon,
        's-menu': Menu,
        's-menu-item': Menu.Item,
        's-sub-menu': Menu.Sub,
        's-badge': Badge
    };
}
