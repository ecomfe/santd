/**
 * @file 单独组件文档入口
 * @author chenkai13
 */

/* globals __resourceQuery */
/* eslint-disable no-console, fecs-no-require */

import './index.less';
import './preview.less';
import {defineComponent} from 'san';
import querystring from 'querystring';

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
