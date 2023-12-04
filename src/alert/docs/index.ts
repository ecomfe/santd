/**
 * @file Santd backtop docs file
 **/

import Head from './head.md';
import Basic from './basic.md';
import Style from './style.md';
import Closable from './closable.md';
import Description from './description.md';
import Icon from './icon.md';
import CloseText from './close-text.md';
import Banner from './banner.md';
import Smooth from './smooth-closed.md';
import Custom from './custom-icon.md';
import Readme from '../README.md';
import Base from 'santd/base';

export default class extends Base {
    static template = `
        <div>
            <head/>
            <basic/>
            <style/>
            <closable/>
            <description/>
            <icon/>
            <closetext/>
            <banner/>
            <smooth/>
            <custom/>
            <readme/>
        </div>
    `;

    static components = {
        head: Head,
        basic: Basic,
        style: Style,
        closable: Closable,
        description: Description,
        icon: Icon,
        closetext: CloseText,
        banner: Banner,
        smooth: Smooth,
        custom: Custom,
        readme: Readme
    };
};
