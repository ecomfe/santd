/**
 * @file Santd comment docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Nested from './nested.md';
import Reply from './reply.md';
import Head from './head.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        nest: Nested,
        reply: Reply,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <nest/>
            <reply/>
            <readme/>
        </div>
    `
});
