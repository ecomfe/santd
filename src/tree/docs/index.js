/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Checkbox from './checkbox.md';
import Icon from './icon.md';
import Line from './line.md';
import Switcher from './switcher.md';
import Async from './async.md';
import Control from './control.md';
import Search from './search.md';
import Directory from './directory.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        checkbox: Checkbox,
        icon: Icon,
        line: Line,
        switcher: Switcher,
        async: Async,
        control: Control,
        search: Search,
        directory: Directory
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <control/>
            <icon/>
            <async/>
            <line/>
            <switcher/>
            <!--<search/>
            <directory/>-->
            <readme/>
        </div>
    `
});
