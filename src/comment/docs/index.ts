/**
 * @file Santd comment docs file
 **/

import Readme from '../README.md';
import Basic from './basic.md';
import List from './list.md';
import Nested from './nested.md';
import Reply from './reply.md';
import Head from './head.md';
import Base from 'santd/base';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        list: List,
        nest: Nested,
        reply: Reply,
        head: Head
    }
    static template =  `
        <div>
            <head/>
            <basic/>
            <list/>
            <nest/>
            <reply/>
            <readme/>
        </div>
    `
}
