/**
 * @file Santd datepicker docs file
 **/

import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Size from './size.md';
import Disabled from './disabled.md';
import Format from './format.md';
import CustomRnage from './customrange.md';
import Footer from './footer.md';
import CustomCell from './customcell.md';
import Time from './time.md';
import CustomDisabled from './customdisabled.md';
import Range from './range.md';
import Controlled from './controlled.md';
import Readme from '../README.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        size: Size,
        disabled: Disabled,
        format: Format,
        customrange: CustomRnage,
        footer: Footer,
        customcell: CustomCell,
        time: Time,
        customdisabled: CustomDisabled,
        range: Range,
        controlled: Controlled,
        readme: Readme
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <size/>
            <disabled/>
            <format/>
            <customrange/>
            <footer/>
            <customcell/>
            <time/>
            <customdisabled/>
            <range/>
            <controlled/>
            <readme/>
        </div>
    `
});
