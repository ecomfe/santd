/**
 * @file Santd transfer docs file
 **/

import Readme from '../README.md';
import Basic from './basic.md';
import Search from './search.md';
import Advance from './advance.md';
import Render from './render.md';
import Table from './table.md';
import Tree from './tree.md';
import Head from './head.md';
import Base from 'santd/base';

export default class extends Base{
    static components = {
        readme: Readme,
        basic: Basic,
        search: Search,
        advance: Advance,
        render: Render,
        table: Table,
        tree: Tree,
        head: Head
    }
    static template =  `
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
};
