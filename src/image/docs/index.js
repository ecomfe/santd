/**
* @file Santd input docs file
*/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Fallback from './fallback.md';
import PreviewGroup from './preview-group.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        fallback: Fallback,
        previewgroup: PreviewGroup
    },
    template: `
        <div>
            <head />
            <basic />
            <fallback />
            <previewgroup />
            <readme />
        </div>
    `
});
