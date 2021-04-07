import san from 'san';
import Head from './head.md';
import Readme from '../README.md';
import Basic from './basic.md';
import Option from './option.md';
import Custom from './custom.md';
import Noupcase from './no-upcase.md';
import Lookup from './lookup.md';
import Uncertainlookup from './uncertain-lookup.md';
import Focus from './focus.md';
import Backfill from './backfill.md';

export default san.defineComponent({
    components:{
        head: Head,
        readme: Readme,
        basic: Basic,
        option: Option,
        custom: Custom,
        upcase: Noupcase,
        lookup: Lookup,
        unlookup: Uncertainlookup,
        focus: Focus,
        backfill: Backfill
    },
    template: `
        <div>
            <head/>
            <basic/>
            <option/>
            <upcase/>
            <!--<custom/>-->
            <lookup/>
            <unlookup/>
            <focus/>
            <backfill/>
            <readme/>
        </div>
    `
});
