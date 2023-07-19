/**
 * @file 组件 skeleton
 * @author baozhixin <baozhixin@baidu.com>
 */

import Base from 'santd/base';
import Head from './head.md';
import Basic from './basic.md';
import Complex from './complex.md';
import Active from './active.md';
import Children from './children.md';
import List from './list.md';
import Readme from '../README.md';

export default class extends Base {
    static template = `
        <div>
            <head/>
            <basic/>
            <complex/>
            <active/>
            <children/>
            <list/>
            <readme/>
        </div>
    `
    static components = {
        head: Head,
        basic: Basic,
        complex: Complex,
        active: Active,
        children: Children,
        list: List,
        readme: Readme
    }
};
