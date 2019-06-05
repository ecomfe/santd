import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Group from './group.md';
import Option from './option.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        basic: Basic,
        group: Group,
        option: Option
    },
    template: `
        <div>
            <basic/>
            <group/>
            <option/>
            <readme/>
        </div>
    `
})