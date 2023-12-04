/**
 * @file Santd checkbox docs file
 **/

import Desc from './desc.md';
import Basic from './basic.md';
import Disabled from './disabled.md';
import Controller from './controller.md';
import Group from './group.md';
import CheckAll from './checkall.md';
import Grid from './grid.md';
import Readme from '../README.md';

import Base from 'santd/base';

export default class extends Base {
    static components = {
        desc: Desc,
        basic: Basic,
        disabled: Disabled,
        controller: Controller,
        group: Group,
        checkall: CheckAll,
        grid: Grid,
        readme: Readme
    }

    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <disabled/>
            <controller/>
            <group/>
            <checkall/>
            <grid/>
            <readme/>
        </div>
    `
};
