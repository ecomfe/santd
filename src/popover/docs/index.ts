/**
 * @file Santd popover docs
 **/
import Base from 'santd/base';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Position from './position.md';
import Trigger from './trigger.md';
import Arrow from './arrow.md';
import Visible from './visible.md';
import Hover from './hover.md';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        trigger: Trigger,
        visible: Visible,
        arrow: Arrow,
        position: Position,
        hover: Hover
    }
    static template = /* html */ `
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
};
