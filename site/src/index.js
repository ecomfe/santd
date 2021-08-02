/**
 * @file 官网入口文件
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import {Component} from 'san';
import {router} from 'san-router';

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import NProgress from 'nprogress';

import Content from './containers/Content';
import Header from './containers/Header';
import Navigator from './containers/Navigator';

import {Notification, Col, Row, Affix, Icon} from 'santd';

import routes from './lib/routes';
import './style/index.less';
const defaultPath = '/docs/quickstart';

class Index extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <div class="page-wrapper">
            <doc-header routes="{{routes}}" on-redirect="handleRedirect"/>
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
                        <section class="prev-next-nav">
                            <a class="prev-page" href="#{{leftNav.key}}" s-if="leftNav"><s-icon type="left" /> {{leftNav.text || leftNav.name}}</a>
                            <a class="next-page" href="#{{rightNav.key}}" s-if="rightNav">{{rightNav.text || rightNav.name}} <s-icon type="right" /></a>
                        </section>
                        <footer id="footer">
                            <div class="footer-wrap">
                                <s-row>
                                    <s-col xs="24" sm="24" md="6">
                                        <div class="footer-center">
                                            <h2>相关资源</h2>
                                            <div><a href="https://ant.design/docs/react/introduce-cn" target="_blank">Ant Design</a><span> - </span><span>React</span></div>
                                            <div><a href="https://antdv.com/docs/vue/introduce-cn" target="_blank">Ant Design</a><span> - </span><span>Vue</span></div>
                                            <div><a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank">Ant Design</a><span> - </span><span>Angular</span></div>
                                            <div><a href="https://github.com/websemantics/awesome-ant-design" target="_blank">Awesome Ant Design</a></div>
                                            <div><a href="https://baidu.github.io/san/">San</a></div>
                                        </div>
                                    </s-col>
                                    <s-col xs="24" sm="24" md="6">
                                        <div class="footer-center">
                                            <h2>帮助</h2>
                                            <div><a href="https://github.com/ecomfe/santd" target="_blank">GitHub</a></div>
                                            <div><a href="#/docs/changelog">更新日志</a></div>
                                            <div><a href="https://ecomfe.github.com/santd/issue">报告 Bug</a></div>
                                        </div>
                                    </s-col>
                                    <s-col xs="24" sm="24" md="6">
                                        <div class="footer-center">
                                            <h2>更多</h2>
                                            <div><a href="https://github.com/baidu/san" rel="noopener noreferrer" target="_blank">San</a><span> - </span><span>一个快速、轻量、灵活的JavaScript组件框架</span></div>
                                            <div><a href="https://github.com/ecomfe/san-cli" target="_blank "><span>san-cli</span></a><span> - </span><span>可定制化的前端开发工具集</span></div>
                                            <div><a href="https://github.com/baidu/san-devtools" rel="noopener noreferrer" target="_blank">san-devtools</a><span> - </span><span>用于调试San.js应用程序的开发工具</span></div>
                                        </div>
                                    </s-col>
                                </s-row>
                            </div>
                        </footer>
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
        's-affix': Affix,
        's-icon': Icon
    };

    static computed = {
        leftNav() {
            const currentPath = this.data.get('currentPath');
            const flattenRouter = this.data.get('flattenRouter') || [];
            let leftNav;
            flattenRouter.forEach((router, index) => {
                if (router.key === currentPath) {
                    leftNav = flattenRouter[index - 1];
                }
            });

            return leftNav;
        },
        rightNav() {
            const currentPath = this.data.get('currentPath');
            const flattenRouter = this.data.get('flattenRouter') || [];
            let rightNav;
            flattenRouter.forEach((router, index) => {
                if (router.key === currentPath) {
                    rightNav = flattenRouter[index + 1];
                }
            });

            return rightNav;
        }
    }

    initData() {
        return {
            routerMap: {},
            routes
        };
    }

    inited() {
        let routerMap = {};
        let flattenRouter = [];
        const routes = this.data.get('routes');
        routes.forEach(item => {
            routerMap[item.key] = {};
            if (!item.list) {
                flattenRouter.push(item);
            }
            item.leaf && item.leaf.forEach(subItem => {
                routerMap[item.key][subItem.path] = true;
            });
            item.list && item.list.forEach(listItem => {
                listItem.leaf && listItem.leaf.forEach(subItem => {
                    flattenRouter.push(subItem);
                    routerMap[item.key][subItem.path] = true;
                });
            });
        });
        this.data.set('routerMap', routerMap);
        this.data.set('flattenRouter', flattenRouter);
    }

    attached() {
        const that = this;
        // 错误提示
        window.addEventListener('error', this.handleError.bind(this), false);

        // 添加路由
        router.add({
            rule: '/:type/:id',
            handler(e) {
                // console.log(e); // eslint-disable-line
            }
        });

        // 路由监听
        router.listen(e => {
            const query = e.query;

            // 加载进度条
            if (NProgress.isRendered) {
                NProgress.remove();
            }
            NProgress.inc();

            if (e.path === '/') {
                that.handleRedirect({key: defaultPath});
                that.data.set('currentPath', defaultPath);
            }
            else {
                that.data.set('currentPath', e.path);
                if (query.type === 'docs') {
                    const di = query.id === 'changelog'
                    ? import(
                        /* webpackChunkName: "docs" */
                        '/CHANGELOG.md?exportType=html'
                    ) : import(
                        /* webpackChunkName: "docs" */
                        `@docs/${query.id}.md?exportType=html`
                    );
                    di.then(({default: html}) => {
                        this.docChange(() => {
                            that.data.set('content', html);
                        });
                    }).catch(e => {
                        that.handleError(e);
                    });
                }
                else if (query.type === 'components') {
                    import(
                        /* webpackChunkName: "comp-doc" */
                        `santd/${query.id}/docs/index.js`
                    ).then(({default: Doc}) => {
                        this.docChange(() => {
                            // 得到的是san component 对象
                            const doc = new Doc();
                            doc.attach(document.getElementById('content'));
                        });
                    }).catch(e => {
                        that.handleError(e);
                    });
                }
            }

            // 完成加载进度条
            // true 解决非首次加载过快导致进度条不显示问题
            NProgress.done(true);
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

    /**
     * docChange 文档内容改变
     *
     * @param {Function} changeFun 自定义 doc change 事件
     */
    docChange(changeFun) {
        // before
        // 清除当前页面 doc内容
        document.getElementById('content').innerHTML = '';
        this.data.set('content', '');

        // 执行自定义 change 执行事件
        changeFun && changeFun();


        // after
        // 恢复滚动高度
        if (window.document.documentElement.scrollTop > 110) {
            window.scroll(0, 110);
        }

        // 更改页面标题
        this.nextTick(() => {
            const titleSuffix = 'San Toolkit for Ant Design';

            const titleResult = document.querySelectorAll('h1 > span')[0].innerText.split(' ');
            let title = '';

            if (titleResult.length === 2) {
                title = `${titleResult[1]} ${titleResult[0]}`;
            }
            else {
                // 兼容Ant Design of San
                title = titleResult.join(' ');
            }

            document.title = `${title} - ${titleSuffix}`;
            this.hlCode();
        });
    }

    hlCode() {
        Array.prototype.forEach.call(document.getElementsByTagName('code'), item => Prism.highlightElement(item));
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
