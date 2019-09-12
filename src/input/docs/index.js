/**
* @file Santd input docs file
*/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Addon from './addon.md';
import Search from './search.md';
import Psfix from './presuffix.md';
import Size from './size.md';
import Textarea from './textarea.md';
import AutoTextarea from './autosize-textarea.md';
import ToolTip from './tooltip.md';
import Group from './group.md';
import Allow from './allow-clear.md';
import Password from './password.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        addon: Addon,
        psfix: Psfix,
        search: Search,
        size: Size,
        group: Group,
        textarea: Textarea,
        autoarea: AutoTextarea,
        tooltip: ToolTip,
        allow: Allow,
        password: Password
    },
    template: `
        <div>
            <head/>
            <basic/>
            <addon/>
            <search/>
            <autoarea/>
            <psfix/>
            <allow/>
            <size/>
            <group/>
            <textarea/>
            <tooltip/>
            <password/>
            <readme/>
        </div>
    `
});
