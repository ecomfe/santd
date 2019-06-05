import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Mark from './mark.md';
import Event from './event.md';
import Tip from './tip.md';
import Vertical from './vertical.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        mark: Mark,
        event: Event,
        tip: Tip,
        vertical: Vertical
    },
    template: `
        <div>
            <basic/>
            <event/>
            <tip/>
            <mark/>
            <vertical/>
            <readme/>
        </div>
    `
})