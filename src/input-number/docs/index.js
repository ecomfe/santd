/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Disable from './disable.md';
import Size from './size.md';
import Numbers from './number.md';
import Format from './format.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        head: Head,
        basic: Basic,
        disable: Disable,
        size: Size,
        number: Numbers,
        format: Format
    },
    template: `
        <div>
            <head/>
            <basic/>
            <disable/>
            <size/>
            <number/>
            <format/>
            <readme/>
        </div>
    `
})
