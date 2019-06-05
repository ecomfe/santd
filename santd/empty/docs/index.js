import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Custom from './custom.md';
import Head from './head.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        custom: Custom,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <custom/>
            <readme/>
        </div>
    `
})