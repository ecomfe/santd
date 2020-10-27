/**
 * @file Santd anchor docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Static from './static.md';
import Click from './click.md';
import Custom from './custom.md';
import Change from './change.md';
import TargetOffset from './targetOffset.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        static: Static,
        click: Click,
        custom: Custom,
        change: Change,
        'target-offset': TargetOffset
    },
    template: `
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
    `
});
