/**
* @file docs入口文件
*/
import Base from 'santd/base';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Size from './size.md';
import Icon from './icon.md';
import Change from './change.md';
import Vertical from './vertical.md';
import verSmall from './vertical_small.md';
import Errors from './error.md';
import Progress from './progressDot.md';
import CustomDot from './customDot.md';
import Click from './click.md';
import Navigation from './navigation.md';
import Initial from './initial.md';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        size: Size,
        icon: Icon,
        change: Change,
        vertical: Vertical,
        versmall: verSmall,
        error: Errors,
        progess: Progress,
        customdot: CustomDot,
        click: Click,
        navigation: Navigation,
        initial: Initial
    }
    static template = `
        <div>
            <desc/>
            <basic/>
            <size/>
            <icon/>
            <change/>
            <vertical/>
            <versmall/>
            <error/>
            <progess/>
            <customdot/>
            <click/>
            <initial/>
            <navigation/>
            <readme/>
        </div>
    `;
};
