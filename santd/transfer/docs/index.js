import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Search from './search.md';
import Advance from './advance.md';
import Head from './head.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        search: Search,
        advance: Advance,
        head: Head
    },
    template: `
        <div>
            <head/>
            <basic/>
            <search/>
            <advance/>
            <readme/>
        </div>
    `
});