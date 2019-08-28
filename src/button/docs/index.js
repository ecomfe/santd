/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
import Basic from './basic.md';
import Size from './size.md';
import Icon from './icon.md';
import Disable from './disable.md';
import Loading from './loading.md';
import Block from './block.md';
import Ghost from './ghost.md';
import Group from './group.md';
import Combo from './combo.md';
import Desc from './desc.md';

import './style.less';

export default san.defineComponent({
    components: {
        readme: Readme,
        basic: Basic,
        size: Size,
        icon: Icon,
        disable: Disable,
        loading: Loading,
        block: Block,
        ghost: Ghost,
        combo: Combo,
        group: Group,
        desc: Desc
    },
    template: `
        <div>
            <desc/>
            <basic/>
            <icon/>
            <disable/>
            <size/>
            <loading/>
            <group/>
            <combo/>
            <block/>
            <ghost/>
            <readme/>
        </div>
    `
});
