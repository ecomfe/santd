/**
 * @file Santd popconfirm docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Position from './position.md';
import Icon from './icon.md';
import Condition from './condition.md';
import Desc from './desc.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        position: Position,
        icon: Icon,
        condition: Condition
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <position/>
            <icon/>
            <condition/>
            <readme/>
        </div>
    `
});
