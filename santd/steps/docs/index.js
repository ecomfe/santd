/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Size from './size.md';
import Icon from './icon.md';
import Change from './change.md';
import Vertical from './vertical.md';
import verSmall from './vertical_small.md';
import Errors from './error.md';
import Progress from './progressDot.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        size: Size,
        icon: Icon,
        change: Change,
        vertical: Vertical,
        versmall: verSmall,
        error: Errors,
        progess: Progress
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <size/>
            <icon/>
            <change/>
            <vertical/>
            <versmall/>
            <error/>
            <progess/>
            <readme/>
        </div>
    `
});
