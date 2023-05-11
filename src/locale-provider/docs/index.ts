/**
* @file docs入口文件
*/

import Base from 'santd/base';
import Desc from './desc.md';
import Basic from './basic.md';
import Locale from './locale.md';

export default class extends Base {
    static components = {
        desc: Desc,
        basic: Basic,
        locale: Locale
    };

    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <locale/>
        </div>
    `;
};
