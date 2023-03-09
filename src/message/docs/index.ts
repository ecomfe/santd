/**
 * @file 组件 message
 * @author baozhixin <baozhixin@baidu.com>
 */

import Head from './head.md';
import Info from './info.md';
import Other from './other.md';
import Duration from './duration.md';
import Loading from './loading.md';
import Thenable from './thenable.md';
import Readme from '../README.md';
import Base from 'santd/base';

export default class extends Base {
    static template = /* html */ `
        <div>
            <head/>
            <info/>
            <other/>
            <duration/>
            <loading/>
            <thenable/>
            <readme/>
        </div>
    `;
    static components = {
        head: Head,
        info: Info,
        other: Other,
        duration: Duration,
        loading: Loading,
        thenable: Thenable,
        readme: Readme
    };
};
