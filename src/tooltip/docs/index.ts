/**
 * @file Santd tooltip docs file
 **/

import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Arrow from './arrow.md';
import Position from './position.md';
import Preset from './preset.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        arrow: Arrow,
        position: Position,
        preset: Preset
    };

    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <arrow/>
            <position/>
            <preset/>
            <readme/>
        </div>
    `;
};
