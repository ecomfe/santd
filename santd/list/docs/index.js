/**
* @file 文档加载入口
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Simple from './simple.md';
import Basic from './basic.md';
import Vertical from './vertical.md';
import Grid from './grid.md';
import Resposive from './resposive.md';
import Loadmore from './loadmore.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        simple: Simple,
        basic: Basic,
        vertical: Vertical,
        grid: Grid,
        resposive: Resposive,
        loadmore: Loadmore
    },
    template: `
        <div>
            <desc/>
            <simple/>
            <basic/>
            <loadmore/>
            <vertical/>
            <grid/>
            <resposive/>
            <readme/>
        </div>
    `
});
