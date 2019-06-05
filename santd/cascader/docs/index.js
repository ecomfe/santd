/**
* @file docs入口文件
*/
import san from 'san';
import Head from './head.md';
import Readme from '../README.md';
import Basic from './basic.md';
import Disabled from './disabled.md';
import Size from './size.md';
import ChangeSelect from './change-on-select.md';
import Hover from './hover.md';
import DefalutValue from './default-value.md';
import Search from './search.md';
import LoadData from './loaddata.md';
import CustomTrigger from './custom-trigger.md';
import CustomRender from './custom-render.md';
import FieldName from './field-name.md';
import './style/index.less';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        disabled: Disabled,
        size: Size,
        change: ChangeSelect,
        hover: Hover,
        defaultvalue: DefalutValue,
        search: Search,
        loaddata: LoadData,
        customtrigger: CustomTrigger,
        customrender: CustomRender,
        fieldname: FieldName
    },
    template: `
        <div>
            <head/>
            <basic/>
            <defaultvalue/>
            <customtrigger/>
            <hover/>
            <disabled/>
            <change/>
            <size/>
            <customrender/>
            <loaddata/>
            <fieldname/>
            <search/>
            <readme/>
        </div>
    `
});
