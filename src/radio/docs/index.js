/**
 * @file Santd radio docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Disabled from './disabled.md';
import Group from './group.md';
import Vertical from './vertical.md';
import GroupWithName from './group-with-name.md';
import GroupOptions from './group-options.md';
import Button from './button.md';
import ButtonSolid from './button-solid.md';
import ButtonSize from './button-size.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        disabled: Disabled,
        group: Group,
        vertical: Vertical,
        groupwithname: GroupWithName,
        groupoptions: GroupOptions,
        button: Button,
        buttonsolid: ButtonSolid,
        buttonsize: ButtonSize,
        readme: Readme
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <disabled/>
            <group/>
            <vertical/>
            <groupoptions/>
            <groupwithname/>
            <button/>
            <buttonsolid/>
            <buttonsize/>
            <readme/>
        </div>
    `
});
