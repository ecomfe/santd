/**
 * @file Santd timepicker docs file
 **/
import Readme from '../README.md';
import Basic from './basic.md';
import Addon from './addon.md';
import Disable from './disable.md';
import Format from './format.md';
import Head from './head.md';
import Change from './onchange.md';
import Size from './size.md';
import Step from './step.md';
import Use12Hours from './use12hours.md';
import Base from 'santd/base';

export default class TimePicker extends Base {
    static components = {
        readme: Readme,
        basic: Basic,
        size: Size,
        format: Format,
        addon: Addon,
        change: Change,
        disable: Disable,
        step: Step,
        use12hours: Use12Hours,
        head: Head
    }
    static template = `
        <div>
            <head/>
            <basic/>
            <size/>
            <format/>
            <addon/>
            <change/>
            <disable/>
            <step/>
            <use12hours/>
            <readme/>
        </div>
    `
};
