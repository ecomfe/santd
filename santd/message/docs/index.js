/**
 * @file 组件 message
 * @author baozhixin <baozhixin@baidu.com>
 */

import san from 'san';
import Head from './head.md';
import Info from './info.md';
import Other from './other.md';
import Duration from './duration.md';
import Loading from './loading.md';
import Thenable from './thenable.md';
import Readme from '../README.md';

export default san.defineComponent({
    template: `
        <div>
            <head/>
            <info/>
            <other/>
            <duration/>
            <loading/>
            <thenable/>
            <readme/>
        </div>
    `,
    components: {
        head: Head,
        info: Info,
        other: Other,
        duration: Duration,
        loading: Loading,
        thenable: Thenable,
        readme: Readme
    }
});
