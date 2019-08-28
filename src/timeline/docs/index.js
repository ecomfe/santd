/**
 * @file Santd timeline docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Mode from './mode.md';
import Alternate from './alternate.md';
import Color from './color.md';
import Dot from './dot.md';
import Pending from './pending.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        desc: Desc,
        mode: Mode,
        alternate: Alternate,
        color: Color,
        dot: Dot,
        pending: Pending
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <color/>
            <pending/>
            <dot/>
            <alternate/>
            <mode/>
            <readme/>
        </div>
    `
});
