/**
 * @file 组件 modal
 * @author baozhixin <baozhixin@baidu.com>
 *
 * @todo 对话框显示隐藏动效
 */

import Base from 'santd/base';
import Head from './head.md';
import Basic from './basic.md';
import Async from './async.md';
import Footer from './footer.md';
import Confirm from './confirm.md';
import Confirm2 from './confirm-promise.md';
import Info from './info.md';
import Locale from './locale.md';
import Manual from './manual.md';
import Position from './position.md';
import ButtonProps from './button-props.md';
import Readme from '../README.md';

export default class extends Base {
    static template = /* html */ `
        <div>
            <head/>
            <basic/>
            <async/>
            <footer/>
            <confirm/>
            <confirm2/>
            <info/>
            <locale/>
            <manual/>
            <position/>
            <button/>
            <readme/>
        </div>
    `;

    static components = {
        head: Head,
        basic: Basic,
        async: Async,
        footer: Footer,
        confirm: Confirm,
        confirm2: Confirm2,
        info: Info,
        locale: Locale,
        manual: Manual,
        position: Position,
        button: ButtonProps,
        readme: Readme
    }
};
