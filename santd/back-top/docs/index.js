/**
 * @file Santd backtop docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Self from './self.md';
export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        self: Self
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <self/>
            <readme/>
        </div>
    `
});
