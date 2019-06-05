import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Head from './head.md';
import Breadcrumb from './breadcrumb.md';
import Content from './content.md';
import Actions from './actions.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        head: Head,
        breadcrumb: Breadcrumb,
        content: Content,
        actions: Actions
    },
    template: `
        <div>
            <head/>
            <basic/>
            <breadcrumb/>
            <content/>
            <actions/>
            <readme/>
        </div>
    `
});
