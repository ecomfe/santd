/**
* @file Santd input docs file
*/
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
import Loading from './loading.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
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
        password: Password,
        loading :Loading
    }

    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <addon/>
            <search/>
            <loading/>
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
};
