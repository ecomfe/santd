/**
 * @file Santd avatar docs file
 **/

import san from 'san';
import Readme from '../README.md';
import Desc from './desc.md';
import Success from './Success.md';
import Warning from './warning.md';
import Access from './403.md';
import NotFound from './404.md';
import Info from './info.md';
import Wrong from './500.md';
import Custom from './custom.md';
import Icon from './icon.md';

export default san.defineComponent({
    components: {
        desc: Desc,
        success: Success,
        warning: Warning,
        readme: Readme,
        info: Info,
        access: Access,
        notfound: NotFound,
        wrong: Wrong,
        icon: Icon,
        custom: Custom
    },
    template: `
        <div>
            <desc/>
            <success/>
            <info/>
            <warning/>
            <access/>
            <notfound/>
            <wrong/>
            <custom/>
            <icon/>
            <readme/>
        </div>
    `
});
