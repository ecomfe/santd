/**
 * @file doc boot file
 * @author mayihui@baidu.com
 **/
import sanPlugin from './src';
import {name, homepage as repo} from '../package.json';
import 'highlight.js/styles/solarized-light.css'
import './index.less';


window.$docsify = {
    name,
    repo,
    loadSidebar: true,
    alias: {
        '/.*/_sidebar.md': '/_sidebar.md'
    },
    plugins: [sanPlugin]
};
