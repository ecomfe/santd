/**
 * @file Santd statistic docs file
 **/
import Base from 'santd/base';
import Readme from '../README.md';
import Basic from './basic.md';
import Card from './card.md';
import Unit from './unit.md';
import Countdown from './countdown.md';
import Head from './head.md';

export default class Statistic extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        unit: Unit,
        card: Card,
        countdown: Countdown,
        head: Head
    }
    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <card/>
            <unit/>
            <countdown/>
            <readme/>
        </div>
    `
};
