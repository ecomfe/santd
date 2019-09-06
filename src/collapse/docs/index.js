/**
 * @file Santd collapse docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Accordion from './accordion.md';
import Basic from './basic.md';
import Nest from './nest.md';
import Arrow from './arrow.md';
import Custom from './custom.md';
import Extra from './extra.md';
import Head from './head.md';
import Simple from './simple.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        accordion: Accordion,
        basic: Basic,
        nest: Nest,
        simple: Simple,
        custom: Custom,
        arrow: Arrow,
        extra: Extra,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
        </div>
    `
});