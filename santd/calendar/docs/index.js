/**
 * @file Santd calendar docs file
 **/
import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import CustomRender from './customRender.md';
import Small from './small.md';
import Desc from './desc.md';
import Select from './select.md';
import CustomHeader from './customHeader.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        desc: Desc,
        basic: Basic,
        customrender: CustomRender,
        small: Small,
        select: Select,
        customheader: CustomHeader
    },
    template: `
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
});
