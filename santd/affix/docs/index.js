/**
 * @file Santd anchor docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import OffsetTop from './offsetTop.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        offsettop: OffsetTop
    },
    template: `
        <div>
            <head/>
            <basic/>
            <offsettop/>
            <readme/>
        </div>
    `
});
