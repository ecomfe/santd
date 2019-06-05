import san from 'san';
import Basic from './basic.md';
import Format from './format.md';
import Disabled from './disabled.md';
import Range from './rang.md';
import Time from './time.md';
import Readme from '../README.md';

export default san.defineComponent({
    components:{
        basic: Basic,
        format: Format,
        disabled: Disabled,
        range: Range,
        time: Time,
        readme: Readme
    },
    template: `
        <div>
            <basic/>
            <format/>
            <disabled/>
            <range/>
            <time/>
            <readme/>
        </div>
    `
})