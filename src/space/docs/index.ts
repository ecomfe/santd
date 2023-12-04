/**
* @file 文档加载入口
* @author Lohoyo
*/

import Base from 'santd/base';
import Desc from './desc.md';
import Basic from './basic.md';
import Vertical from './vertical.md';
import Size from './size.md';
import Align from './align.md';
import Customize from './customize.md';
import Wrap from './wrap.md';
import Readme from '../README.md';

export default class extends Base {
    static components = {
        desc: Desc,
        basic: Basic,
        vertical: Vertical,
        align: Align,
        size: Size,
        customize: Customize,
        wrap: Wrap,
        readme: Readme
    }
    static template =`
        <div>
            <desc/>
            <basic/>
            <vertical/>
            <size/>
            <align/>
            <customize/>
            <wrap/>
            <readme/>
        </div>
    `
};
