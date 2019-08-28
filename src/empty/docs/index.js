/**
 * @file Santd empty docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Choose from './choose.md';
import Custom from './custom.md';
import NoDescription from './nodescription.md';
import Head from './head.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        choose: Choose,
        custom: Custom,
        nodescription: NoDescription,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <choose/>
            <custom/>
            <nodescription/>
            <readme/>
        </div>
    `
});
