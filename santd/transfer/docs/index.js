/**
 * @file Santd transfer docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Search from './search.md';
import Advance from './advance.md';
import Render from './render.md';
import Table from './table.md';
import Tree from './tree.md';
import Head from './head.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        search: Search,
        advance: Advance,
        render: Render,
        table: Table,
        tree: Tree,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <search/>
            <advance/>
            <render/>
            <table/>
            <tree/>
            <readme/>
        </div>
    `
});
