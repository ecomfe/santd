/**
 * @file Santd datepicker docs file
 **/

import Base from 'santd/base';
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
import SelectInRange from './selectInRange.md';
import Readme from '../README.md';

export default class extends Base {
    static components = {
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
        selectinrange: SelectInRange,
        readme: Readme
    }
    static template = `
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
            <selectinrange/>
            <range/>
            <controlled/>
            <readme/>
        </div>
    `
};
