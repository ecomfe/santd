/**
 * @file docs入口文件
 */
import san from 'san';
import Readme from '../README.md';
import Description from './description.md';
import Basic from './basic.md';
import Disabled from './disabled.md';
import Size from './size.md';
import Text from './text.md';
import Loading from './loading.md';
export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        disabled: Disabled,
        size: Size,
        text: Text,
        loading: Loading,
        description: Description
    },
    template: `
    <div class="form">
        <description />
        <basic />
        <disabled />
        <size />
        <text />
        <loading />
        <readme />
    </div>
    `
});
