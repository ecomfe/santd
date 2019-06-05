import san from 'san';
import Readme from '../README.md';

export default san.defineComponent({
    components:{
        readme: Readme
    },
    template: `
        <div>
            <readme/>
        </div>
    `
})