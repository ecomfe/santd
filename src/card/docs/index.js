/**
 * @file Santd card docs file
 **/

import san from 'san';
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

export default san.defineComponent({
    components: {
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
    },
    template: `
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
});
