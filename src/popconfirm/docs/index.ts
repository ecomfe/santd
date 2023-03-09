/**
 * @file Santd popconfirm docs file
 **/

import Readme from '../README.md';
import Basic from './basic.md';
import Position from './position.md';
import Icon from './icon.md';
import Condition from './condition.md';
import Desc from './desc.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        position: Position,
        icon: Icon,
        condition: Condition
    };
    static template = `
        <div>
            <desc/>
            <basic/>
            <position/>
            <icon/>
            <condition/>
            <readme/>
        </div>
    `;
};
