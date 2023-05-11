/**
 * @file Santd card docs file
 **/

import Readme from '../README.md';
import Desc from './desc.md';
import Basic from './basic.md';
import NoBorder from './noborder.md';
import Simple from './simple.md';
import Meta from './meta.md';
import Column from './column.md'
import Preload from './preload.md';
import Grid from './grid.md';
import Nest from './nest.md';
import Actions from './actions.md';
import Tabs from './tabs.md';
import Base from 'santd/base';


export default class extends Base {
    static components = {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        noborder: NoBorder,
        simple: Simple,
        meta: Meta,
        column: Column,
        preload: Preload,
        grid: Grid,
        nest: Nest,
        tabs: Tabs,
        actions: Actions
    }
    static template = `
        <div>
            <desc/>
            <basic/>
            <noborder/>
            <simple/>
            <meta/>
            <column/>
            <preload/>
            <grid/>
            <nest/>
            <tabs/>
            <actions/>
            <readme/>
        </div>
    `
}
