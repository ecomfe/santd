/**
 * @file Santd mention docs file
 **/

import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Placement from './placement.md';
import ReadOnly from './readonly.md';
import Loading from './loading.md';
import MultiLines from './multiLines.md';
import MultipleTrigger from './multiple-trigger.md';
import Custom from './custom.md';
import Avatar from './avatar.md';
import Form from './form.md';
import Base from 'santd/base';


export default class Mention extends Base {
    static components = {
        head: Head,
        basic: Basic,
        placement: Placement,
        loading: Loading,
        readonly: ReadOnly,
        readme: Readme,
        multilines: MultiLines,
        multipletrigger: MultipleTrigger,
        custom: Custom,
        avatar: Avatar,
        form: Form
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <placement/>
            <loading/>
            <avatar/>
            <custom/>
            <form/>
            <multilines/>
            <readonly/>
            <multipletrigger/>
            <readme/>
        </div>
    `
};
