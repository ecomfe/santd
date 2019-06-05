import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import ReadOnly from './readonly.md';
import Loading from './loading.md';
import multiLines from './multiLines.md';
import multipleTrigger from './multiple-trigger.md';

export default san.defineComponent({
    components: {
        head: Head,
        basic: Basic,
        loading: Loading,
        readonly: ReadOnly,
        readme: Readme,
        multilines: multiLines,
        multipletrigger: multipleTrigger
    },
    template: `
        <div>
            <head />
        	<basic />
            <loading />
            <multilines />
            <readonly />
            <multipletrigger />
            <readme />
        </div>
    `
});
