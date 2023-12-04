/**
* @file docs入口文件
*/
import Base from 'santd/base';
import Head from './head.md';
import Readme from '../README.md';
import Basic from './basic.md';
import withIcon from './withIcon.md';
import Separator from './separator.md';
import withroutes from './withroutes.md';

export default class extends Base {
    static components = {
        head: Head,
        readme: Readme,
        basic: Basic,
        addicon: withIcon,
        separator: Separator,
        withroutes: withroutes
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <addicon/>
            <separator/>
            <withroutes/>
            <readme/>
        </div>
    `
};