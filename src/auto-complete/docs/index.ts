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
import Base from 'santd/base';

export default class AutoComplete extends Base {
    static template = `
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

    static components = {
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
    }
};
