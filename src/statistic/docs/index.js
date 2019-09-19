/**
 * @file Santd statistic docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Card from './card.md';
import Unit from './unit.md';
import Countdown from './countdown.md';
import Head from './head.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        unit: Unit,
        card: Card,
        countdown: Countdown,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <card/>
            <unit/>
            <countdown/>
            <readme/>
        </div>
    `
});
