/**
 * @file 组件 select
 * @author
 */

import san from 'san';
import Head from './head.md';
import Readme from '../README.md';

import Automatic from './automatic-tokenization.md';
import Basic from './basic.md';
import Coordinate from './coordinate.md';
import CustomMenu from './custom-dropdown-menu.md';
import HideSelected from './hide-selected.md';
// import LabelInValue from './label-in-value.md'; // mark
import Multiple from './multiple.md';
import OptGroup from './optgroup.md';
import OptLabel from './option-label-prop.md';
import SearchBox from './search-box.md';
import Search from './search.md';
import SelectUser from './select-users.md';
import Size from './size.md';
import Suffix from './suffix.md';
import Tags from './tags.md';

export default san.defineComponent({
    components: {
        head: Head,
        readme: Readme,
        automatic: Automatic,
        basic: Basic,
        coordinate: Coordinate,
        custommenu: CustomMenu,
        hideselected: HideSelected,
        // labelinvalue: LabelInValue,
        multiple: Multiple,
        optgroup: OptGroup,
        optlabel: OptLabel,
        searchbox: SearchBox,
        search: Search,
        selectuser: SelectUser,
        size: Size,
        suffix: Suffix,
        tags: Tags
    },
    template: `
        <div>
            <head/>
            <basic/>
            <search/>
            <multiple/>
            <size/>
            <optlabel/>
            <tags/>
            <optgroup/>
            <coordinate/>
            <searchbox/>
            <labelinvalue/>
            <automatic/>
            <selectuser/>
            <suffix/>
            <custommenu/>
            <hideselected/>
            <readme/>
        </div>
    `
});
