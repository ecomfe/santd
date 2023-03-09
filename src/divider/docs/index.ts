/**
 * @file Santd divider docs file
 **/

import Readme from '../README.md';
import Desc from './desc.md';
import Horizontal from './horizontal.md';
import Orientation from './orientation.md';
import Vertical from './vertical.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme,
        horizontal: Horizontal,
        orientation: Orientation,
        vertical: Vertical,
        desc: Desc
    };
    static template = /* html */ `
        <div>
            <desc/>
            <horizontal/>
            <orientation/>
            <vertical/>
            <readme/>
        </div>
    `
};
