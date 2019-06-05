/**
 * @file Santd checkbox docs file
 **/

import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Disabled from './disabled.md';
import Controller from './controller.md';
import Group from './group.md';
import CheckAll from './checkall.md';
import Grid from './grid.md';
import Readme from '../README.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        disabled: Disabled,
        controller: Controller,
        group: Group,
        checkall: CheckAll,
        grid: Grid,
        readme: Readme
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <disabled/>
            <controller/>
            <group/>
            <checkall/>
            <grid/>
            <readme/>
        </div>
    `
});
