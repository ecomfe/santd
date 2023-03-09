/**
 * @file Santd empty docs file
 **/

import Head from './head.md';
import Basic from './basic.md';
import Choose from './choose.md';
import Custom from './custom.md';
import Readme from '../README.md';
import NoDescription from './nodescription.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        head: Head,
        basic: Basic,
        readme: Readme,
        choose: Choose,
        custom: Custom,
        nodescription: NoDescription,
    };

    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <choose/>
            <custom/>
            <nodescription/>
            <readme/>
        </div>
    `;
};
