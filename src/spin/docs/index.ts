/**
 * @file 组件 spin
 * @author baozhixin <baozhixin@baidu.com>
 */

import Head from './head.md';
import Basic from './basic.md';
import Size from './size.md';
import Inside from './inside.md';
import Nested from './nested.md';
import Tip from './tip.md';
import Delay from './delay.md';
import Indicator from './indicator.md';
import Readme from '../README.md';
import Base from 'santd/base';

export default class extends Base {
    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <size/>
            <inside/>
            <nested/>
            <tip/>
            <delay/>
            <indicator/>
            <readme/>
        </div>
    `;
    static components = {
        head: Head,
        basic: Basic,
        size: Size,
        inside: Inside,
        nested: Nested,
        tip: Tip,
        delay: Delay,
        indicator: Indicator,
        readme: Readme
    }
};
