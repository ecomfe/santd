/**
 * @file Santd Grid docs
 **/
import Desc from './desc.md';
import Head from './head.md';
import Demo from './demo';
import Basic from './basic.md';
import FlexAlign from './flex-align.md';
import FlexOrder from './flex-order.md';
import Flex from './flex.md';
import Gutter from './gutter.md';
import Offset from './offset.md';
import Sort from './sort.md';
import Responsive from './responsive.md';
import ResponsiveMore from './responsive-more.md';
import GutterConfig from './config.md';
import Base from 'santd/base';

import Readme from '../README.md';

export default class extends Base {
    static components = {
        desc: Desc,
        head: Head,
        basic: Basic,
        demo: Demo,
        flex: Flex,
        flexalign: FlexAlign,
        flexorder: FlexOrder,
        gutter: Gutter,
        offset: Offset,
        responsive: Responsive,
        responsivemore: ResponsiveMore,
        sort: Sort,
        gutterconfig: GutterConfig,
        readme: Readme
    }

    static template = /* html */ `
        <div>
            <head/>
            <demo/>
            <desc/>
            <basic/>
            <gutter/>
            <sort/>
            <offset/>
            <flex/>
            <flexalign/>
            <flexorder/>
            <responsive/>
            <responsivemore/>
            <gutterconfig/>
            <readme/>
        </div>
    `
};
