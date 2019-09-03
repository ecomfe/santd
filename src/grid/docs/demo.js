/**
 * @file Santd grid demo file
 * @author mayihui@baidu.com
 **/

import san from 'san';
import './demo.less';

import Grid from '../index';

export default san.defineComponent({
    components: {
        's-row': Grid.Row,
        's-col': Grid.Col
    },
    template: `<div class="grid-demo">
        <s-row class="demo-row">
            <s-col span="{{24}}" class="demo-col demo-col-1">100%</s-col>
        </s-row>
        <s-row class="demo-row">
            <s-col span="{{6}}" class="demo-col demo-col-2">25%</s-col>
            <s-col span="{{6}}" class="demo-col demo-col-3">25%</s-col>
            <s-col span="{{6}}" class="demo-col demo-col-2">25%</s-col>
            <s-col span="{{6}}" class="demo-col demo-col-3">25%</s-col>
        </s-row>
        <s-row class="demo-row">
            <s-col span="{{8}}" class="demo-col demo-col-4">33.33%</s-col>
            <s-col span="{{8}}" class="demo-col demo-col-5">33.33%</s-col>
            <s-col span="{{8}}" class="demo-col demo-col-4">33.33%</s-col>
        </s-row>
        <s-row class="demo-row">
            <s-col span="{{12}}" class="demo-col demo-col-1">50%</s-col>
            <s-col span="{{12}}" class="demo-col demo-col-3">50%</s-col>
        </s-row>
        <s-row class="demo-row">
            <s-col span="{{16}}" class="demo-col demo-col-4">66.66%</s-col>
            <s-col span="{{8}}" class="demo-col demo-col-5">33.33%</s-col>
        </s-row>
    </div>`
});
