/**
 * @file Santd typography doc file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Head from './head.md';
import Text from './text.md';
import Title from './title.md';
import Editable from './editable.md';
import Ellipsis from './ellipsis.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        title: Title,
        text: Text,
        head: Head,
        editable: Editable,
        ellipsis: Ellipsis
    },
    template: `
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
});
