/**
 * @file Santd tabs docs file
 **/
import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import Card from './card.md';
import Disabled from './disabled.md';
import Extra from './extra.md';
import Icon from './icon.md';
import Position from './position.md';
import Size from './size.md';
import Editable from './editable-card.md';
import CardTop from './card-top.md';
import CustomAdd from './custom-add.md';
import CustomBar from './custom-bar.md';
import Slide from './slide.md';
import Center from './center.md';
import Keyboard from './keyboard.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        desc: Desc,
        disabled: Disabled,
        icon: Icon,
        slide: Slide,
        extra: Extra,
        size: Size,
        position: Position,
        card: Card,
        editable: Editable,
        cardtop: CardTop,
        customadd: CustomAdd,
        custombar: CustomBar,
        center : Center,
        keyboard: Keyboard
    };

    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <disabled/>
            <center/>
            <icon/>
            <slide/>
            <extra/>
            <size/>
            <position/>
            <card/>
            <editable/>
            <cardtop/>
            <customadd/>
            <custombar/>
            <keyboard/>
            <readme/>
        </div>
    `;
};
