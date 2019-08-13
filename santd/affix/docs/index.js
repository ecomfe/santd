/**
 * @file docs入口文件
 */

import san from 'san';
import Head from './head.md?exportType=markdown';
import Readme from '../README.md?exportType=markdown';
import Basic from './basic.md';
import OffsetTop from './offsetTop.md';

export default san.defineComponent({
    components: {
        head: Head,
        basic: Basic,
        readme: Readme,
        offset: OffsetTop
    },
    template: `
        <div>
            <head/>
            <basic/>
            <offset/>
            <readme/>
        </div>
    `
});
