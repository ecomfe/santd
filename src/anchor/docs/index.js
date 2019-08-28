/**
 * @file Santd anchor docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Static from './static.md';
import Click from './click.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        static: Static,
        click: Click
    },
    template: `
        <div>
            <head/>
            <basic/>
            <static/>
            <click/>
            <readme/>
        </div>
    `
});
