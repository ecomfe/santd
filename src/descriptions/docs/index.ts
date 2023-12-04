/**
 * @file Santd descriptions docs file
 **/

import Base from 'santd/base';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Bordered from './bordered.md';
import Size from './size.md';
import Responsive from './responsive.md';
import Vertical from './vertical.md';
import VerticalBordered from './verticalBordered.md';
export default class  extends Base {
    static components = {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        bordered: Bordered,
        size: Size,
        responsive: Responsive,
        vertical: Vertical,
        verticalbordered: VerticalBordered
    };
    static template = `
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
    `;

};
