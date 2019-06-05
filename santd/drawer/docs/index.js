/**
 * @file 组件 drawer
 * @author baozhixin <baozhixin@baidu.com>
 */

import san from 'san';
import Head from './head.md';
import Basic from './basic-right.md';
import Placement from './placement.md';
import Form from './form-in-drawer.md';
import Profile from './user-profile.md';
import Readme from '../README.md';

export default san.defineComponent({
    template: `
        <div>
            <head/>
            <basic/>
            <placement/>
            <form/>
            <profile/>
            <readme/>
        </div>
    `,
    components: {
        head: Head,
        basic: Basic,
        placement: Placement,
        form: Form,
        profile: Profile,
        readme: Readme
    }
});
