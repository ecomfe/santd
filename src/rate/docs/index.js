/**
 * @file Santd rate docs file
 **/
import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Half from './half.md';
import Text from './text.md';
import Disabled from './disabled.md';
import Clear from './clear.md';
import Character from './character.md';
import Readme from '../README.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        readme: Readme,
        half: Half,
        text: Text,
        clear: Clear,
        disabled: Disabled,
        character: Character
    },
    template: `
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
});
