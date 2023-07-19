/**
 * @file docs入口文件
 */

import Base from 'santd/base';
import Head from './head.md';
import Readme from '../README.md';
import Basic from './basic.md';
import OffsetTop from './offsetTop.md';
import Target from './target.md';

export default class extends Base {
    static components = {
        head: Head,
        basic: Basic,
        readme: Readme,
        offset: OffsetTop,
        target: Target
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <offset/>
            <target/>
            <readme/>
        </div>
    `
};
