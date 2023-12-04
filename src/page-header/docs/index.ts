import Base from 'santd/base';
import Readme from '../README.md';
import Basic from './basic.md';
import Head from './head.md';
import Breadcrumb from './breadcrumb.md';
import Content from './content.md';
import Actions from './actions.md';

export default class extends Base{
    static components = {
        readme: Readme,
        basic: Basic,
        head: Head,
        breadcrumb: Breadcrumb,
        content: Content,
        actions: Actions
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <breadcrumb/>
            <content/>
            <actions/>
            <readme/>
        </div>
    `
};
