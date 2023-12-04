/**
* @file docs入口文件
*/
import Base from 'santd/base';
import Readme from '../README.md';
import Basic from './basic.md';
import Many from './many.md';
import Change from './change.md';
import QuickJump from './quickJumper.md';
import Mini from './mini.md';
import TotalNum from './totalNumber.md';
import Simple from './simple.md';
import Controlled from './controlled.md';
import ItemRender from './itemRender.md';
import Desc from './desc.md';

export default class extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        many: Many,
        change: Change,
        jumper: QuickJump,
        mini: Mini,
        controlled: Controlled,
        totalnum: TotalNum,
        simple: Simple,
        itemrender: ItemRender,
        desc: Desc
    }
    static template = `
        <div>
            <desc/>
            <basic/>
            <many/>
            <change/>
            <jumper/>
            <mini/>
            <simple/>
            <controlled/>
            <totalnum/>
            <itemrender/>
            <readme/>
        </div>
    `
};
