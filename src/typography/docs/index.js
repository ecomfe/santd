/**
 * @file Santd typography doc file
 **/

import Base from 'santd/base';
import Readme from '../README.md';
import Basic from './basic.md';
import Head from './head.md';
import Text from './text.md';
import Title from './title.md';
import Editable from './editable.md';
import Ellipsis from './ellipsis.md';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        title: Title,
        text: Text,
        head: Head,
        editable: Editable,
        ellipsis: Ellipsis
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <title/>
            <text/>
            <editable/>
            <ellipsis/>
            <readme/>
        </div>
    `
};
