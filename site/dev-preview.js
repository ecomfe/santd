/**
 * @file 组件预览
 * @author
 *
 * 预览说明：npm start [componentName]
 * 访问 http://localhost:8899 [componentName]为空，默认预览button组件示例
 * 访问 http://localhost:8899/[componentName], [componentName]组件存在且没有运行时异常, 则默认访问[componentName]组件示例
 */

/* globals __resourceQuery */
/* eslint-disable no-console, fecs-no-require */

import './index.less';
import './preview.less';
import {defineComponent} from 'san';
import hotClient from 'webpack-hot-middleware/client?noInfo=true&reload=true';
import querystring from 'querystring';

hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload();
    }
});

function preview(name) {
    let componentName = name || querystring.parse(__resourceQuery.slice(1)).componentName;

    if (componentName) {
        const uiComponent = require(`santd/${componentName}/docs/index.js`).default;
        // const AppComponent = defineComponent(uiPreview);

        const AppComponent = defineComponent({
            components: {
                'ui-component': uiComponent
            },
            template: `
            <div class="page-wrapper">
                <div class="main-wrapper">
                    <div class="main-container"><ui-component/></div>
                </div>
            </div>`
        });
        const app = new AppComponent();
        app.attach(document.getElementById('app'));
    }
}

try {
    preview(location.pathname.slice(1));
}
catch (e) {
    console.error(e);
    preview();
}
