/**
 * @file Santd mention docs file
 **/

import san from 'san';
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

export default san.defineComponent({
    components: {
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
    },
    template: `
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
});
