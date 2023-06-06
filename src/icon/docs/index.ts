/**
* @file docs入口文件
*/
import Base from 'santd/base';
import Desc from './desc.md';
import IconDisplay from './iconDisplay/index';
import Basic from './basic.md';
import Colors from './colorIcon.md';
import Script from './script.md';
import Readme from '../README.md';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        icondisplay: IconDisplay,
        colors: Colors,
        script: Script,
        desc: Desc
    }
    static template = `
        <div>
            <desc/>
            <icondisplay/>
            <basic/>
            <colors/>
            <script/>
            <readme/>
        </div>
    `
};
