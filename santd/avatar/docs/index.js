/**
 * @file Santd avatar docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Type from './type.md';
import Badge from './badge.md';
import Dynamic from './dynamic.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        type: Type,
        readme: Readme,
        dynamic: Dynamic,
        badge: Badge
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <dynamic/>
            <type/>
            <badge/>
            <readme/>
        </div>
    `
});
