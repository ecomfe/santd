/**
* @file docs入口文件
*/
import san from 'san';
import Desc from './desc.md';
import Basic from './basic.md';
import Locale from './locale.md';
/*import Readme from '../README.md';
import Size from './size.md';
import Icon from './icon.md';
import Disable from './disable.md';
import Loading from './loading.md';
import Block from './block.md';
import Ghost from './ghost.md';
import Group from './group.md';
import Combo from './combo.md';

import './style.less';*/

export default san.defineComponent({
    components: {
        desc: Desc,
        basic: Basic,
        locale: Locale
        /*readme: Readme,
        size: Size,
        icon: Icon,
        disable: Disable,
        loading: Loading,
        block: Block,
        ghost: Ghost,
        combo: Combo,
        group: Group,*/
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <locale/>
        </div>
    `
});
