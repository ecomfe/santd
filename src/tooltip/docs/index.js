/**
 * @file Santd tooltip docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Arrow from './arrow.md';
import Position from './position.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        arrow: Arrow,
        position: Position
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <arrow/>
            <position/>
            <readme/>
        </div>
    `
});
