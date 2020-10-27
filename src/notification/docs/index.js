/**
 * @file 组件 notification
 * @author baozhixin <baozhixin@baidu.com>
 */

import san from 'san';
import Head from './head.md';
import Basic from './basic.md';
import Duration from './duration.md';
import Icon1 from './with-icon.md';
import Icon2 from './custom-icon.md';
import Button from './with-btn.md';
import Placement from './placement.md';
import Style from './custom-style.md';
import Update from './update.md';
import Close from './custom-close.md';
import Readme from '../README.md';

export default san.defineComponent({
    template: `
        <div>
            <head/>
            <basic/>
            <duration/>
            <icon1/>
            <icon2/>
            <button/>
            <placement/>
            <style/>
            <update/>
            <close/>
            <readme/>
        </div>
    `,
    components: {
        head: Head,
        basic: Basic,
        duration: Duration,
        icon1: Icon1,
        icon2: Icon2,
        button: Button,
        placement: Placement,
        style: Style,
        update: Update,
        close: Close,
        readme: Readme
    }
});
