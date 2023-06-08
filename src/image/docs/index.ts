/**
* @file Santd input docs file
*/
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Fallback from './fallback.md';
import PreviewGroup from './preview-group.md';
import Base from 'santd/base';
export default class extends Base {
    static components = {
        readme: Readme,
        head: Head,
        basic: Basic,
        fallback: Fallback,
        previewgroup: PreviewGroup
    };
    static template = `
        <div>
            <head />
            <basic />
            <fallback />
            <previewgroup />
            <readme />
        </div>
    `;
}
