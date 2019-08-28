/**
 * @file Santd badge docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Overflow from './overflow.md';
import Link from './link.md';
import Status from './status.md';
import Independent from './independent.md';
import Dot from './dot.md';
import Dynamic from './dynamic.md';
import Colors from './colors.md';

import './style.css';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        overflow: Overflow,
        link: Link,
        status: Status,
        independent: Independent,
        dot: Dot,
        dynamic: Dynamic,
        colors: Colors
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <overflow/>
            <link/>
            <status/>
            <independent/>
            <dot/>
            <dynamic/>
            <customtitle/>
            <colors/>
            <readme/>
        </div>
    `
});
