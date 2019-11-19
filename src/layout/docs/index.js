/**
* @file 文档加载入口
* @author fuqiangqiang@baidu.com
*/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import CustomTrigger from './custom-trigger.md';
import Topside2 from './top-side-2.md';
import Topside3 from './top-side-3.md';
import Top from './top.md';
import Responsive from './responsive.md';
import Desc from './desc.md';
import Side from './side.md';
import Fixed from './fixed.md';

import './style.less';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        custom: CustomTrigger,
        topside2: Topside2,
        topside3: Topside3,
        top: Top,
        response: Responsive,
        desc: Desc,
        side: Side,
        fixed: Fixed
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <top/>
            <topside2/>
            <topside3/>
            <custom/>
            <response/>
            <readme/>
        </div>
    `
});
