/**
 * @file Santd carousel docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Vertical from './vertical.md';
import Head from './head.md';
import Autoplay from './autoplay.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        vertical: Vertical,
        head: Head,
        autoplay: Autoplay
    },
    template: `
        <div>
            <head/>
            <basic/>
            <vertical/>
            <autoplay/>
            <readme/>
        </div>
    `
});
