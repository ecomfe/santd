/**
 * @file 官网入口文件
 * @author wangyongqing <wangyongqing01@baidu.com>
 */

import './style/index.less';
import {Component} from 'san';
import {router} from 'san-router';
import Content from './containers/Content';
import Header from './containers/Header';
import Navigator from './containers/Navigator';

import {Notification, Col, Row} from 'santd';
import marked from './lib/marked';
import routes from './lib/routes';

const prefixCls = 'doc';
const defaultPath = '/docs/quickstart';

class Index extends Component {
    // eslint-disable-next-line
    static template = /*html*/ `
        <div class="${prefixCls}-wrapper">
            <doc-header class="${prefixCls}-header"/>
            <div class="${prefixCls}-body-wrapper">
                <doc-navigator
                    class="${prefixCls}-navigator"
                    style="top: {{navigatorFixedTop}}px;"
                    routes="{{routes}}"
                    current-path="{{currentPath}}"
                    on-redirect="handleRedirect"
                />
                <doc-content
                    class="${prefixCls}-content"
                    style="{{contentStyle}}"
                    content="{{content}}"
                />
            </div>
        </div>
    `;

    static components = {
        'doc-content': Content,
        'doc-header': Header,
        'doc-navigator': Navigator,
        's-col': Col,
        's-row': Row
    };

    initData() {
        return {
            routes
        };
    }

    attached() {
        const that = this;

        // 错误提示
        window.addEventListener('error', this.handleError.bind(this), false);

        // 添加路由
        router.add({
            rule: '/:type/:id',
            handler(e) {} // eslint-disable-line
        });

        // 路由监听
        router.listen(e => {
            const query = e.query;

            if (e.path === '/' || !that.checkRouter(query)) {
                that.handleRedirect({key: defaultPath});
                that.data.set('currentPath', defaultPath);
            } else {
                that.data.set('currentPath', e.path);

                if (query.type === 'docs') {
                    import(
                        /* webpackChunkName: "docs" */
                        `@docs/${query.id}.md?exportType=markdown`
                    )
                        .then(({default: md}) => {
                            that.data.set('content', marked(md));
                        })
                        .catch(e => {
                            that.handleError(e);
                        });
                } else if (query.type === 'components') {
                    import(
                        /* webpackChunkName: "comp-doc" */
                        `santd/${query.id}/docs/index.js`
                    )
                        .then(({default: docs}) => {
                            // 得到的是san component 对象
                            console.log(docs)
                            
                        })
                        .catch(e => {
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

        let valid = false;
        routes.forEach(item => {
            if (item.key && item.key === query.type) {
                item.list.forEach(subitem => {
                    if (subitem.path === query.id) {
                        valid = true;
                    }
                });
            }
        });

        return valid;
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
