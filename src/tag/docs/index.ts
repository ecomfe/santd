/**
* @file Santd tag docs file
*/
import Base from 'santd/base';
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Control from './control.md';
import Checkable from './checkable.md';
import HotTags from './hot-tags.md';
import Color from './colorful.md';
import Controlled from './controlled.md';
import Icon from './icon.md';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        control: Control,
        checkable: Checkable,
        hottags: HotTags,
        color: Color,
        controlled: Controlled,
        icon: Icon
    };
    static template = `
        <div>
            <desc/>
            <basic/>
            <control/>
            <hottags/>
            <color/>
            <checkable/>
            <controlled/>
            <icon/>
            <readme/>
        </div>
    `;
};
