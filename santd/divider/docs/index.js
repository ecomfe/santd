/**
 * @file Santd divider docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Horizontal from './horizontal.md';
import Orientation from './orientation.md';
import Vertical from './vertical.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        horizontal: Horizontal,
        orientation: Orientation,
        vertical: Vertical,
        desc: Desc
    },
    template: `
        <div>
            <desc/>
            <horizontal/>
            <orientation/>
            <vertical/>
            <readme/>
        </div>
    `
});
