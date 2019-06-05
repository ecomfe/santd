/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 */

import san from 'san';
import Head from './head.md';
import Basic from './basic.md';
import Complex from './complex.md';
import Active from './active.md';
import Children from './children.md';
import List from './list.md';
import Readme from '../README.md';

export default san.defineComponent({
    template: `
        <div>
            <head/>
            <basic/>
            <complex/>
            <active/>
            <children/>
            <list/>
            <readme/>
        </div>
    `,
    components: {
        head: Head,
        basic: Basic,
        complex: Complex,
        active: Active,
        children: Children,
        list: List,
        readme: Readme
    }
});
