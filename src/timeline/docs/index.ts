/**
 * @file Santd timeline docs file
 **/
import Base from 'santd/base';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Mode from './mode.md';
import Alternate from './alternate.md';
import Color from './color.md';
import Dot from './dot.md';
import Pending from './pending.md';
import Label from './label.md';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        desc: Desc,
        mode: Mode,
        alternate: Alternate,
        color: Color,
        dot: Dot,
        pending: Pending,
        label: Label
    };
    static template = `
        <div>
            <desc/>
            <basic/>
            <color/>
            <pending/>
            <dot/>
            <alternate/>
            <mode/>
            <label/>
            <readme/>
        </div>
    `;
};
