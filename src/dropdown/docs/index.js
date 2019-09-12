/**
* @file docs入口文件
*/
import san from 'san';
import Readme from '../README.md';
import Head from './head.md';
import Basic from './basic.md';
import Click from './click.md';
import Button from './button.md';
import Menue from './menue.md';
import Item from './item.md';
import Event from './event.md';
import Placement from './placement.md';
import Visible from './overlay-visible.md';
import Contextmenu from './context-menu.md';

export default san.defineComponent({
    components: {
        readme: Readme,
        head: Head,
        basic: Basic,
        click: Click,
        button: Button,
        menue: Menue,
        contextmenu: Contextmenu,
        item: Item,
        event: Event,
        placement: Placement,
        visible: Visible
    },
    template: `
        <div>
            <head/>
            <basic/>
            <item/>
            <event/>
            <menue/>
            <contextmenu/>
            <placement/>
            <click/>
            <button/>
            <visible/>
            <readme/>
        </div>
    `
});
