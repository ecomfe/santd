/**
 * @file header component
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import {Component} from 'san';
import {Icon, Col, Row, Menu, Badge, Select, Input} from 'santd';

export default class Header extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <header class="doc-header clearfix">
            <s-row>
                <s-col xs="24" sm="24" md="5" lg="5" xl="5" xxl="4">
                    <a class="doc-logo" href="/santd">
                        <span class="logo"></span>
                        <span class="text">Santd</span>
                    </a>
                </s-col>
                <s-col xs="0" sm="0" md="19" lg="19" xl="19" xxl="20">
                    <div class="doc-search">
                        <s-icon type="search"></s-icon>
                        <s-select
                            showSearch
                            showArrow="{{false}}"
                            filterOption="{{false}}"
                            notFoundContent="not found"
                            style="width: 200px;"
                            placeholder="搜索组件..."
                            on-search="handleSearch"
                            on-select="handleSelect"
                        >
                            <s-select-option s-for="d in showOpts" value="{{d.key}}">
                                {{d.path}}
                            </s-select-option>
                        </s-select>
                    </div>

                    <s-menu
                        class="doc-nav"
                        mode="horizontal"
                        theme="light"
                        selectedKeys="{{['1']}}"
                        selectable="{{false}}"
                        inlineCollapsed="{{false}}"
                    >
                        <s-menu-item key="1">
                            <a href="#/">
                                <span>组件</span>
                            </a>
                        </s-menu-item>
                        <s-sub-menu key="2" title="生态系统">
                            <s-menu-item-group>
                                <s-menu-item key="3">
                                    <a href="http://pro.ant.design/" class="header-link" target="_blank">Ant Design Pro V4</a>
                                </s-menu-item>
                                <s-menu-item key="4">
                                    <a href="http://ant.design/" class="header-link" target="_blank">Ant Design of React</a>
                                </s-menu-item>
                                <s-menu-item key="5">
                                    <a href="http://ng.ant.design/" class="header-link" target="_blank">Ant Design of Angular</a>
                                </s-menu-item>
                                <s-menu-item key="6">
                                    <a href="http://vue.ant.design/" class="header-link" target="_blank">Ant Design of Vue</a>
                                </s-menu-item>
                                <s-menu-item key="7">
                                    <s-badge dot="{{true}}">
                                        <a href="http://ecomfe.github.io/santd/" class="header-link" target="_blank">Ant Design of San</a>
                                    </s-badge>
                                </s-menu-item>
                            </s-menu-item-group>
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
        's-input': Input,
        's-badge': Badge,
        's-select': Select,
        's-select-option': Select.Option
    };
    initData() {
        return {
            opts: [],
            showOpts: [],
            value: ''
        };
    }
    created() {
        const routes = this.data.get('routes');
        const opts = this.getCom(routes);
        this.data.set('opts', opts);
        this.data.set('showOpts', opts);
    }
    getCom(arr) {
        return arr.reduce((pre, cur) => {
            if (cur.leaf) {
                return [...pre, ...cur.leaf];
            }
            return [...pre, ...(this.getCom(cur.list || []))];
        }, []);
    }
    handleSearch(value) {
        const opts = this.data.get('opts');
        let showOpts = value ? opts.filter(item => item.name.indexOf(value) > -1) : opts;
        this.data.set('showOpts', showOpts);
    }
    handleSelect(value) {
        this.fire('redirect', {key: value});
    }
}
