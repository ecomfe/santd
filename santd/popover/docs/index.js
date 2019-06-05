/**
 * @file Santd popover docs
 **/
import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Position from './position.md';
import Trigger from './trigger.md';
import Arrow from './arrow.md';
import Visible from './visible.md';
import Hover from './hover.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        trigger: Trigger,
        visible: Visible,
        arrow: Arrow,
        position: Position,
        hover: Hover
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <trigger/>
            <position/>
            <arrow/>
            <visible/>
            <hover/>
            <readme/>
        </div>
    `
});
