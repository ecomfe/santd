/**
 * @file Santd rate docs file
 **/
import Desc from './desc.md';
import Basic from './basic.md';
import Half from './half.md';
import Text from './text.md';
import Disabled from './disabled.md';
import Clear from './clear.md';
import Character from './character.md';
import Readme from '../README.md';
import Base from 'santd/base';

export default class Rate extends Base {
    static template = `
        <div>
            <desc/>
            <basic/>
            <half/>
            <text/>
            <disabled/>
            <clear/>
            <character/>
            <readme />
        </div>
    `
    static components = {
        desc: Desc,
        basic: Basic,
        readme: Readme,
        half: Half,
        text: Text,
        clear: Clear,
        disabled: Disabled,
        character: Character
    }
};
