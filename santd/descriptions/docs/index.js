/**
 * @file Santd descriptions docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Bordered from './bordered.md';
import Size from './size.md';
import Responsive from './responsive.md';
import Vertical from './vertical.md';
import VerticalBordered from './verticalBordered.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        bordered: Bordered,
        size: Size,
        responsive: Responsive,
        vertical: Vertical,
        verticalbordered: VerticalBordered
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <bordered/>
            <size/>
            <responsive/>
            <vertical/>
            <verticalbordered/>
            <readme/>
        </div>
    `
});
