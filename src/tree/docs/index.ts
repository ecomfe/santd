/**
* @file docs入口文件
*/
import Base from 'santd/base';
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
import VirtualScroll from './virtual-scroll.md';

export default class extends Base {
    static components = {
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
        directory: Directory,
        'virtual-scroll': VirtualScroll
    };
    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <control/>
            <search/>
            <icon/>
            <async/>
            <line/>
            <switcher/>
            <directory/>
            <virtual-scroll/>
            <readme/>
        </div>
    `
};
