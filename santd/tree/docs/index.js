/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
// import Basic from './basic.md';
import Basic from './basic-new.md';
import Checkbox from './checkbox.md';
import Icon from './icon.md';
import Line from './line.md';
import Async from './async.md';
import BasControl from './basic-control.md';
import Search from './search.md';
import Directory from './directory.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        checkbox: Checkbox,
        icon: Icon,
        line: Line,
        async: Async,
        bascontrol: BasControl,
        search: Search,
        directory: Directory
    },
    template: `
        <div>
            <basic/>
            <bascontrol/>
            <async/>
            <search/>
            <line/>
            <directory/>
            <icon/>
            <readme/>
        </div>
    `
})
