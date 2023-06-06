/**
 * @file Santd carousel docs file
 **/
import Readme from '../README.md';
import Basic from './basic.md';
import Position from './position.md';
import Head from './head.md';
import Autoplay from './autoplay.md';
import Base from 'santd/base';

export default class extends Base{
    static components = {
        readme: Readme,
        basic: Basic,
        position: Position,
        head: Head,
        autoplay: Autoplay
    };
    static template = `
        <div>
            <head/>
            <basic/>
            <position/>
            <autoplay/>
            <readme/>
        </div>
    `;
}
