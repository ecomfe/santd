/**
 * @file docs入口文件
 */

import {Component} from 'san';
import Basic from './basic.md';

export default class BaseDocs extends Component {
    static components = {
        basic: Basic,
    };

    static template = /* html */ `
        <div>
            <basic/>
        </div>
    `;
}