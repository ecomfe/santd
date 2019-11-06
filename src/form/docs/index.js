/**
 * @file Santd form demo file
 **/

import san from 'san';
import Desc from './desc.md';
import Readme from '../README.md';
import Basic from './basic.md';
import Login from './login.md';
import Register from './register.md';
import Search from './advanced-search.md';
import Modal from './modal.md';
import Dynamic from './dynamic-form-item.md';
import CustomForm from './custom-form.md';
import Data from './data.md';
import Date from './date.md';
import CustomData from './custom-data.md';
import CustomValidate from './custom-validate.md';
import Coordinated from './coordinated.md';
import Layout from './layout.md';
import DynamicRule from './dynamic-rule.md';
import Validate from './validate.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        readme: Readme,
        basic: Basic,
        login: Login,
        register: Register,
        search: Search,
        modal: Modal,
        dynamic: Dynamic,
        customform: CustomForm,
        date: Date,
        data: Data,
        customdata: CustomData,
        customvalidate: CustomValidate,
        coordinated: Coordinated,
        layout: Layout,
        dynamicrule: DynamicRule,
        validate: Validate
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <login/>
            <register/>
            <search/>
            <modal/>
            <dynamic/>
            <date/>
            <customform/>
            <data/>
            <customdata/>
            <customvalidate/>
            <coordinated/>
            <layout/>
            <dynamicrule/>
            <validate/>
            <readme/>
        </div>
    `
});
