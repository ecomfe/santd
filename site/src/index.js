/**
 * @file 官网入口文件
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import './style/index.less';
import {Component} from 'san';
import {router} from 'san-router';

import 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';

import Content from './containers/Content';
import Header from './containers/Header';
import Navigator from './containers/Navigator';

import {Notification, Col, Row, Affix} from 'santd';

import routes from './lib/routes';
const defaultPath = '/docs/quickstart';

class Index extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <div class="page-wrapper">
            <doc-header />
            <div class="main-wrapper">
                <s-row>
                    <s-col xs="24" sm="24" md="24" lg="6" xl="5" xxl="4" class="main-menu">
                        <s-affix>
                                <section class="main-menu-inner">
                                    <doc-navigator
                                        class="aside-container menu-site"
                                        style="top: {{navigatorFixedTop}}px;"
                                        routes="{{routes}}"
                                        currentPath="{{currentPath}}"
                                        on-redirect="handleRedirect"
                                    />
                                </section>
                            </s-affix>
                    </s-col>
                    <s-col xs="24" sm="24" md="24" lg="18" xl="19" xxl="20">
                        <section class="main-container">
                            <doc-content content="{{content}}" />
                        </section>
                    </s-col>
                </s-row>
            </div>
        </div>
    `;

    static components = {
        'doc-content': Content,
        'doc-header': Header,
        'doc-navigator': Navigator,
        's-col': Col,
        's-row': Row,
        's-affix': Affix
    };

    initData() {
        return {
            routerMap: {},
            routes
        };
    }

    inited() {
        let routerMap = {};
        const routes = this.data.get('routes');
        routes.forEach(item => {
            routerMap[item.key] = {};
            item.leaf && item.leaf.forEach(subItem => (
                routerMap[item.key][subItem.path] = true
            ));
            item.list && item.list.forEach(listItem => (
                listItem.leaf && listItem.leaf.forEach(subItem => (
                    routerMap[item.key][subItem.path] = true
                ))
            ));
        });
        this.data.set('routerMap', routerMap);
    }

    attached() {
        const that = this;
        // 错误提示
        window.addEventListener('error', this.handleError.bind(this), false);

        // 添加路由
        router.add({
            rule: '/:type/:id',
            handler(e) {
                console.log(e); // eslint-disable-line
            }
        });

        // 路由监听
        router.listen(e => {
            const query = e.query;

            if (e.path === '/' || !that.checkRouter(query)) {
                that.handleRedirect({key: defaultPath});
                that.data.set('currentPath', defaultPath);
            }
            else {
                that.data.set('currentPath', e.path);
                document.getElementById('content').innerHTML = '';
                that.data.set('content', '');
                if (query.type === 'docs') {
                    import(
                        /* webpackChunkName: "docs" */
                        `@docs/${query.id}.md?exportType=html`
                    ).then(({default: html}) => {
                        that.data.set('content', html);
                    }).catch(e => {
                        that.handleError(e);
                    });
                }
                else if (query.type === 'components') {
                    import(
                        /* webpackChunkName: "comp-doc" */
                        `santd/${query.id}/docs/index.js`
                    ).then(({default: Doc}) => {
                        // 得到的是san component 对象
                        let doc = new Doc();
                        doc.attach(document.getElementById('content'));
                    }).catch(e => {
                        that.handleError(e);
                    });
                }
            }
        });

        router.start();
    }

    // 校验路由规则 /:type/:id
    checkRouter(query) {
        if (!query.type || !query.id) {
            return false;
        }
        const routerMap = this.data.get('routerMap');
        return routerMap[query.type] && routerMap[query.type][query.id];
    }

    handleError(err) {
        Notification.error({
            message: err.type || '错误提示',
            description: err.message || '出错了'
        });
    }

    handleRedirect(item) {
        if (item.key) {
            router.locator.redirect(item.key);
        }
    }
}

const app = new Index();
app.attach(document.getElementById('app'));
