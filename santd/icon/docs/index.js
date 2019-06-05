/**
* @file docs入口文件
*/
import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Colors from './colorIcon.md';
import Script from './script.md';
import Readme from '../README.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        colors: Colors,
        script: Script,
        desc: Desc
    },
    template: `
        <div class="form">
            <desc/>
            <basic/>
            <colors/>
            <script/>
            <readme/>
        </div>
    `
});
