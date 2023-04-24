/**
 * @file Santd anchor docs file
 **/
import Base from 'santd/base';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Static from './static.md';
import Click from './click.md';
import Custom from './custom.md';
import Change from './change.md';
import TargetOffset from './targetOffset.md';

export default class extends Base {
    static components = {
        readme: Readme,
        head: Head,
        basic: Basic,
        static: Static,
        click: Click,
        custom: Custom,
        change: Change,
        'target-offset': TargetOffset
    };
    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <static/>
            <click/>
            <custom/>
            <change/>
            <target-offset/>
            <readme/>
        </div>
    `;
};
