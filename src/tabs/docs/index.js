/**
 * @file Santd tabs docs file
 **/
import san from 'san';
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
import SlotTabpane from './slot-tabpane.md';

export default san.defineComponent({
    components: {
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
        'slot-tabpane': SlotTabpane,
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <disabled/>
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
            <slot-tabpane/>
            <readme/>
        </div>
    `
});
