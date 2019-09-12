/**
* @file docs入口文件
*/
import san from 'san';
import Head from './head.md';
import Readme from '../README.md';
import Select from './select.md';
import Basic from './basic.md';
import Multiple from './multiple.md';
import Tags from './tags.md';
import Size from './size.md';
import OptGroup from './optgroup.md';
import Automatic from './automatic.md';
import Coordinating from './coordinating.md';
import SearchBox from './search-box.md';
import LabelInValue from './label-in-value.md';
import SelectUser from './select-users.md';
import HideSelected from './hide-selected.md';
import CustomMenu from './custom-dropdown-menu.md';

export default san.defineComponent({
    components:{
        readme: Readme,
        head: Head,
        basic: Basic,
        select: Select,
        multiple: Multiple,
        tags: Tags,
        optgroup: OptGroup,
        size: Size,
        automatic: Automatic,
        coordinating: Coordinating,
        searchbox: SearchBox,
        labelinvalue: LabelInValue,
        selectuser: SelectUser,
        hideselected: HideSelected,
        custommenu: CustomMenu
    },
    template: `
        <div>
            <head/>
            <basic/>
            <select/>
            <multiple/>
            <tags/>
            <size/>
            <coordinating/>
            <optgroup/>
            <searchbox/>
            <labelinvalue/>
            <automatic/>
            <selectuser/>
            <custommenu/>
            <hideselected/>
            <readme/>
        </div>
    `
})
