/**
 * @file Santd backtop docs file
 **/

import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Self from './self.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        self: Self
    };

    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <self/>
            <readme/>
        </div>
    `;
};
