/**
 * @file Santd calendar docs file
 **/
import Base from 'santd/base';
import Readme from '../README.md';
import Basic from './basic.md';
import CustomRender from './customRender.md';
import Small from './small.md';
import Desc from './desc.md';
import Select from './select.md';
import CustomHeader from './customHeader.md';

export default class extends Base {
    static components = {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        customrender: CustomRender,
        small: Small,
        select: Select,
        customheader: CustomHeader
    };
    static template = /* html */ `
        <div>
            <desc/>
            <basic/>
            <customrender/>
            <small/>
            <select/>
            <customheader/>
            <readme/>
        </div>
    `
};
