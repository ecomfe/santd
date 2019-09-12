/**
 * @file 组件 progress
 * @author baozhixin <baozhixin@baidu.com>
 */

import san from 'san';
import Head from './head.md';
import Line from './line.md';
import Circle from './circle.md';
import LineMini from './line-mini.md';
import CircleMini from './circle-mini.md';
import Dynamic from './dynamic.md';
import CircleDynamic from './circle-dynamic.md';
import Format from './format.md';
import Dashboard from './dashboard.md';
import Segment from './segment.md';
import Linecap from './linecap.md';
import Readme from '../README.md';

export default san.defineComponent({
    template: `
        <div>
            <head/>
            <line/>
            <circle/>
            <linemini/>
            <circlemini/>
            <dynamic/>
            <circledynamic/>
            <format/>
            <dashboard/>
            <segment/>
            <linecap/>
            <readme/>
        </div>
    `,
    components: {
        head: Head,
        line: Line,
        circle: Circle,
        linemini: LineMini,
        circlemini: CircleMini,
        dynamic: Dynamic,
        circledynamic: CircleDynamic,
        format: Format,
        dashboard: Dashboard,
        segment: Segment,
        linecap: Linecap,
        readme: Readme
    }
});
