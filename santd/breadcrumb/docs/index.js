/**
* @file docs入口文件
*/
import san from 'san';
import Head from './head.md';
import Readme from '../README.md';
import Basic from './basic.md';
import withIcon from './withIcon.md';
import Separator from './separator.md';

export default san.defineComponent({
    components: {
        head: Head,
        readme: Readme,
        basic: Basic,
        addicon: withIcon,
        separator: Separator
    },
    template: `
        <div>
            <head/>
            <basic/>
            <addicon/>
            <separator/>
            <readme/>
        </div>
    `
});
