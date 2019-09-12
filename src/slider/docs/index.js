/**
 * @file Santd slider docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Icon from './icon.md';
import Mark from './mark.md';
import Event from './event.md';
import Tip from './tip.md';
import Vertical from './vertical.md';
import Input from './input.md';
import Tooltip from './tooltip.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        icon: Icon,
        mark: Mark,
        event: Event,
        tip: Tip,
        vertical: Vertical,
        input: Input,
        tooltip: Tooltip
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <icon/>
            <event/>
            <vertical/>
            <input/>
            <tip/>
            <mark/>
            <tooltip/>
            <readme/>
        </div>
    `
});
